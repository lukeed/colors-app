import { h } from 'preact';
import { bg, doc, emit } from './shared';
import { hex2rgb, rgb2hsl, isDark } from '../colors/convert';

function copy(text) {
	const el = doc.createElement('input');
	el.value = text;
	doc.body.appendChild(el);
	el.select();
	doc.execCommand('copy');
	el.remove();
}

function handle(e) {
	const color = e.target.lastChild.textContent;
	emit('copied', { color, x:e.x, y:e.y });
	copy(color);
}

export default ({ idx, hex, format }) => {
	let style = bg(hex);
	const rgb = hex2rgb(hex);
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
			<span>{ text }</span>
		</li>
	);
}
