/* global: mojs */
import tweens from './tweens';
import { burst, win } from './shared';

let timeline;

function init () {
	const anims = tweens();
	timeline = new mojs.Timeline();
	// add each to timeline
	for (var k = 0; k < anims.length; k++) {
		timeline.add(anims[k]);
	}
	console.log(anims);
	console.log(timeline);
	// single play
	timeline.play();
}

// read & set dimensions; do once per resize
function getDimensions(node) {
	return node.getBoundingClientRect();
}

// move to item position
export function move(node) {
	const dims = getDimensions(node);

	for (const k in dims) {
		burst.style[k] = `${dims[k]}px`;
	}
}

export function animate(node) {
	if (!win.mojs) return;
	burst.style.zIndex = 9;
	return timeline ? timeline.replay() : init();
}
