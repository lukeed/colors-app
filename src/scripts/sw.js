// Check to make sure service workers are supported in the current browser,
// and that the current page is accessed from a secure origin.
// Using a service worker from an insecure origin will trigger JS console errors
// @docs: http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features

const loc = window.location;

export const nav = window.navigator;

const isLocalhost = Boolean(loc.hostname === 'localhost' ||
	// [::1] is the IPv6 localhost address.
	loc.hostname === '[::1]' ||
	// 127.0.0.1/8 is considered localhost for IPv4.
	loc.hostname.match(
		/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
	)
);

// If serviceWorkers are supported & should be initialized here
export const isOk = ('serviceWorker' in nav && (loc.protocol === 'https:' || isLocalhost));

// If successefully registered, continue with caching
export function onSuccess(registration) {
	// Check to see if there's an updated version of service-worker.js with new files to cache:
	// @docs: https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-registration-update-method
	if (typeof registration.update === 'function') {
		registration.update();
	}

	// updatefound is fired if 'service-worker.js' changes.
	registration.onupdatefound = function () {
		// updatefound is also fired the very first time the SW is installed,
		// and there's no need to prompt for a reload at that point.
		// So check here to see if the page is already controlled,
		// i.e. whether there's an existing service worker.
		if (nav.serviceWorker.controller) {
			// The updatefound event implies that registration.installing is set:
			// @docs: https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
			const installing = registration.installing;

			installing.onstatechange = function () {
				switch (installing.state) {
					case 'installed':
						// At this point, the old content will have been purged and the
						// fresh content will have been added to the cache.
						// It's the perfect time to display a
						//    "New content is available; please refresh."
						// message in the page's interface.
						break;

					case 'redundant':
						throw new Error('The installing service worker became redundant.');

					default:
						// Ignore
				}
			};
		}
	};
}

// Something went wrong!
export function onError(e) {
	console.error('Error during service worker registration:', e);
}
