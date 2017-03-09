import { h, Component } from 'preact';
// import { animate, move } from '../burst';
import { bg, doc, emit } from '../scripts/shared';
import { hex2rgb, rgb2hsl, isDark } from '../colors/convert';
// import CopyAnimation from './copy-animation';

function copy(text) {
	const el = doc.createElement('input');
	el.value = text;
	doc.body.appendChild(el);
	el.select();
	doc.execCommand('copy');
	el.remove();
}

function handle(e) {
	const elm = e.target;
	copy(elm.lastChild.textContent);
	// show toast
	emit('copied');

	this.setState({ x: e.layerX, y: e.layerY });
	// defer
	setTimeout(()=> { this._timeline.replay(); }, 10 );
}

class Shade extends Component {
	constructor() {
		super();
		this._timeline = new mojs.Timeline;
		this.state = { x: 0, y: 0 };
	}

	render() {
		const {idx, hex, format} = this.props;

		const rgb = hex2rgb(hex);
		let style = bg(hex);
		isDark(rgb) && (style += 'color:white;');

		let text;
		switch (format) {
			case 'hsl':
				const hsl = rgb2hsl(rgb);
				text = `hsl(${ hsl[0] }, ${ hsl[1] }%, ${ hsl[2] }%)`;
				break;
			case 'rgb':
				text = `rgb(${ rgb.join(', ') })`;
				break;
			default:
				text = `#${ hex }`;
				break;
		}

		const {x, y} = this.state;

		return (
			<li style={ style } onClick={ handle.bind(this) }>
				<label>{ idx }</label>
				<span>{ text }</span>
			</li>
		);
	}
				// <CopyAnimation timeline={this._timeline} x={x} y={y} />
}

export default Shade;
