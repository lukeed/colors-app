import { h, Component } from 'preact';
import { on, emit } from './shared';

export default class Anim extends Component {
	constructor() {
		this.state = { x:0, y:0, play:false };

		this.activate = e => {
			if (!window.anime) {
				console.info('--> vendor.js has not loaded');
				return emit('toast');
			}
			const data = e.detail;
			console.log('am here', data);
		}
	}

	componentDidMount() {
		on('copied', this.activate);
	}

	shouldComponentUpdate(_, state) {
		const now = this.state;
		return state.play !== now.play || state.x !== now.x || state.y !== now.y;
	}


}
