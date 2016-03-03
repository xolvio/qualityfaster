module.exports = function () {
  this.Given(/^the bank has issued a (\d+)\-check checkbook to "([^"]*)"$/, function (numberOfChecks, accountHolderName) {
    server.call('bank/issueChecks', this.accounts[accountHolderName].accountHolderId, parseInt(numberOfChecks));
  });
};