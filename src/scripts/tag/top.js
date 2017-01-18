import { h } from 'preact';

export default ({ color, format, onMode, onLogo }) => (
	<header id="top">
		<a id="logo" onClick={ onLogo } />

		<h1>{ color.replace('-', ' ') }</h1>

		<div onClick={ onMode }>{ format }</div>
	</header>
);
