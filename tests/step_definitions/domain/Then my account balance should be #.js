module.exports = function () {
  this.Then(/^my account balance should be \$(\d+)$/, function (balance) {
    expect(this.myAccount.account.balance).toEqual(parseFloat(balance));
  });
};