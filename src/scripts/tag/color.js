import { h } from 'preact';
import { all, bgc } from '../shared';

const Row = ({idx, hex}) => (
	<li style={ bgc(hex) }>
		<p>{ idx }</p>
		<p>{ hex }</p>
	</li>
);

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
