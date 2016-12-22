import { h } from 'preact';
import { all } from '../shared';

export default ({ color, active }) => (
	<a href={ `#/${color}` }
		className={ active ? 'active' : '' }
		style={ `background-color: ${ all[color]['500'] }` }
	/>
);
