import BankService from '../../../src/imports/domain/services/bank-service';

module.exports = function () {
  this.When(/^I transfer \$(\d+) to "([^"]*)"'s bank account$/, function (amount, otherAccountHolderName) {
    var fromAccount = this.myAccount;
    var toAccount = this[otherAccountHolderName];
    this.result = BankService.getInstance().transfer(fromAccount, toAccount, parseFloat(amount));
  });
};
