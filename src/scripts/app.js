import { h, render, Component } from 'preact';
import { isOk, onSuccess, onError } from './sw';
import { on, modes, nav, id, loc, win, doc } from './shared';
import { names } from './schemes/md';
import Toast from './tag/toast';
import Color from './tag/color';
import Side from './tag/side';
import Top from './tag/top';

const read = () => loc.hash.split('/').pop();

const App = ({ color, format }) => (
	<div id="app">
		<Top color={ color } format={ format }
			onMode={ toggleMode } onLogo={ openSchemes }
		/>

		<main id="content">
			<Side color={ color } />
			<Color color={ color } format={ format } />
		</main>

		<Toast />
	</div>
);

let mode, idx = 0;
function toggleMode() {
	idx++;
	(idx >= modes.length) && (idx = 0);
	draw({mode: modes[idx]});
}

function openSchemes(e) {
	e.preventDefault();
	console.log('open schemes modal');
}

let elem, clor, name;
function draw(obj) {
	name = obj.name || name;
	mode = obj.mode || modes[idx];
	elem = render(<App color={ name } format={ mode } />, doc.body, elem);
	clor = clor || id('color');
}

let rID, pos;
function scrollUp() {
	pos = clor.scrollTop;
	if (pos <= 0) {
		pos = 0;
		cancelAnimationFrame(rID);
	} else {
		clor.scrollTop -= Math.min(60, pos * 0.28125);
		rID = requestAnimationFrame(scrollUp);
	}
}

function handler() {
	const hash = read();
	const name = names.indexOf(hash) > -1 ? hash : names[0];
	draw({name});
	scrollUp();
	ga && ga('send', 'pageview', name);
}

// init && redraw
win.onhashchange = handler;
on('DOMContentLoaded', handler);

// cache all assets if browser supports serviceworker
if (isOk && process.env.NODE_ENV === 'production') {
	nav.serviceWorker.register('/service-worker.js').then(onSuccess).catch(onError);
}
