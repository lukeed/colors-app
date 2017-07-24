'use strict';

const bs = require('browser-sync');
const cRoll = require('./config/rollup');
const cUgly = require('./config/uglify');

let isWatch = process.argv.indexOf('watch') !== -1;

const tar = 'dist';
const rel = 'release';
const node = 'node_modules';
const src = {
	js: 'src/index.js',
	css: 'src/index.sass',
	copy: ['src/static/**/*.*', 'src/*.html'],
	watch: { js:'src/**/*.js', css:'src/**/*.sass' },
	vendor: [`${node}/animejs/anime.min.js`]
};

export async function copies(task, o) {
	await task.source(o.src || src.copy).target(tar);
}

export async function vendor(task) {
	await task.source(src.vendor).concat('vendor.js').target(`${tar}/js`);
}

let conf;
export async function scripts(task) {
	conf = conf || cRoll(isWatch && 'development');
	await task.source(src.js).rollup(conf).target(`${tar}/js`);
}

export async function styles(task) {
	await task.source(src.css).sass({
		includePaths: ['node_modules/md-colors/src'],
		outputStyle: 'compressed'
	}).autoprefixer().target(`${tar}/css`);
}

export async function build(task) {
	await task.clear([tar, rel]).parallel(['vendor', 'copies', 'scripts', 'styles']);
}

export async function release(task) {
	// minify js
	await task.source(`${tar}/js/*`).uglify(cUgly).target(`${tar}/js`);
	// version assets
	await task.source(`${tar}/**/*`).rev().revManifest({dest: rel, trim: tar}).revReplace().target(rel);
	// remove `rev-manifest.json` (no need)
	await task.clear(`${rel}/rev-manifest.json`);
	// minify html
	await task.source(`${rel}/*.html`).htmlmin().target(rel);
	// make assets available for offline
	await task.source(`${rel}/**/*`).precache({
		navigateFallback: 'index.html',
		stripPrefix: rel
	}).target(rel);
	// minify sw files
	await task.source(`${rel}/*.js`).uglify(cUgly).target(rel);
	await task.source(`${rel}/sw/*.js`).uglify(cUgly).target(`${rel}/sw`);
	// create `package.json` for `now deploy`
	await task.start('package');
}

export async function package(task) {
	const pkg = require('./package.json');
	const next = require('./config/template')(pkg.version);
	await task.$.write(`${rel}/package.json`, JSON.stringify(next, null, '  '));
}

export async function watch(task) {
	isWatch = true;
	await task.watch(src.copy, ['copies', 'reload']);
	await task.watch(src.watch.js, ['scripts', 'reload']);
	await task.watch(src.watch.css, ['styles', 'reload']);
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
