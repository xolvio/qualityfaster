import {AccountHolder} from '../../../../domain/model/account-holder/account-holder';
import {AccountHolderFactory} from '../../../../domain/model/account-holder/account-holder-factory';
import {AccountHolderRepository} from '../../../../domain/model/account-holder/account-holder-repository';
import {AccountHolders} from '../../../../infrastructure/collections';
import AccountService from '../index';

describe('Account Service', function () {
  beforeEach(function () {
    this.accountService = AccountService.getInstance();
    this.accountHolder = {
      account: {
        branchNumber: 12345
      }
    };
    spyOn(AccountHolderFactory, 'create').and.returnValue(this.accountHolder);
    spyOn(Accounts, 'createUser').and.returnValue('userId');
    this.options = {some: 'options'};
  });
  describe('create', function () {
    it('should use the AccountHolderFactory to create an AccountHolder with the supplied options', function () {
      this.accountService.create(this.options);

      expect(AccountHolderFactory.create).toHaveBeenCalledWith(this.options);
    });
    it('should return the id of the Meteor user', function () {
      const id = this.accountService.create(this.options);

      expect(id).toBe('userId');
    });
    it('should insert the account holder using the AccountHolderRepository', function () {
      spyOn(Accounts.users, 'update');
      spyOn(AccountHolderRepository, 'insert').and.returnValue('a1b2c3d4');

      this.accountService.create({
        username: 'hello',
        password: 'w0rld'
      });

      expect(AccountHolderRepository.insert).toHaveBeenCalledWith(this.accountHolder);
    });
    it('should create an a Meteor Account links the AccountHolder by id', function () {
      spyOn(Accounts.users, 'update');
      spyOn(AccountHolderRepository, 'insert').and.returnValue('a1b2c3d4');

      this.accountService.create({
        username: 'hello',
        password: 'w0rld'
      });

      expect(Accounts.createUser).toHaveBeenCalledWith({username: 'hello', password: 'w0rld'});
      expect(Accounts.users.update).toHaveBeenCalledWith('userId', {$set: {
        accountHolderId: 'a1b2c3d4'
      }});
    });
  });
  describe('getCurrentAccountHolder', function () {
    it('should returns the currently logged in account holder', function () {
      const accountHolderId = 'a1b2c3d4';
      spyOn(Meteor, 'user').and.returnValue({
        accountHolderId: accountHolderId
      });
      spyOn(AccountHolderRepository, 'find');

      var accountHolder = this.accountService.getCurrentAccountHolder();

      expect(AccountHolderRepository.find).toHaveBeenCalledWith(accountHolderId);
    });
    it('should return the null account holder from the repository', function () {
      spyOn(Meteor, 'user').and.returnValue(null);
      const expectedAccountHolder = {some: 'object'};
      spyOn(AccountHolderRepository, 'getNullAccountHolder').and.returnValue(expectedAccountHolder);

      var actualAccountHolder = this.accountService.getCurrentAccountHolder();

      expect(actualAccountHolder).toBe(expectedAccountHolder);
    });
  });
});