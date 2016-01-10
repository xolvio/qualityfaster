import AccountServiceIso from './iso';

export default class AccountService extends AccountServiceIso {
  static getInstance() {
    if (!this.instance) {
      this.instance = new AccountService();
    }
    return this.instance;
  }
  getCurrentAccountHolder() {
    var nullAccountHolder = {
      account: {}
    };
    var accountHolder = Meteor.user();
    return accountHolder ? accountHolder : nullAccountHolder;
  }
};