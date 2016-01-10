module.exports = function () {
  this.Then(/^my account balance should be \$(\d+)$/, function (balance) {
    var actualBalance = server.execute(function (balance) {
      return serverWorld.myAccount.get('account.balance');
    }, balance);
    expect(actualBalance).toEqual(parseInt(balance));
  });
};