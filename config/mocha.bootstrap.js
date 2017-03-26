const main = require('require-main-filename')();

const chai = require('chai');
chai.should();
global.expect = chai.expect;
global.assert = chai.assert;

const td = require('testdouble');
const quibble = require('quibble');
global.td = td;

beforeEach(() => {
  td.reset();
  quibble.ignoreCallsFromThisFile(main);
  global.Meteor = {
    call: function empty() {}
  }
});
