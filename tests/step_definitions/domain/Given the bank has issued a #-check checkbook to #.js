import BankService from '../../../src/imports/domain/services/bank-service';

module.exports = function () {
  this.Given(/^the bank has issued a (\d+)\-check checkbook to "([^"]*)"$/, function (numberOfChecks, accountHolderName) {
    var accountHolder = this[accountHolderName];
    BankService.getInstance().issueChecks(accountHolder, numberOfChecks);
  });
};