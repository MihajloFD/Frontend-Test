# React Redux Starter Kit



## Table of Contents
1. [Features](#features)
1. [Requirements](#requirements)
1. [Getting Started](#getting-started)

## Features
* [react](https://github.com/facebook/react)
* [redux](https://github.com/rackt/redux)
* [react-router](https://github.com/rackt/react-router)
* [webpack](https://github.com/webpack/webpack)
* [babel](https://github.com/babel/babel)
* [express](https://github.com/expressjs/express)
* [karma](https://github.com/karma-runner/karma)
* [eslint](http://eslint.org)

## Requirements
* node `^8.4.0`
* npm `^5.3.0`

## Getting Started

After confirming that your development environment meets the specified [requirements](#requirements), you can start a project by doing the following:

### Install from source

First, clone the project:

```bash
$ git clone git@github.com:dcoric/react-redux-starter-kit.git
$ cd react-redux-starter-kit
```

Then install dependencies and check to see it works. It is recommended that you use `npm install`

```bash
$ npm install    # Install project dependencies
$ npm start      # Compile and launch (same as `npm start`)
```

Create copy .env.example to .env and adjust custom values. Build is set by default to 'development'. Other values are qa, and production

```bash
$ cp .env.example .env
```

While developing, you will probably rely mostly on `npm start`; however, there are additional scripts at your disposal:

|`npm run <script>`|Description|
|------------------|-----------|
|`start`|Serves your app at `localhost:3000`. HMR will be enabled in development.|
|`compile`|Compiles the application to disk (`~/dist` by default).|
|`dev`|Same as `npm start`, but enables nodemon for the server as well.|
|`test`|Runs unit tests with Karma and generates a coverage report.|
|`test:dev`|Runs Karma and watches for changes to re-run tests; does not generate coverage reports.|
|`deploy`|Runs linter, tests, and then, on success, compiles your application to disk.|
|`devbuild`|Same as `deploy` but overrides `NODE_ENV` to "development".|
|`qabuild`|Same as `deploy` but overrides `NODE_ENV` to "qa".|
|`prodbuild`|Same as `deploy` but overrides `NODE_ENV` to "production".|
|`lint`|Lint all `.js` files.|
|`lint:fix`|Lint and fix all `.js` files. [Read more on this](http://eslint.org/docs/user-guide/command-line-interface.html#fix).|
