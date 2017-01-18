export const win = window;
export const doc = document;
export const loc = win.location;
export const nav = win.navigator;

export const bgc = str => `background-color: ${str};`;

export function id(str) {
	return doc.getElementById(str);
}

export const burst = id('burst');

export function on(ev, handler) {
	doc.addEventListener(ev, handler);
}

export function off(ev, handler) {
	doc.removeEventListener(ev, handler);
}

export function emit(ev, detail) {
	const evt = detail ? new CustomEvent(ev, { detail }) : new Event(ev);
	doc.dispatchEvent(evt);
}
