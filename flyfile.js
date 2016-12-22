'use strict';

const bs = require('browser-sync');
const rcf = require('./config/rollup');
const cUgly = require('./config/uglify');

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
		// js vendors to be merged as `vendor.js`
		`${node}/promise-polyfill/promise.min.js`
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

export async function vendors() {
	await this.source(src.vendor).concat('vendor.js').target(`${tar}/js`);
}

export async function styles() {
	await this.source('src/styles/app.sass').sass({
		outputStyle: 'compressed',
		includePaths: [`${node}/md-colors/src`]
	}).autoprefixer().target(`${tar}/css`);
}

export async function build() {
	await this.serial(['clean', 'copies', 'vendors', 'scripts', 'styles']); // @todo: parallel
}

export async function release() {
	await this.start('build');
	// minify js
	await this.source(`${tar}/js/*`).uglify(cUgly).target(`${tar}/js`);
	// version assets
	await this.source(`${tar}/**/*`).rev({
		ignores: ['.html', '.png', '.svg', '.ico', '.json', '.txt']
	}).revManifest({dest: rel, trim: tar}).revReplace().target(rel);
	// make assets available for offline
	await this.source(`${rel}/**/*`).precache({
		stripPrefix: rel,
		cacheId: 'fly-kit-preact',
		navigateFallback: 'index.html'
	}).target(rel);
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
