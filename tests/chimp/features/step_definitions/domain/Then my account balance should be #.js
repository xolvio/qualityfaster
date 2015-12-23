module.exports = function () {
  this.Then(/^my account balance should be \$(\d+)$/, function (balance) {
    var actualBalance = server.execute(function () {
      return AccountHolders.findOne(Meteor.userId()).account.balance;
    });
    expect(actualBalance).toEqual(parseFloat(balance));
  });
};