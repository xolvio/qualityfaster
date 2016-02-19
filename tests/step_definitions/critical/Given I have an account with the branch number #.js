module.exports = function () {
  this.Given(/^I have an account with the branch number (\d+)$/, function (branchNumber) {
    this.accounts['My Account'] = fixtures.accountHolders.create({
      name: 'My Account',
      username: 'myAccount',
      branchNumber: branchNumber
    });
  });
};