import {AccountHolder} from '/src/imports/models/acccount-holder';

describe('Bank Service', function () {
  beforeEach(function () {
    this.fromAccountHolder = new AccountHolder({'username': 'accountHolder1'});
    this.toAccountHolder = new AccountHolder({'username': 'accountHolder2'});
  });
  describe('transfer', function () {
    it('should transfer the amount from account A to the account B', function () {
      this.fromAccountHolder.set({'account.balance': 50});
      this.toAccountHolder.set({'account.balance': 60});

      BankService.transfer(this.fromAccountHolder, this.toAccountHolder, 10);

      expect(this.fromAccountHolder.get('account.balance')).toBe(40);
      expect(this.toAccountHolder.get('account.balance')).toBe(70);
    });
    it('should return an error when there are insufficient funds', function () {
      this.fromAccountHolder.set({'account.balance': 10});
      this.toAccountHolder.set({'account.balance': 0});

      var result = BankService.transfer(this.fromAccountHolder, this.toAccountHolder, 20);

      expect(this.fromAccountHolder.get('account.balance')).toBe(10);
      expect(this.toAccountHolder.get('account.balance')).toBe(0);
      expect(result).toEqual({
        message: 'Insufficient Funds'
      });
    });
  });
  describe('transfer API', function () {
    it('transfers an amount from account A to the account B', function () {
      this.fromAccountHolder.set({'account.balance': 60});
      this.toAccountHolder.set({'account.balance': 80});
      this.fromAccountHolder.save();
      this.toAccountHolder.save();
      spyOn(Meteor, 'userId').and.returnValue(this.fromAccountHolder.get('_id'));

      var result = Meteor.call('bank/transfer', this.toAccountHolder.get('_id'), 20);

      expect(result).toBeFalsy();
      this.fromAccountHolder.reload();
      this.toAccountHolder.reload();
      expect(this.fromAccountHolder.get('account.balance')).toBe(40);
      expect(this.toAccountHolder.get('account.balance')).toBe(100);
    });
    it('returns an error when the owner is not logged in', function () {
      var result = Meteor.call('bank/transfer');
      expect(result).toEqual({
        message: 'You are not logged in'
      });
    });
  });
  describe('issueChecks', function () {
    it('increment the number of checks the account holder has', function () {
      this.fromAccountHolder.set('account.numberOfChecks', 5);

      BankService.issueChecks(this.fromAccountHolder, 10);

      expect(this.fromAccountHolder.get('account.numberOfChecks')).toBe(15);
    });
  });
  describe('depositCheck', function () {
    it('should transfer the amount from account A to account B when the check is valid', function () {
      this.fromAccountHolder.set({'account.balance': 50, 'account.branchNumber': 12345, 'account.numberOfChecks': 10});
      this.toAccountHolder.set({'account.balance': 60, 'account.branchNumber': 12345});

      var result = BankService.depositCheck(this.fromAccountHolder, this.toAccountHolder, 12345, 10);

      expect(result).toBeFalsy();
      expect(this.fromAccountHolder.get('account.balance')).toBe(40);
      expect(this.toAccountHolder.get('account.balance')).toBe(70);
    });
    it('should decrease the number of checks when the check is valid', function () {
      this.fromAccountHolder.set({'account.balance': 50, 'account.branchNumber': 12345, 'account.numberOfChecks': 10});
      this.toAccountHolder.set({'account.balance': 60, 'account.branchNumber': 12345});

      BankService.depositCheck(this.fromAccountHolder, this.toAccountHolder, 12345, 10);

      expect(this.fromAccountHolder.get('account.numberOfChecks')).toBe(9);
    });
    it('should return an error message when account holder A does not have enough checks', function () {
      this.fromAccountHolder.set({'account.balance': 50, 'account.branchNumber': 12345, 'account.numberOfChecks': 0});
      this.toAccountHolder.set({'account.balance': 60, 'account.branchNumber': 12345});

      const result = BankService.depositCheck(this.fromAccountHolder, this.toAccountHolder, 12345, 10);

      expect(this.fromAccountHolder.get('account.numberOfChecks')).toBe(0);
      expect(result).toEqual({
        message: 'Account holder does not have enough checks'
      });
    });
    it('should return an error message when account holder A branch is different', function () {
      this.fromAccountHolder.set({'account.balance': 50, 'account.branchNumber': 56789});
      this.toAccountHolder.set({'account.balance': 60, 'account.branchNumber': 12345});

      const result = BankService.depositCheck(this.fromAccountHolder, this.toAccountHolder, 12345, 10);

      expect(this.fromAccountHolder.get('account.balance')).toBe(50);
      expect(this.toAccountHolder.get('account.balance')).toBe(60);
      expect(result).toEqual({
        message: 'Branch numbers do not match'
      });
    });
    it('should return an error message when account holder B branch is different', function () {
      this.fromAccountHolder.set({'account.balance': 50, 'account.branchNumber': 12345});
      this.toAccountHolder.set({'account.balance': 60, 'account.branchNumber': 56789});

      const result = BankService.depositCheck(this.fromAccountHolder, this.toAccountHolder, 12345, 10);

      expect(this.fromAccountHolder.get('account.balance')).toBe(50);
      expect(this.toAccountHolder.get('account.balance')).toBe(60);
      expect(result).toEqual({
        message: 'Branch numbers do not match'
      });
    });
  });
  describe('depositCheck API', function () {
    it('should transfer the amount from account A to account B when the check is valid', function () {
      this.fromAccountHolder.set({'account.balance': 50, 'account.branchNumber': 12345, 'account.numberOfChecks': 10});
      this.toAccountHolder.set({'account.balance': 80, 'account.branchNumber': 12345});
      this.fromAccountHolder.save();
      this.toAccountHolder.save();
      spyOn(Meteor, 'userId').and.returnValue(this.toAccountHolder.get('_id'));

      var result = Meteor.call('bank/depositCheck', this.fromAccountHolder.get('_id'), 12345, 10);

      expect(result).toBeFalsy();
      this.fromAccountHolder.reload();
      this.toAccountHolder.reload();
      expect(this.fromAccountHolder.get('account.balance')).toBe(40);
      expect(this.toAccountHolder.get('account.balance')).toBe(90);
    });
    it('returns an error when the owner is not logged in', function () {
      var result = Meteor.call('bank/depositCheck');
      expect(result).toEqual({
        message: 'You are not logged in'
      });
    });
  });
  describe('internal transfer', function () {
    it('should use the transfer service when the bank teller is authorized', function () {
      this.fromAccountHolder.set({'account.balance': 50});
      this.toAccountHolder.set({'account.balance': 60});

      const bankTeller = new BankTeller();
      bankTeller.set('role', 'authorized');

      BankService.internalTransfer(bankTeller, this.fromAccountHolder, this.toAccountHolder, 10);

      expect(this.fromAccountHolder.get('account.balance')).toBe(40);
      expect(this.toAccountHolder.get('account.balance')).toBe(70);
    });
    it('should return an error if the bank teller is not allowed to do the transfer', function () {
      this.fromAccountHolder.set({'account.balance': 50});
      this.toAccountHolder.set({'account.balance': 60});

      const bankTeller = new BankTeller();
      bankTeller.set('role', 'rookie');

      var result = BankService.internalTransfer(bankTeller, this.fromAccountHolder, this.toAccountHolder, 10);

      expect(result).toEqual({
        message: 'You do not have the correct access rights'
      });
      expect(this.fromAccountHolder.get('account.balance')).toBe(50);
      expect(this.toAccountHolder.get('account.balance')).toBe(60);
    });
  });
});
