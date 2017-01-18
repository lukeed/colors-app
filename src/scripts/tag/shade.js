import { h } from 'preact';
import { animate, move } from '../burst';
import { bgc, doc, emit } from '../shared';
import { hex2rgb, rgb2hsl, isDark } from '../convert';

function copy(text) {
	const el = doc.createElement('input');
	el.value = text;
	doc.body.appendChild(el);
	el.select();
	doc.execCommand('copy');
	el.remove();
}

function handle(e) {
	const elm = e.target;
	// position #burst
	move(elm);
	// run animation
	animate(elm);
	// copy color text
	copy(elm.lastChild.textContent);
	// show toast
	emit('copied');
}

export default ({idx, hex, format}) => {
	const rgb = hex2rgb(hex);
	let style = bgc(hex);
	isDark(rgb) && (style += 'color:white;');

	let text;
	switch (format) {
		case 'hsl':
			const hsl = rgb2hsl(rgb);
			text = `hsl(${ hsl[0] }, ${ hsl[1] }%, ${ hsl[2] }%)`;
			break;
		case 'rgb':
			text = `rgb(${ rgb.join(', ') })`;
			break;
		default:
			text = `#${ hex }`;
			break;
	}

	return (
		<li style={ style } onClick={ handle }>
			<label>{ idx }</label>
			{ text }
		</li>
	);
};
