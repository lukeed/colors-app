import { h } from 'preact';
import { animate, move } from '../burst';
import { bgc, doc, emit } from '../shared';
import { hex2rgb, isDark } from '../convert';
// import { hex2rgb, rgb2hsl, isLight } from '../convert';

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

export default ({idx, hex}) => {
	const rgb = hex2rgb(hex);
	let style = bgc(hex);
	isDark(rgb) && (style += 'color:white;');

	return (
		<li style={ style } onDblClick={ handle }>
			<strong>{ idx }</strong>
			<p>{ hex }</p>
		</li>
	);
};

				// const hsl = rgb2hsl(rgb);
				// <label>rgb({ rgb.join(', ') })</label>
				// <label>hsl({ hsl[0] }, { hsl[1] }%, { hsl[2] }%)</label>
