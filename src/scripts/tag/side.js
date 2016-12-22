import { h } from 'preact';
import Square from './square';
import { names } from '../shared';

export default ({ color }) => (
	<nav id="side">
		{ names.map(s =>
			<Square color={ s } active={ s === color } />
		) }
	</nav>
);
