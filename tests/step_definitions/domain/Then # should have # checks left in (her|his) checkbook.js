module.exports = function () {
  this.Then(/^"([^"]*)" should have (\d+) checks left in (her|his) checkbook$/, function (accountHolder, numberOfChecks, herHis) {
    expect(this[accountHolder].account.numberOfChecks).toEqual(parseInt(numberOfChecks));
  });
};