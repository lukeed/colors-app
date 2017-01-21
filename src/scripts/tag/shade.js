import { h, Component } from 'preact';
import { animate, move } from '../burst';
import { bgc, doc, emit } from '../shared';
import { hex2rgb, rgb2hsl, isDark } from '../convert';
import CopyAnimation from './copy-animation';

// class PubSub {
// 	constructor() { this._subscribers = {}; }
// 	subscribe(channelName, callback) {
// 		let channel = this._subscribers[channelName];
// 		if (channel == null) {
// 			channel = [];
// 			this._subscribers[channelName] = channel;
// 		}
// 		channel.push(callback);
// 	}
//
// 	publish(channelName, data) {
// 		const channel = this._subscribers[channelName];
// 		if (channel == null) { return 1; }
// 		console.log(channel);
//
// 		for (let i = 0; i < channel; i++) {
// 			const callback = channel[i];
// 			if (typeof callback === 'function') {
// 				callback(data);
// 			}
// 		}
//
// 	}
// }
//
// const pubsub = new PubSub;

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
		let style = bgc(hex);
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
				<CopyAnimation timeline={this._timeline} x={x} y={y} />
				<label>{ idx }</label>
				<span>{ text }</span>
			</li>
		);
	}
}

export default Shade;
