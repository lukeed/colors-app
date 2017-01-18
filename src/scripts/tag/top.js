import { h } from 'preact';

function hello(e) {
	console.log('hello', e);
}

export default ({ color }) => (
	<header id="top">
		<a id="logo" onClick={ hello }/>
		<h1>{ color.replace('-', ' ') }</h1>
		<div>
			HEX
		</div>
	</header>
);
