import { h, render } from 'preact';
import GAnalytics from 'ganalytics';
import { doc } from './views/shared';
import App from './views';

render(<App />, doc.body);

if (process.env.NODE_ENV === 'production') {
	// cache all assets if browser supports serviceworker
	if ('serviceWorker' in navigator && location.protocol === 'https:') {
		navigator.serviceWorker.register('/service-worker.js');
	}

	// add Google Analytics
	window.ga = new GAnalytics('UA-41153115-6');
}
