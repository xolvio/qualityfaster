import {AccountHolderFactory} from '../../../src/imports/domain/model/account-holder/account-holder-factory';

module.exports = function () {
  this.Given(/^"([^"]*)" has an account with the branch number (\d+)$/, function (accountHolderName, branchNumber) {
    this[accountHolderName] = AccountHolderFactory.create({
      name: accountHolderName,
      branchNumber: branchNumber
    });
  });
};
