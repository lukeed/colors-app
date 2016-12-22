import { h, render, Component } from 'preact';
import { isOk, onSuccess, onError } from './sw';
import { nav, loc, win, doc, names } from './shared';
import Color from './tag/color';
import Side from './tag/side';
import Top from './tag/top';

const read = () => loc.hash.split('/').pop();

const App = ({ color }) => (
	<div id="app">
		<Top color={ color } />
		<main id="content">
			<Side color={ color } />
			<Color color={ color } />
		</main>
	</div>
);

let elem;
function draw(str) {
	elem = render(<App color={ str }/>, doc.body, elem);
}

function handler() {
	const hash = read();
	draw(names.indexOf(hash) > -1 ? hash : all[0])
}

win.onhashchange = handler;
doc.addEventListener('DOMContentLoaded', handler);

// cache all assets if browser supports serviceworker
if (isOk && process.env.NODE_ENV === 'production') {
	nav.serviceWorker.register('/service-worker.js').then(onOk).catch(onErr);
}
