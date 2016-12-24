/**
 * Burst Animation / Tweens
 */

import { burst } from './shared';

export default () => {
	const { Shape, easing } = mojs;

	return [
		// ring animation
		new Shape({
			parent: burst,
			duration: 750,
			type: 'circle',
			radius: {0: 40},
			fill: 'transparent',
			stroke: '#F35186',
			strokeWidth: {35:0},
			opacity: 0.2,
			top: '45%',
			easing: easing.bezier(0, 1, 0.5, 1)
		}),
		new Shape({
			parent: burst,
			duration: 500,
			delay: 100,
			type: 'circle',
			radius: {0: 20},
			fill: 'transparent',
			stroke: '#F35186',
			strokeWidth: {5:0},
			opacity: 0.2,
			x : 40,
			y : -60,
			easing: easing.sin.out
		}),
		new Shape({
			parent: burst,
			duration: 500,
			delay: 180,
			type: 'circle',
			radius: {0: 10},
			fill: 'transparent',
			stroke: '#F35186',
			strokeWidth: {5:0},
			opacity: 0.5,
			x: -10,
			y: -80,
			isRunLess: true,
			easing: easing.sin.out
		}),
		new Shape({
			parent: burst,
			duration: 800,
			delay: 240,
			type: 'circle',
			radius: {0: 20},
			fill: 'transparent',
			stroke: '#F35186',
			strokeWidth: {5:0},
			opacity: 0.3,
			x: -70,
			y: -10,
			easing: easing.sin.out
		}),
		new Shape({
			parent: burst,
			duration: 800,
			delay: 240,
			type: 'circle',
			radius: {0: 20},
			fill: 'transparent',
			stroke: '#F35186',
			strokeWidth: {5:0},
			opacity: 0.4,
			x: 80,
			y: -50,
			easing: easing.sin.out
		}),
		new Shape({
			parent: burst,
			duration: 1000,
			delay: 300,
			type: 'circle',
			radius: {0: 15},
			fill: 'transparent',
			stroke: '#F35186',
			strokeWidth: {5:0},
			opacity: 0.2,
			x: 20,
			y: -100,
			easing: easing.sin.out,
			onUpdate: int => (int === 1) ? burst.style.zIndex = 0 : false
		}),
		new Shape({
			parent: burst,
			duration: 600,
			delay: 330,
			type: 'circle',
			radius: {0: 25},
			fill: 'transparent',
			stroke: '#F35186',
			strokeWidth: {5:0},
			opacity: 0.4,
			x: -40,
			y: -90,
			easing: easing.sin.out
		})
	];
};
