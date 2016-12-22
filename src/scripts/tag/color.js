import { h } from 'preact';
import { all, bgc } from '../shared';
// import { hex2rgb, rgb2hsl, isLight } from '../convert';
import { hex2rgb, isDark } from '../convert';

const Row = ({idx, hex}) => {
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

export default ({ color }) => {
	const obj = all[color];

	return (
		<ul id="color">
			<Row idx="500" hex={ obj['500'] } />
			{
				Object.keys(obj).map(k => (
					<Row idx={ k } hex={ obj[k] } />
				))
			}
		</ul>
	);
};
