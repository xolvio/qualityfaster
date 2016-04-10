module.exports = function () {
  this.Then(/^my account balance should be \$(\d+)$/, function (balance) {
    var actualBalance = widgets.accountSummary.getBalance();
    expect(actualBalance).toEqual(balance);
  });
};
