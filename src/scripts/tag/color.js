import { h } from 'preact';
import { all, bgc } from '../shared';
import { hex2rgb, rgb2hsl } from '../convert';

const Row = ({idx, hex}) => {
	const rgb = hex2rgb(hex);
	const hsl = rgb2hsl(rgb);

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
