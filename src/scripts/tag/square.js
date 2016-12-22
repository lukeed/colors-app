import { h } from 'preact';

export default ({ color, active }) => {
	let cls = `md-color-${color}-500`;
	active && (cls += ' active');
	return <a href={ `#/${color}` } className={ cls } />
};
