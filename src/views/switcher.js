import { h, Component } from 'preact';
import { on } from './shared';
import Radio from './radio';

const options = [
	{label: 'Material Design', value: 'material'},
	{label: 'Open Color', value: 'open'}
];

export default class Switcher extends Component {
	constructor(props) {
		this.state = { open:false };

		this.show = () => this.setState({ open:true });
		this.hide = cb => this.setState({ open:false }, cb && cb.call && cb);

		this.onChange = e => {
			const cb = () => props.onSelect(e.target.value);
			setTimeout(() => this.hide(cb), 300 * 1.1); // $base-timing
		};
	}

	componentDidMount() {
		on('popup', this.show);
	}

	shouldComponentUpdate(props, state) {
		return state.open !== this.state.open || props.selected !== this.props.selected;
	}

	render({ selected }, { open }) {
		let cls = 'modal';
		open && (cls += ' open');
		return (
			<div className={ cls }>
				<div className="modal__overlay" onClick={ this.hide } />

				<div className="modal__content">
					<h3>Select Palette</h3>
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
