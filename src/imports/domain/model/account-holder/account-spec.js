import {Account} from './account.js';

describe('Account', function () {
  beforeEach(function () {
    this.account = new Account({
      branchNumber: 12345
    });
  });
  describe('initialization event', function () {
    it('should create an account with a balance of 0', function () {
      expect(this.account.balance).toBe(0);
    });
    it('should set the balance to the provided balance', function() {
      this.account = new Account({
        balance: 100
      });
      expect(this.account.balance).toBe(100);
    });
    it('should create an account with 0 number of checks', function () {
      expect(this.account.numberOfChecks).toBe(0);
    });
    it('should set the number of checks to the provided amount', function() {
      this.account = new Account({
        numberOfChecks: 10
      });
      expect(this.account.numberOfChecks).toBe(10);
    });
  });
});
