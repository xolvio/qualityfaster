module.exports = function () {
  this.Given(/^the bank has issued a (\d+)\-check checkbook to "([^"]*)"$/, function (numberOfChecks, accountHolder) {
    const accountHolderId = this.accounts[accountHolder]._id;
    server.execute(function (numberOfChecks, accountHolderId) {
      BankService.issueChecks(accountHolderId, numberOfChecks);
    }, numberOfChecks, accountHolderId);
  });
};