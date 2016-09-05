Quality, Faster.
================
The companion code repository for Xolv.io's ["Quality Faster"](http://quality.xolv.io) knowledge base and guide.

## The Tech Stack  
* [Gulp](http://gulpjs.com/) orchestrates.
* [Mocha](http://mochajs.org) runs server-side Node.js based tests.
* [Karma](https://karma-runner.github.io/) runs client-side browser tests.
* [Chimp](http://chimpjs.com) runs acceptance and end-to-end.

## Installation
```bash
git clone https://github.com/xolvio/quality-faster.git
cd quality-faster
npm install
```

### Watch Mode
When you are developing, you want the fastest possible feedback to let you know if you've broken any tests. To do that, this code repository allows you to run client, server, acceptance and end-to-end tests at hyper speeds using a hand-picked and configured test stack.

It is recommended that you start each commands below in a separate terminal window, and to make that sure you can see all of them with the IDE.

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
