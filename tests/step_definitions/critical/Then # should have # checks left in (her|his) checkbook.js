module.exports = function () {
  this.Then(/^"([^"]*)" should have (\d+) checks left in (her|his) checkbook$/, function (accountHolder, numberOfChecks, hisHer) {
    var actualNumberOfChecks = server.execute(function (accountHolder) {
      return Accounts.users.findOne(accountHolder._id).accountHolder.account.numberOfChecks;
    }, this.accounts[accountHolder]);
    expect(actualNumberOfChecks).toEqual(parseInt(numberOfChecks));
  });
};