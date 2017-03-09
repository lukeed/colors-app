import { h } from 'preact';
import { all } from '../schemes/md';
import Shade from './shade';

export default ({ color, format }) => {
	const obj = all[color];

	return (
		<ul id="color">
			<Shade idx={ 500 } format={ format } hex={ obj[500] } />
			{
				Object.keys(obj).map(k => (
					<Shade idx={ k } format={ format } hex={ obj[k] } />
				))
			}
		</ul>
	);
};
