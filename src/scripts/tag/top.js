import { h } from 'preact';

export default ({ color }) => (
	<header id="top">
		<h1>{ color.replace('-', ' ') }</h1>
	</header>
);
