import { h } from 'preact';
import Square from './square';
import { all } from '../shared';

export default ({ color }) => (
	<nav id="side" dflex column>
		{ all.map(s =>
			<Square color={ s } active={ s === color } />
		) }
	</nav>
);
