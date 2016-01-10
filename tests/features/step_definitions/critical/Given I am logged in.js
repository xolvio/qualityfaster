module.exports = function() {
  this.Given(/^I am logged in$/, function () {
    fixtures.accountHolders.login(this.accounts.mine);
  });
};