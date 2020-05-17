# guid-ts

![Build and Test Typescript CI](https://github.com/piraces/guid-ts/workflows/Build%20and%20Test%20Typescript%20CI/badge.svg?branch=master) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=piraces_guid-ts&metric=alert_status)](https://sonarcloud.io/dashboard?id=piraces_guid-ts) ![npm bundle size](https://img.shields.io/bundlephobia/min/guid-ts) 

Package for generating and managing globally unique identifiers (GUIDs) v4 in Typescript.

Lightweight, simple, dependency free, and reliable package.

This package provides a class which can parse and generate a GUID based on the [RFC4122](https://www.ietf.org/rfc/rfc4122.txt).
The package also expose methods to manage GUIDs.

The focus of this package is to provide a simple mechanism to generate and manage v4 UUIDs, following this principles:
- Keep It Simple Stupid [(KISS Principle)](https://en.wikipedia.org/wiki/KISS_principle)
- Keep it lightweight
- Dependency free
- Well tested
- Reliable
- RFC compilant ([RFC4122](https://www.ietf.org/rfc/rfc4122.txt))
- Compatible with all major browsers
- Up-to-date

## Installation

Simply install it with your favourite package manager:

### Yarn

```shell
yarn add guid-ts
```

### NPM

```shell
npm install guid-ts
```

## Usage

```typescript
import { Guid } from 'guid-ts';

const newGuid = Guid.newGuid(); // => ex: b631e90e-6e7f-488e-88fb-a7c2ef44bb8d
```

You can use and test the package online on Stackblitz, checkout our example playground: [guid-ts-playground](https://stackblitz.com/edit/guid-ts-playground).

## Documentation

You can find all the code documentation in [https://piraces.github.io/guid-ts/index.html](https://piraces.github.io/guid-ts/index.html).
The documentation is generated using [TypeDoc](https://typedoc.org/), and resides in the `docs` folder. 

## How does it works?

The implementation is very simple. It basically generates random numbers to compose a valid v4 UUID, following the specification and a regex to check it.

### How do it generates random numbers?

In order to support all browsers as possible, the implementation checks if the browser has implemented the [Crypto API](https://caniuse.com/#feat=mdn-api_crypto_getrandomvalues) (or mscrypto in the case of IE11), in order to generate the random values, since it is a more reliable source for random values. If the crypto object its not available in runtime, then [Math.random()](https://caniuse.com/#feat=mdn-javascript_builtins_math_random) is used as a fallback (which is a less reliable source of random values, but available in almost all browsers).

## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png" alt="Samsung" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Samsung | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Opera |
| --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| IE6-IE11, Edge | 2-latest | 4-latest | 3.1-latest | 3.2-latest | 4-latest | 10-latest
