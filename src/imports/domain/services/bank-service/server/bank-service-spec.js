import {AccountHolder} from '../../../model/account-holder/account-holder';
import {AccountHolderFactory} from '../../../model/account-holder/account-holder-factory';
import {AccountHolders} from '../../../../infrastructure/collections';
import BankService from '../index';
import BankServiceApi from '../../../../application/services/bank-service/server/bank-service-api';

describe('Bank Service', function () {
  beforeEach(function () {
    this.bankService = BankService.getInstance();
    this.fromAccountHolder = AccountHolderFactory.create({
      name: 'accountHolder1',
      branchNumber: 12345
    });
    this.toAccountHolder = AccountHolderFactory.create({
      name: 'accountHolder2',
      branchNumber: 12345
    });
  });
  describe('transfer', function () {
    it('should transfer the amount from account A to the account B', function () {
      this.fromAccountHolder.account.balance = 50;
      this.toAccountHolder.account.balance = 60;

      this.bankService.transfer(this.fromAccountHolder, this.toAccountHolder, 10);

      expect(this.fromAccountHolder.account.balance).toBe(40);
      expect(this.toAccountHolder.account.balance).toBe(70);
    });
    it('should return an error when there are insufficient funds', function () {
      this.fromAccountHolder.account.balance = 10;
      this.toAccountHolder.account.balance = 0;

      var result = this.bankService.transfer(this.fromAccountHolder, this.toAccountHolder, 20);

      expect(result.message).toBe('Insufficient Funds');
      expect(this.fromAccountHolder.account.balance).toBe(10);
      expect(this.toAccountHolder.account.balance).toBe(0);
    });
  });
  describe('issueChecks', function () {
    it('increment the number of checks the account holder has', function () {
      this.fromAccountHolder.account.numberOfChecks = 5;

      this.bankService.issueChecks(this.fromAccountHolder, 10);

      expect(this.fromAccountHolder.account.numberOfChecks).toBe(15);
    });
  });
  describe('depositCheck', function () {
    it('should transfer the amount from account A to account B when the check is valid', function () {
      this.fromAccountHolder.account.balance = 50;
      this.fromAccountHolder.account.branchNumber = 12345;
      this.fromAccountHolder.account.numberOfChecks = 10;
      this.toAccountHolder.account.balance = 60;
      this.toAccountHolder.account.branchNumber = 12345;

      var result = this.bankService.depositCheck(this.fromAccountHolder, this.toAccountHolder, 12345, 10);

      expect(result).toBeFalsy();
      expect(this.fromAccountHolder.account.balance).toBe(40);
      expect(this.toAccountHolder.account.balance).toBe(70);
    });
    it('should decrease the number of checks when the check is valid', function () {
      this.fromAccountHolder.account.balance = 50;
      this.fromAccountHolder.account.branchNumber = 12345;
      this.fromAccountHolder.account.numberOfChecks = 10;
      this.toAccountHolder.account.balance = 60;
      this.toAccountHolder.account.branchNumber = 12345;

      this.bankService.depositCheck(this.fromAccountHolder, this.toAccountHolder, 12345, 10);

      expect(this.fromAccountHolder.account.numberOfChecks).toBe(9);
    });
    it('should return an error message when account holder A does not have enough checks', function () {
      this.fromAccountHolder.account.balance = 50;
      this.fromAccountHolder.account.branchNumber = 12345;
      this.fromAccountHolder.account.numberOfChecks = 0;
      this.toAccountHolder.account.balance = 60;
      this.toAccountHolder.account.branchNumber = 12345;

      const result = this.bankService.depositCheck(this.fromAccountHolder, this.toAccountHolder, 12345, 10);

      expect(this.fromAccountHolder.account.numberOfChecks).toBe(0);
      expect(result).toEqual({
        message: 'Account holder does not have enough checks'
      });
    });
    it('should return an error message when account holder A branch is different', function () {
      this.fromAccountHolder.account.balance = 50;
      this.fromAccountHolder.account.branchNumber = 56789;
      this.toAccountHolder.account.balance = 60;
      this.toAccountHolder.account.branchNumber = 12345;

      const result = this.bankService.depositCheck(this.fromAccountHolder, this.toAccountHolder, 12345, 10);

      expect(this.fromAccountHolder.account.balance).toBe(50);
      expect(this.toAccountHolder.account.balance).toBe(60);
      expect(result).toEqual({
        message: 'Branch numbers do not match'
      });
    });
    it('should return an error message when account holder B branch is different', function () {
      this.fromAccountHolder.account.balance = 50;
      this.fromAccountHolder.account.branchNumber = 12345;
      this.toAccountHolder.account.balance = 60;
      this.toAccountHolder.account.branchNumber = 56789;

      const result = this.bankService.depositCheck(this.fromAccountHolder, this.toAccountHolder, 12345, 10);

      expect(this.fromAccountHolder.account.balance).toBe(50);
      expect(this.toAccountHolder.account.balance).toBe(60);
      expect(result).toEqual({
        message: 'Branch numbers do not match'
      });
    });
  });
});
