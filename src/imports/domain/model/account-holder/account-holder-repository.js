import {AccountHolders} from '../../../infrastructure/collections';
import {Account} from './account';
import {AccountHolder} from './account-holder';

export class AccountHolderRepository {
  static find(id) {
    const accountHolderRaw = AccountHolders.findOne(id);
    const accountHolder = new AccountHolder(accountHolderRaw);
    accountHolder.account = new Account(accountHolderRaw.account);
    return accountHolder;
  }

  static update(accountHolder) {
    let x = AccountHolders.update(accountHolder._id, {$set: accountHolder});
    return x;
  }

  static insert(accountHolder) {
    return AccountHolders.insert(accountHolder);
  }

  static getNullAccountHolder() {
    return {
      account: {}
    }
  }
}