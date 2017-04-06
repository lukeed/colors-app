import { h, Component } from 'preact';
import { on } from './shared';

export default class Toast extends Component {
	constructor() {
		this.state = { open:false };

		this.hide = () => this.setState({ open:false });

		this.show = () => {
			this.setState({ open:true });
			setTimeout(this.hide, 3000);
		};
	}

	componentDidMount() {
		on('copied', this.show);
	}

	shouldComponentUpdate(_, state) {
		return state.open !== this.state.open;
	}

	render(_, { open }) {
		return (
			<div id="toast" className={ open ? 'open' : '' }>Copied!</div>
		);
	}
}
