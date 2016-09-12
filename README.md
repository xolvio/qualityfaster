[![Build Status](https://travis-ci.org/xolvio/qualityfaster.svg?branch=dev)](https://travis-ci.org/xolvio/qualityfaster) [![CircleCI](https://circleci.com/gh/xolvio/qualityfaster/tree/dev.svg?style=svg)](https://circleci.com/gh/xolvio/qualityfaster/tree/dev)

Quality, Faster.
================
The companion code repository for Xolv.io's ["Quality Faster"](http://quality.xolv.io) knowledge base and guide.

## The Tech Stack
The following tools and technologies are used in this repository:
  
* [Gulp.js](http://gulpjs.com/) for orchestration.
* [Mocha](http://mochajs.org) to test server-side Node.js code.
* [Karma](https://karma-runner.github.io/) to test client-side browser code.
* [Chimp.js](http://chimpjs.com) to run acceptance and end-to-end tests.

Optional but HIGHLY recommended
* [Wallaby.js](http://wallabyjs.com) to run in-IDE unit tests in real time. 

## Installation
```bash
git clone https://github.com/xolvio/quality-faster.git
cd quality-faster
npm install
```

## Usage

### Development Mode
When you are developing, you want the fastest possible feedback to let you know if you've broken any tests. To do that, this code repository allows you to run client, server, acceptance and end-to-end tests at hyper speeds.

#### Option A: Paid (Recommended)
Wallaby.js provides you with real-time feedback in your IDE. This feature is completely inline with the "Quality Faster" ethos and therefore it is highly recommended. The tool saves you a lot of time which means money, and so it pays back for itself in no time.

You'll need to first install Wallaby.js for your IDE. You can find [a list of supported IDEs here](https://wallabyjs.com/docs/intro/install.html) and instructions on how to install and run the plugin. 

Once you've installed the plugin, you just need to create two run configurations for the client and server using the `.wallaby-client.js` and `.wallaby-server.js` files.

At the time of writing this, Wallaby only supports running one mode at a time, so you'll need to switch between the server and client modes as you work on the respective files.

In addition to running Wallaby.js server/client tests, you'll also need to run acceptance and end-to-end tests using Chimp's watch mode as follows: 

```bash
npm run watch:e2e
```

#### Option B: Free
You also have the option of using the watch modes we have provided using Gulp and Karma.

Start each commands below in a separate terminal window, and to make that sure you can see all of them with the IDE.
```bash
npm run watch:client
npm run watch:server
npm run watch:e2e
```

You can also start all the modes in one terminal, but be warned that this can get noisy:
```bash
npm run watch
```

### Build / CI Mode
Using the command below, you can run all the tests in the following sequence: client > server > e2e
```bash
npm test
```

And if you want to run single test modes individually, you can do so like this:
```bash
npm run test:client
npm run test:server
npm run test:e2e
```
