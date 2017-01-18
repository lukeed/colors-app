export const win = window;
export const doc = document;
export const loc = win.location;
export const nav = win.navigator;

export const bgc = str => `background-color: ${str};`;

export function id(str) {
	return doc.getElementById(str);
}

export const burst = id('burst');
