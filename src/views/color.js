import { h } from 'preact';
import schemes from '../scripts/colors';
import Shade from './shade';

// @todo: default key

export default ({ color, format, scheme }) => {
	const shades = schemes[scheme].colors[color];
	return h('ul', {id: 'color'}, Object.keys(shades).map(k => (
		<Shade idx={ k } format={ format } hex={ shades[k] } />
	)));
};
