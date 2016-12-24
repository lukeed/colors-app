/* global: mojs */
import { burst, win } from './shared';

const { Burst, Shape } = mojs;

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
	console.log('hello', node);
}
