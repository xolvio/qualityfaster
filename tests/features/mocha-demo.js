/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

// These are Chimp globals
/* globals browser assert server */
describe('Chimp Mocha', function () {
  beforeEach(function () {
    browser.url('http://www.google.com');
  });

  describe('Page title', function () {
    it('should be set by the Meteor method @focus', function () {
      assert.equal(browser.getTitle(), 'Google');
    });
  });
});
