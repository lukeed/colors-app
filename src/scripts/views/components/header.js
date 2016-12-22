import {h} from 'preact';
import {Link} from 'preact-router';

export default () => (
	<header className="header">
		<h1>Fly Kit: Preact</h1>
		<nav>
			<Link href="/">Home</Link>
			<Link href="/profile">Me</Link>
			<Link href="/profile/john">John</Link>
		</nav>
	</header>
);
