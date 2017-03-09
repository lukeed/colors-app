export const doc = document;

export const bg = str => `background-color: #${str};`;

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
