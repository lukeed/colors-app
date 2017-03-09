import { h } from 'preact';
import { bg, doc, emit } from '../scripts/shared';
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
	copy(e.target.lastChild.textContent);
	emit('copied'); // show toast
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
