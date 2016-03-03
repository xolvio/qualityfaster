import AccountServiceIso from './iso';
import {AccountHolderRepository} from '../../../domain/model/account-holder/account-holder-repository';

export default class AccountService extends AccountServiceIso {
  static getInstance() {
    if (!this.instance) {
      this.instance = new AccountService();
    }
    return this.instance;
  }
  getCurrentAccountHolder() {
    var user = Meteor.user();
    if (!user) {
      return AccountHolderRepository.getNullAccountHolder();
    }
    return AccountHolderRepository.find(user.accountHolderId);
  }
};
