import { h } from 'preact';
import { all } from '../shared';
import Shade from './shade';

export default ({ color }) => {
	const obj = all[color];

	return (
		<ul id="color">
			<Shade idx={ 500 } hex={ obj[500] } />
			{
				Object.keys(obj).map(k => (
					<Shade idx={ k } hex={ obj[k] } />
				))
			}
		</ul>
	);
};
