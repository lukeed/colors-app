/**
 * Create a `dist/package.json`
 * @param  {Number} semver  Current semver
 */
module.exports = semver => ({
	name: 'colors',
	version: semver,
	repository: 'lukeed/colors-app',
	author: {
		name: 'Luke Edwards',
		email: 'luke.edwards05@gmail.com',
		url: 'https://lukeed.com'
	},
	scripts: {
		start: 'serve -s'
	},
	dependencies: {
		'serve': '^4.0.0'
	}
});
