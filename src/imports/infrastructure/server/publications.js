import {AccountHolders} from '../collections';
import AccountService from '../../application/services/account-service';

Meteor.publish('user', function () {
  if (this.userId) {
    return Accounts.users.find(this.userId);
  }
});

Meteor.publish('accountHolder', function () {
  if (this.userId) {
    const user = Accounts.users.findOne(this.userId);
    return AccountHolders.find(user.accountHolderId);
  }
});
