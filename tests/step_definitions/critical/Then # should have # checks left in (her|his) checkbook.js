module.exports = function () {
  this.Then(/^"([^"]*)" should have (\d+) checks left in (her|his) checkbook$/, function (accountHolderName, numberOfChecks, hisHer) {
    const accountHolder = fixtures.accountHolders.findById(this.accounts[accountHolderName].accountHolderId);
    expect(accountHolder.account.numberOfChecks).toEqual(parseFloat(numberOfChecks));
  });
};
