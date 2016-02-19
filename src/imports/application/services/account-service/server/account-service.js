import {AccountHolder} from '../../../../domain/model/account-holder';

export default class AccountServiceIso {
  create(options) {
    const accountHolder = new AccountHolder({
      branchNumber: parseInt(options.branchNumber)
    });
    var userId = Accounts.createUser({
      username: options.username,
      password: options.password,
    });
    Accounts.users.update(userId, {
      $set: {
        accountHolder: accountHolder
      }
    });
    return userId;
  }
};