import {AccountHolder} from './account-holder.js';

describe('Account Holder', function () {
  beforeEach(function () {
    this.accountHolder = new AccountHolder({
      name: 'Peter Piper',
      account: 'an_account'
    });
  });
  describe('initialization event', function () {
    it('should set the id when provided', function () {
      this.accountHolder._id =  'a1b2c3';
      expect(this.accountHolder._id).toBe('a1b2c3');
    });
    it('should not contain an id field when not provided', function () {
      expect(this.accountHolder.hasOwnProperty('_id')).toBe(false);
    });
    it('should set the name', function () {
      expect(this.accountHolder.name).toBe('Peter Piper');
    });
    it('should set the account', function () {
      expect(this.accountHolder.account).toBe('an_account');
    });
  });
});
