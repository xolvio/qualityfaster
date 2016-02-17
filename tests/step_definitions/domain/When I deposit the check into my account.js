import BankService from '../../../src/imports/domain/services/bank-service';

module.exports = function () {
  this.When(/^I deposit the check into my account$/, function () {
    BankService.getInstance().depositCheck(
       this.check.fromAccount,
       this.check.toAccount,
       this.check.branchNumber,
       this.check.amount);
  });
};