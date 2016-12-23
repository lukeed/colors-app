'use strict';

const bs = require('browser-sync');
const rcf = require('./config/rollup');
const cUgly = require('./config/uglify');
const pkg = require('./package.json');

let isWatch = 0;

const tar = 'dist';
const rel = 'release';
const node = 'node_modules';
const src = {
	js: 'src/scripts/**',
	css: 'src/styles/**',
	copy: [
		'src/static/**/*.*',
		'src/*.html'
	]
};

export async function clean() {
	await this.clear([tar, rel]);
}

export async function copies(o) {
	await this.source(o.src || src.copy).target(tar);
}

let conf;
export async function scripts() {
	conf = conf || rcf(isWatch && 'development');
	await this.source('src/scripts/app.js').rollup(conf).target(`${tar}/js`);
}

export async function styles() {
	await this.source('src/styles/app.sass').sass({
		outputStyle: 'compressed',
		includePaths: [`${node}/md-colors/src`]
	}).autoprefixer().target(`${tar}/css`);
}

export async function build() {
	await this.serial(['clean', 'copies', 'scripts', 'styles']); // @todo: parallel
}

export async function release() {
	// minify js
	await this.source(`${tar}/js/*`).uglify(cUgly).target(`${tar}/js`);
	// version assets
	await this.source(`${tar}/**/*`).rev({
		ignores: ['.html', '.png', '.svg', '.ico', '.json', '.txt']
	}).revManifest({dest: rel, trim: tar}).revReplace().target(rel);
	// minify html
	await this.source(`${rel}/*.html`).htmlmin().target(rel);
	// make assets available for offline
	await this.source(`${rel}/**/*`).precache({
		stripPrefix: rel,
		cacheId: 'fly-kit-preact',
		navigateFallback: 'index.html'
	}).target(rel);
	// minify sw files
	await this.source(`${rel}/*.js`).uglify(cUgly).target(rel);
	await this.source(`${rel}/sw/*.js`).uglify(cUgly).target(`${rel}/sw`);
	// write new `package.json` file
	await this.start('package');
}

export async function watch() {
	isWatch = 1;
	await this.start('build');
	await this.watch(src.js, ['scripts', 'reload']);
	await this.watch(src.css, ['styles', 'reload']);
	await this.watch(src.copy, ['copies', 'reload']);
	// start server
	bs({
		server: tar,
		logPrefix: 'Fly',
		port: process.env.PORT || 3000,
		middleware: [
			require('connect-history-api-fallback')()
		]
	});
}

export async function reload() {
	isWatch && bs.reload();
}

export async function package() {
	await this.$.write(`${rel}/package.json`, `{
  "name": "colors",
  "version": "${ pkg.version }",
  "license": "MIT",
  "repository": "lukeed/colors-app",
  "author": {
    "name": "Luke Edwards",
    "email": "luke.edwards05@gmail.com",
    "url": "https://lukeed.com"
  },
  "scripts": {
    "start": "serve -s"
  },
  "dependencies": {
    "serve": "^2.0.0"
  }
}`);
}
