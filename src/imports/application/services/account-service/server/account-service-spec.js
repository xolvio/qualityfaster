import {AccountHolder} from '../../domain/model/account-holder';
import {AccountHolders} from '../collections';
import AccountService from '../account-service/index';

describe('Account Service', function () {
  beforeEach(function () {
    this.accountService = AccountService.getInstance();
    AccountHolders.remove({});
  });
  describe('create', function () {
    xit('creates and returns an AccountHolder backed by a Meteor user account', function () {
      var accountHolder = this.accountService.create({
        username: 'hello',
        password: 'w0rld'
      });

      var meteorUser = Meteor.users.findOne({username: 'hello'});
      expect(accountHolder._id).toEqual(meteorUser._id);
      expect(accountHolder.username).toEqual(meteorUser.username);
    });
    xit('does not store the password on the account holder object', function () {
      var accountHolder = this.accountService.create({
        username: 'hello',
        password: 'w0rld'
      });

      expect(accountHolder.password).toBe(null);
    });
    xit('sets the branch on the account', function () {
      var accountHolder = this.accountService.create({
        username: 'hello',
        password: 'w0rld'
      }, 12345);

      expect(accountHolder.account.branchNumber).toBe(12345);
    });
  });
  describe('getCurrentAccountHolder', function () {
    it('returns the currently logged in account holder', function () {
      spyOn(Meteor, 'user').and.returnValue('theUser');

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