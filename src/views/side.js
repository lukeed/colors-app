import { h } from 'preact';
import schemes from '../scripts/colors';
import { bgc } from '../scripts/shared';

export default ({ scheme, color }) => {
	const obj = schemes[scheme];
	return h('nav', {id: 'side'}, obj.names.map(name => h('a', {
		href: `/${scheme}/${name}`,
		className: { active: name === color },
		style: bgc(obj.colors[name]['6']) // @todo default key
	})));
}
