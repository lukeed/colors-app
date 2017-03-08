import { h, Component } from 'preact';
import { Router, route } from 'preact-router';
import palettes from '../scripts/colors';
import { bgc } from '../scripts/shared';
import Toaster from './toast';
import Shade from './shade';
import Top from './top';

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
			mode: 'hex' // @todo integers
		};

		this.onRoute = ({ previous, url }) => {
			if (process.env.NODE_ENV === 'production') {
				ga('send', 'pageview', url);
			}

			// where are we?
			const curr = url.split('/');
			const palette = curr[1] || 'material';
			const color = curr[2] || 'red';

			if (curr.length !== 3) {
				return route(`/${palette}/${color}`, true);
			}

			this.setState({ palette, color }, () => previous && scrollUp());
		}
	}

	shouldComponentUpdate(state) {
		const now = this.state;
		const bool = now.palette !== state.palette || now.color !== state.color || now.mode !== state.mode;
		console.log('root should update?', bool);
		return bool;
	}

	render(_, { palette, color, mode }) {
		console.info('~ rerender ~');
		const { names, colors, base } = palettes[palette];
		const shades = colors[color];

		return (
			<div id="app">
				<Top color={ color } format={ mode }
					onMode={ () => console.log('toggleMode') } onLogo={ () => console.log('openSchemes') }
				/>

				<Router onChange={ this.onRoute }>
					<main id="content" default>
						<nav id="side">
							{ names.map(k => <a href={ `/${palette}/${k}` } className={{ active: k===color }} style={ bgc(colors[k][base]) } />)}
						</nav>

						<ul id="color" ref={ el => {elm = el} }>
							{ Object.keys(shades).map(k => <Shade idx={ k } format={ mode } hex={ shades[k] } />) }
						</ul>
					</main>
				</Router>

				<Toaster />
			</div>
		);
	}
}
