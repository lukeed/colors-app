import { h } from 'preact';
import { bgc } from '../shared';
import { hex2rgb, isDark } from '../convert';
// import { hex2rgb, rgb2hsl, isLight } from '../convert';

export default ({idx, hex}) => {
	const rgb = hex2rgb(hex);
	let style = bgc(hex);
	isDark(rgb) && (style += 'color:white;');

	return (
		<li style={ style }>
			<strong>{ idx }</strong>
			<p>{ hex }</p>
		</li>
	);
};

				// const hsl = rgb2hsl(rgb);
				// <label>rgb({ rgb.join(', ') })</label>
				// <label>hsl({ hsl[0] }, { hsl[1] }%, { hsl[2] }%)</label>
