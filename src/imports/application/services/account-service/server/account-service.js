import {AccountHolder} from '../../../../domain/model/account-holder/account-holder';
import {AccountHolderRepository} from '../../../../domain/model/account-holder/account-holder-repository';
import {AccountHolderFactory} from '../../../../domain/model/account-holder/account-holder-factory';

export default class AccountServiceIso {
  create(options) {
    const accountHolder = AccountHolderFactory.create(options);
    const accountHolderId = AccountHolderRepository.insert(accountHolder);
    var userId = Accounts.createUser({
      username: options.username,
      password: options.password,
    });
    Accounts.users.update(userId, {
      $set: {accountHolderId: accountHolderId}
    });
    return userId;
  }
};