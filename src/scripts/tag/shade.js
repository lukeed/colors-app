import { h } from 'preact';
import { bgc, doc } from '../shared';
import { hex2rgb, isDark } from '../convert';
// import { hex2rgb, rgb2hsl, isLight } from '../convert';

function copy(e) {
	const el = doc.createElement('input');
	el.value = e.target.lastChild.textContent;
	doc.body.appendChild(el);
	el.select();
	doc.execCommand('copy');
	el.remove();
}

export default ({idx, hex}) => {
	const rgb = hex2rgb(hex);
	let style = bgc(hex);
	isDark(rgb) && (style += 'color:white;');

	return (
		<li style={ style } onDblClick={ copy }>
			<strong>{ idx }</strong>
			<p>{ hex }</p>
		</li>
	);
};

				// const hsl = rgb2hsl(rgb);
				// <label>rgb({ rgb.join(', ') })</label>
				// <label>hsl({ hsl[0] }, { hsl[1] }%, { hsl[2] }%)</label>
