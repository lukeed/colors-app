# fly-kit-preact

> A starter kit for building offline / SPA / PWA apps with [Preact](https://preactjs.com/) :atom_symbol:

**Do you want to kickstart a new project with [Preact](https://preactjs.com/) but _hate_ dealing with build tools?**<br>
Great! :laughing: You've come to the right place! By using `fly-kit-preact`, you will skip the "tooling phase" & jump straight into application development.

This configuration fits the "90% use-case" for those who want to build offline-first web apps. See the included [features](#features) below. However, with [Fly](https://github.com/flyjs/fly), it's very easy to add or change settings for your needs.

> Synonymous buzzwords: [SPA](https://en.wikipedia.org/wiki/Single-page_application), [PWA](https://developers.google.com/web/updates/2015/12/getting-started-pwa), [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)

**Please note:** Boilerplate _does not_ incorporate the latest ["css-in-js" or "css modules" techniques](https://github.com/MicheleBertoli/css-in-js). Instead, the more traditional approach is taken wherein `styles` and `scripts` are kept separate. That said, you may **certainly and easily** take that route if desired. :white_check_mark:

---
<p align="center">:warning: Boilerplate & commands will evolve as my own development process does. :warning:</p>
---

## Install

```sh
git clone https://github.com/lukeed/fly-kit-preact
npm install
npm start
```

> :exclamation: **Pro Tip:** Use [Yarn](https://yarnpkg.com/) to install dependencies 3x faster than NPM!

## Features

* Offline Caching (via `serviceWorker`)
* SASS & Autoprefixer
* Asset Versioning (aka "cache-busting")
* ES2015 (ES6) and ES2016 (ES7) support via [Buble](https://buble.surge.sh/guide/)
* JavaScript linting via [XO](https://github.com/sindresorhus/xo) and [`eslint-config-xo-preact`](https://github.com/adriantoine/eslint-config-xo-preact)

## Development

### Commands

Any of the following commands can (and should :wink:) be run from the command line.

> If using [Yarn](https://yarnpkg.com/), all instances of `npm` can be replaced with `yarn`. :ok_hand:

#### build

```
$ npm run build
```

Compiles all files. Output is sent to the `dist` directory.

#### release

```
$ npm run release
```

Builds the app for production, includes [cache-busting](http://webassets.readthedocs.io/en/latest/expiring.html) asset names. Output is sent to the `release` directory.

#### start

```
$ npm start
```

Executes [`build`](#build) and runs your application (from the `dist` directory) in the browser.

#### test

```
$ npm run test
```

Lints all JavaScript files.

#### watch

```
$ npm run watch
```

Like [`start`](#start), but will auto-compile & auto-reload the server after any file changes within the `src` directory.


## License

MIT © [Luke Edwards](https://lukeed.com)
