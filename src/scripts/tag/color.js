import { h } from 'preact';
import { all, bgc } from '../shared';
import { hex2rgb, rgb2hsl } from '../convert';

const Row = ({idx, hex}) => {
	const rgb = hex2rgb(hex);
	const hsl = rgb2hsl(rgb);

	return (
		<li style={ bgc(hex) }>
			<p>{ idx }</p>
			<p>{ hex }</p>
			<p>{ rgb }</p>
			<p>{ hsl }</p>
		</li>
	);
};

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
