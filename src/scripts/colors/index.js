import * as MD from './material';
import * as OC from './open';

/**
 * Pair Color values with Key names.
 * - (color list length is variable)
 */
const pair = (colors, keys) => {
	let i, k, len, out = {};
	for (k in colors) {
		out[k] = {};
		len = colors[k].length;
		for (i = 0; i < len; i++) {
			out[k][keys[i]] = colors[k][i];
		}
	}
	return out;
};

const format = obj => ({
	base: obj.base,
	names: obj.names,
	colors: pair(obj.all, obj.keys)
});

export default {
	material: format(MD),
	open: format(OC)
}
