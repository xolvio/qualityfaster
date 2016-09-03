Quality, Faster.
================
The companion repository for Xolv.io's "Quality Faster" knowledge base and guide.

## Installation

```bash
git clone https://github.com/xolvio/quality-faster.git
cd quality-faster
npm install
```


### Development Mode
To start both client and server in watch mode:
```
npm run watch
```

To start server watch mode:
```
npm run watch:mocha
```

To start client watch mode:
```
npm run watch:karma
```

### Continuous Integration
To run all the tests (client and server) both locally or on CI:
```
npm test
```
To run all the tests (server only) both locally or on CI:
```
npm test:mocha
```
To run all the tests (client only) both locally or on CI:
```
npm test:karma
```
