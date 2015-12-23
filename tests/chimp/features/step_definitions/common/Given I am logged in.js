module.exports = function() {
  this.Given(/^I am logged in$/, function () {
    fixtures.accountHolders.createAndLogin({
      username: 'mememe',
      password: 'acc0untH0lder'
    });
  });
};