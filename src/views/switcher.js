import { h, Component } from 'preact';
import { on } from '../scripts/shared';
import Radio from './radio';

const options = [
	{label: 'Material Design', value: 'material'},
	{label: 'Open Color', value: 'opencolor'}
];

export default class Switcher extends Component {
	constructor(props) {
		this.state = { open:false };

		this.show = () => this.setState({ open:true });
		this.hide = cb => this.setState({ open:false }, cb || function () {});

		this.onChange = e => {
			const val = e.target.value; // not ideal, but meh
			this.hide(() => props.onSelect(val));
		};
	}

	componentDidMount() {
		on('popup', this.show);
	}

	shouldComponentUpdate(_, state) {
		return state.open !== this.state.open;
	}

	render({ selected }, { open }) {
		return (
			<div className={{ modal:true, open }}>
				<div className="modal__overlay" onClick={ this.hide } />

				<div className="modal__content">
					<h5>Select Palette</h5>
					{ options.map(obj =>
						<Radio label={ obj.label } value={ obj.value }
							checked={ obj.value===selected } onChange={ this.onChange }
						/>
					) }
				</div>
			</div>
		);
	}
}
