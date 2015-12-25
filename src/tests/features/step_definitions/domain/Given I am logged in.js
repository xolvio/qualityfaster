module.exports = function() {
  this.Given(/^I am logged in$/, function () {
    this.accounts = this.accounts || [];
    this.accounts.mine = fixtures.accountHolders.createAndLogin({
      username: 'mememe',
      password: 'acc0untH0lder'
    });
  });
};