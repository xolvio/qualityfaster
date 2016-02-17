import {AccountHolder} from './account-holder.js';

describe('Account Holder', function () {
  beforeEach(function () {
    this.accountHolder = new AccountHolder({
      name: 'Peter Piper',
      branchNumber: 12345
    });
  });
  describe('initialization event', function () {
    it('should create an account with a balance of 0', function () {
      expect(this.accountHolder.account.balance).toBe(0);
    });
    it('should create an account with 0 number of checks', function () {
      expect(this.accountHolder.account.numberOfChecks).toBe(0);
    });
  });
});
