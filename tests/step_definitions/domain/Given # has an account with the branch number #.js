import {AccountHolder} from '../../../src/imports/domain/model/account-holder';

module.exports = function () {
  this.Given(/^"([^"]*)" has an account with the branch number (\d+)$/, function (accountHolderName, branchNumber) {
    this[accountHolderName] = new AccountHolder({
      username: accountHolderName,
      branchNumber: branchNumber
    });
  });
};