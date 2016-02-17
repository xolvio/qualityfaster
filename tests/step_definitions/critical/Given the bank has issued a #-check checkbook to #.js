module.exports = function () {
  this.Given(/^the bank has issued a (\d+)\-check checkbook to "([^"]*)"$/, function (numberOfChecks, accountHolderName) {
    server.execute(function (numberOfChecks, accountHolderName) {
      var BankService = require('/imports/services/bank-service').default.getInstance();
      BankService.issueChecks(serverWorld[accountHolderName], numberOfChecks);
    }, numberOfChecks, accountHolderName);
  });
};