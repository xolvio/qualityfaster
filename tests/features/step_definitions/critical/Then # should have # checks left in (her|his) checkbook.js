module.exports = function () {
  this.Then(/^"([^"]*)" should have (\d+) checks left in (her|his) checkbook$/, function (accountHolder, numberOfChecks) {
    var actualNumberOfChecks = server.execute(function (accountHolder) {
      return AccountHolders.findOne({name: accountHolder}).account.numberOfChecks;
    }, accountHolder);
    expect(actualNumberOfChecks).toEqual(parseInt(numberOfChecks));
  });
};