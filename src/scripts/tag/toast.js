import { h, Component } from 'preact';
import { on, win } from '../shared';

export default class Toast extends Component {
	constructor() {
		super(arguments);

		this.state = {open: false};

		this.hideToast = () => this.setState({open: false});

		this.showToast = () => {
			this.setState({open: true});
			setTimeout(this.hideToast, 3000);
		};
	}

	componentDidMount() {
		on('copied', this.showToast);
	}

	shouldComponentUpdate(_, { open }) {
		return open !== this.state.open;
	}

	render(_, { open }) {
		return (
			<div id="toast" className={ open ? 'opened' : '' }>Copied!</div>
		);
	}
}
