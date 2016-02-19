import {AccountHolder} from '../../../../domain/model/account-holder';
import {AccountHolders} from '../../../../infrastructure/collections';
import AccountService from '../index';

describe('Account Service', function () {
  beforeEach(function () {
    Accounts.users.remove({});
    this.accountService = AccountService.getInstance();
  });
  describe('create', function () {
    it('creates a Meteor user account and adds an AccountHolder', function () {
      var meteorUserId = this.accountService.create({
        username: 'hello',
        password: 'w0rld',
        branchNumber: 12345
      });

      var meteorUser = Accounts.users.findOne(meteorUserId);

      expect(meteorUser.accountHolder).toBeTruthy();
    });
    it('sets the branch on the account', function () {
      var meteorUserId = this.accountService.create({
        username: 'hello',
        password: 'w0rld',
        branchNumber: 12345
      });

      var meteorUser = Accounts.users.findOne(meteorUserId);

      expect(meteorUser.accountHolder.account.branchNumber).toBe(12345);
    });
    it('converts string branch codes to numbers on the account', function () {
      var meteorUserId = this.accountService.create({
        username: 'hello',
        password: 'w0rld',
        branchNumber: '12345'
      });

      var meteorUser = Accounts.users.findOne(meteorUserId);

      expect(typeof meteorUser.accountHolder.account.branchNumber).toBe('number');
      expect(meteorUser.accountHolder.account.branchNumber).toBe(12345);
    });
  });
  describe('getCurrentAccountHolder', function () {
    it('returns the currently logged in account holder', function () {
      spyOn(Meteor, 'user').and.returnValue({accountHolder: 'theUser'});

      var accountHolder = this.accountService.getCurrentAccountHolder();

      expect(accountHolder).toEqual('theUser');
    });
    it('returns an NullObject when the no user is logged in', function () {
      spyOn(Meteor, 'user').and.returnValue(null);

      var accountHolder = this.accountService.getCurrentAccountHolder();

      expect(accountHolder).toEqual({
        account: {}
      });
    });
  });
});