import {h, Component} from 'preact';

export default class Profile extends Component {
	constructor() {
		super(arguments);

		this.state = {count: 0};

		this.updateTime = () => {
			const time = new Date().toLocaleString();
			this.setState({time});
		};
	}

	componentDidMount() {
		// start a timer for the clock
		this.timer = setInterval(this.updateTime, 1000);
		this.updateTime();

		// increment `count` on every re-mount
		this.setState({count: this.state.count + 1});
	}

	componentWillMount() {
		clearInterval(this.timer);
	}

	// Note: `user` comes from the URL, a la router
	render({user}, {time, count}) {
		return (
			<div className="page page__profile">
				<h1>Profile: { user }</h1>
				<p>This is the user profile for user: { user }</p>

				<div>Current time: { time }</div>
				<div>Profile route mounted { count } times.</div>
			</div>
		);
	}
}
