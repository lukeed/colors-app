import { h, Component } from 'preact';
import { Router, route } from 'preact-router';
import { bg, emit } from './shared';
import Switcher from './Switcher';
import schemes from '../colors';
import Toaster from './toast';
import Shade from './shade2';
import Anim from './anim';
import Top from './top';

const modes = ['hex', 'rgb', 'hsl'];

let rID, pos, elm;
function scrollUp() {
	pos = elm.scrollTop;
	if (pos <= 0) {
		pos = 0;
		cancelAnimationFrame(rID);
	} else {
		elm.scrollTop -= Math.min(60, pos * 0.28125);
		rID = requestAnimationFrame(scrollUp);
	}
}

export default class App extends Component {
	constructor() {
		this.state = {
			palette: 'material',
			color: 'red',
			mode: 0
		};

		this.openModal = () => emit('popup');
		this.setPalette = val => route(`/${val}/red`);

		this.setMode = () => {
			let mode = this.state.mode + 1;
			(mode >= modes.length) && (mode = 0);
			this.setState({ mode });
		};

		this.onRoute = ({ previous, url }) => {
			if (window.ga) {
				ga.send('pageview');
			}

			// where are we?
			const curr = url.split('/');
			const palette = curr[1] || 'material';
			const color = curr[2] || 'red';

			if (curr.length !== 3) {
				return route(`/${palette}/${color}`, true);
			}

			this.setState({ palette, color }, () => previous && scrollUp());
		};
	}

	shouldComponentUpdate(state) {
		const now = this.state;
		return now.palette !== state.palette || now.color !== state.color || now.mode !== state.mode;
	}

	render(_, { palette, color, mode }) {
		console.info('~ rerender ~');
		const { names, colors, base } = schemes[palette];
		const shades = colors[color];
		const format = modes[mode];

		return (
			<div id="app">
				<Top color={ color } format={ format }
					onMode={ this.setMode } onLogo={ this.openModal }
				/>

				<Router onChange={ this.onRoute }>
					<main id="content" default>
						<nav id="side">
							{ names.map(k => <a href={ `/${palette}/${k}` } className={{ active: k===color }} style={ bg(colors[k][base]) } />)}
						</nav>

						<ul id="color" ref={ el => {elm = el} }>
							{ Object.keys(shades).map(k => <Shade idx={ k } format={ format } hex={ shades[k] } />) }
						</ul>
					</main>
				</Router>

				<Toaster />

				<Switcher selected={ palette } onSelect={ this.setPalette } />

				<Anim palette={ palette } />
			</div>
		);
	}
}
