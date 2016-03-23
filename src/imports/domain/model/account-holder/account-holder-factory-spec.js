import {AccountHolderFactory} from './account-holder-factory';

describe('AccountHolderFactory', function () {
  describe('create', function () {
    beforeEach(function () {
      this.accountHolder = AccountHolderFactory.create({
        name: 'Jon Doe',
        branchNumber: 12345
      });
    });
    it('should create a new AccountHolder', function () {
      expect(this.accountHolder.constructor.name).toBe('AccountHolder');
    });
    it('should create an account for the account holder', function() {
      expect(this.accountHolder.account.constructor.name).toBe('Account');
    });
    it('should set the name of the account holder', function() {
      expect(this.accountHolder.name).toBe('Jon Doe');
    });
    it('should set the branch on the account', function() {
      expect(this.accountHolder.account.branchNumber).toBe(12345)
    });
  });
});