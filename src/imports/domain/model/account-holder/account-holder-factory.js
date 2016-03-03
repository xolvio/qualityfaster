import {Account} from './account';
import {AccountHolder} from './account-holder';

export class AccountHolderFactory {
  static create(options) {
    const account = new Account({
      branchNumber: options.branchNumber
    });
    const accountHolder = new AccountHolder({
      name: options.name,
      account: account
    });
    return accountHolder;
  }
}