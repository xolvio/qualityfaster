// Right now Mocha eagerly loads all files in path
// TODO: Make Mocha ignore files from `jasmineConfig.specFiles` ('**/*@(_spec|-spec|Spec).@(js|jsx)')
if (GLOBAL.jasmine)

describe('Chimp Jasmine', function() {
  describe('Page title', function () {
    it('should be set by the Meteor method @focus', function () {
      browser.url('http://www.google.com');
      expect(browser.getTitle()).toEqual('Google');
    });
  });
});
