import {AccountHolderFactory} from '../../../src/imports/domain/model/account-holder/account-holder-factory';

module.exports = function () {
  this.Given(/^I have an account with the branch number (\d+)$/, function (branchNumber) {
    this.myAccount = AccountHolderFactory.create({
      name: 'My Account',
      branchNumber: branchNumber
    });
  });
};
