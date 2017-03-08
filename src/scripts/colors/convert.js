/**
 * `hex-rgb`
 * @see https://github.com/sindresorhus/hex-rgb
 */
export function hex2rgb(hex) {
	hex = hex.replace(/^#/, '');

	if (hex.length === 3) {
		hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
	}

	const num = parseInt(hex, 16);
	return [num >> 16, num >> 8 & 255, num & 255];
}

export function isDark(rgb) {
  return Math.round(
		((parseInt(rgb[0]) * 299) + (parseInt(rgb[1]) * 587) + (parseInt(rgb[2]) * 114)) / 1000
	) <= 140;
}

/**
 * `colr-convert`
 * @see https://github.com/stayradiated/colr-convert
 */
export function rgb2hsl (rgb) {
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  const dif = max - min;

	let h = Math.min((
		max === min ? 0 :
		r === max ? (g - b) / dif :
		g === max ? 2 + (b - r) / dif :
		b === max ? 4 + (r - g) / dif : 0
	) * 60, 360);

  if (h < 0) {
    h += 360;
  }

  const l = (min + max) / 2 * 100;

	const s = 100 * (
		max === min ? 0 :
		l <= 0.5 ? dif / (max + min) :
		dif / (2 - max - min)
	);

	return [h, s, l].map(Math.round);
}
