import {h, Component} from 'preact';
import {Router} from 'preact-router';

import Header from './components/header';
import Profile from './pages/profile';
import Home from './pages/home';

export default class App extends Component {
	constructor() {
		super(arguments);

		// fires when route changes
		this.handleRoute = e => {
			this.currentUrl = e.url;
		};
	}

	render() {
		return (
			<div id="app">
				<Header/>
				<Router onChange={this.handleRoute}>
					<Home path="/"/>
					<Profile path="/profile/" user="me"/>
					<Profile path="/profile/:user"/>
				</Router>
			</div>
		);
	}
}
