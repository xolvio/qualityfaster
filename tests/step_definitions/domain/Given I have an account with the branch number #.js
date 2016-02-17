import {AccountHolder} from '../../../src/imports/domain/model/account-holder';

module.exports = function () {
  this.Given(/^I have an account with the branch number (\d+)$/, function (branchNumber) {
    this.myAccount = new AccountHolder({
      username: 'me',
      branchNumber: branchNumber
    });
  });
};