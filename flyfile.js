'use strict';

const bs = require('browser-sync');
const cRoll = require('./config/rollup');
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
	],
	vendor: [
		`${node}/mo-js/build/mo.min.js`
	]
};

export async function clean(fly) {
	await fly.clear([tar, rel]);
}

export async function copies(fly, o) {
	await fly.source(o.src || src.copy).target(tar);
}

let conf;
export async function scripts(fly) {
	conf = conf || cRoll(isWatch && 'development');
	await fly.source('src/scripts/app.js').xo().rollup(conf).target(`${tar}/js`);
}

export async function vendors(fly) {
	await fly.source(src.vendor).concat('vendor.js').target(`${tar}/js`);
}

export async function styles(fly) {
	await fly.source('src/styles/app.sass').sass({
		includePaths: [`${node}/md-colors/src`],
		outputStyle: 'compressed'
	}).autoprefixer().target(`${tar}/css`);
}

export async function build(fly) {
	await fly.parallel(['clean', 'copies', 'vendors', 'scripts', 'styles']);
}

export async function release(fly) {
	// minify js
	await fly.source(`${tar}/js/*`).uglify(cUgly).target(`${tar}/js`);
	// version assets
	await fly.source(`${tar}/**/*`).rev({
		ignores: ['.html', '.png', '.svg', '.ico', '.json', '.txt']
	}).revManifest({dest: rel, trim: tar}).revReplace().target(rel);
	// minify html
	await fly.source(`${rel}/*.html`).htmlmin().target(rel);
	// make assets available for offline
	await fly.source(`${rel}/**/*`).precache({
		navigateFallback: 'index.html',
		stripPrefix: rel
	}).target(rel);
	// minify sw files
	await fly.source(`${rel}/*.js`).uglify(cUgly).target(rel);
	await fly.source(`${rel}/sw/*.js`).uglify(cUgly).target(`${rel}/sw`);
}

export async function watch(fly) {
	isWatch = 1;
	await fly.watch(src.js, ['scripts', 'reload']);
	await fly.watch(src.css, ['styles', 'reload']);
	await fly.watch(src.copy, ['copies', 'reload']);
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

export async function package(fly) {
	await fly.$.write(`${rel}/package.json`, `{
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
    "serve": "^3.2.7"
  }\n}`);
}
