import { h } from 'preact';
import { all, names } from '../schemes/md';
import { bgc } from '../shared';

export default ({ color }) =>
	h('nav', {id: 'side'}, [
		names.map(name => h('a', {
			href: `#/${name}`,
			className: (name === color) ? 'active' : '',
			style: bgc( all[name]['500'] )
		}))
	]);
