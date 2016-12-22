import {h, render} from 'preact';
import {nav, isOk, onSuccess, onError} from './sw';
import App from './views';

// render app to document
render(<App/>, document.body);

if (isOk) {
	// cache all assets if browser supports serviceworker
	nav.serviceWorker.register('/service-worker.js').then(onSuccess).catch(onError);
}
