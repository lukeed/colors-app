import { h } from 'preact';
import schemes from '../scripts/colors';
import { bgc } from '../scripts/shared';

export default ({ scheme, color }) => {
	const { names, colors, base } = schemes[scheme];
	return h('nav', {id: 'side'}, names.map(name => h('a', {
		href: `/${scheme}/${name}`,
		className: { active: name === color },
		style: bgc(colors[name][base])
	})));
}
