describe('Bank Service', function () {
  beforeEach(function () {
    this.accountHolderA = new AccountHolder();
    this.accountHolderA.set({
      'username': 'accountHolder1'
    });
    this.accountHolderA.save();
    this.accountHolderB = new AccountHolder();
    this.accountHolderB.set({
      'username': 'accountHolder2'
    });
    this.accountHolderB.save();
  });
  describe('transfer', function () {
    it('transfers an amount from account A to the account B', function () {
      this.accountHolderA.set({'account.balance': 50});
      this.accountHolderB.set({'account.balance': 60});
      this.accountHolderA.save();
      this.accountHolderB.save();

      BankService.transfer(this.accountHolderA.get('_id'), this.accountHolderB.get('_id'), 10);

      this.accountHolderA.reload();
      this.accountHolderB.reload();
      expect(this.accountHolderA.get('account.balance')).toBe(40);
      expect(this.accountHolderB.get('account.balance')).toBe(70);
    });
    it('returns an error when there are insufficient funds', function () {
      this.accountHolderA.set({'account.balance': 10});
      this.accountHolderB.set({'account.balance': 0});
      this.accountHolderA.save();
      this.accountHolderB.save();

      var result = BankService.transfer(this.accountHolderA.get('_id'), this.accountHolderB.get('_id'), 20);

      this.accountHolderA.reload();
      this.accountHolderB.reload();
      expect(this.accountHolderA.get('account.balance')).toBe(10);
      expect(this.accountHolderB.get('account.balance')).toBe(0);
      expect(result).toEqual({
        message: 'Insufficient Funds'
      });
    });
  });
  describe('transfer API', function () {
    it('transfers an amount from account A to the account B', function () {
      this.accountHolderA.set({'account.balance': 60});
      this.accountHolderB.set({'account.balance': 80});
      this.accountHolderA.save();
      this.accountHolderB.save();
      spyOn(Meteor, 'userId').and.returnValue(this.accountHolderA.get('_id'));

      var result = Meteor.call('bank/transfer', this.accountHolderB.get('_id'), 20);

      expect(result).toBeFalsy();
      this.accountHolderA.reload();
      this.accountHolderB.reload();
      expect(this.accountHolderA.get('account.balance')).toBe(40);
      expect(this.accountHolderB.get('account.balance')).toBe(100);
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
      // SETUP
      this.accountHolderA.set('account.numberOfChecks', 5);
      this.accountHolderA.save();

      // EXECUTE
      BankService.issueChecks(this.accountHolderA.get('_id'), 10);

      // VERIFY
      this.accountHolderA.reload();
      expect(this.accountHolderA.get('account.numberOfChecks')).toBe(15);
    });
  });
  describe('sameBankDepositCheck', function () {
    describe('for the same bank', function () {
      it('should transfer the amount from account A to account B when the check is valid', function () {
        this.accountHolderA.set({'account.balance': 50, 'account.branchNumber': 12345, 'account.numberOfChecks': 10});
        this.accountHolderB.set({'account.balance': 60, 'account.branchNumber': 12345});
        this.accountHolderA.save();
        this.accountHolderB.save();

        BankService.sameBankDepositCheck(this.accountHolderA.get('_id'), this.accountHolderB.get('_id'), 12345, 10);

        this.accountHolderA.reload();
        this.accountHolderB.reload();
        expect(this.accountHolderA.get('account.balance')).toBe(40);
        expect(this.accountHolderB.get('account.balance')).toBe(70);
      });
      it('should decrease the number of checks when the check is valid', function () {
        this.accountHolderA.set({'account.balance': 50, 'account.branchNumber': 12345, 'account.numberOfChecks': 10});
        this.accountHolderB.set({'account.balance': 60, 'account.branchNumber': 12345});
        this.accountHolderA.save();
        this.accountHolderB.save();

        BankService.sameBankDepositCheck(this.accountHolderA.get('_id'), this.accountHolderB.get('_id'), 12345, 10);

        this.accountHolderA.reload();
        expect(this.accountHolderA.get('account.numberOfChecks')).toBe(9);
      });
      it('should return an error message when account holder A does not have enough checks', function () {
        this.accountHolderA.set({'account.balance': 50, 'account.branchNumber': 12345, 'account.numberOfChecks': 0});
        this.accountHolderB.set({'account.balance': 60, 'account.branchNumber': 12345});
        this.accountHolderA.save();
        this.accountHolderB.save();

        const result = BankService.sameBankDepositCheck(this.accountHolderA.get('_id'), this.accountHolderB.get('_id'), 12345, 10);

        this.accountHolderA.reload();
        expect(this.accountHolderA.get('account.numberOfChecks')).toBe(0);
        expect(result).toEqual({
          message: 'Account holder does not have enough checks'
        });
      });
      it('should return an error message when account holder A branch is different', function () {
        this.accountHolderA.set({'account.balance': 50, 'account.branchNumber': 56789});
        this.accountHolderB.set({'account.balance': 60, 'account.branchNumber': 12345});
        this.accountHolderA.save();
        this.accountHolderB.save();

        const result = BankService.sameBankDepositCheck(this.accountHolderA.get('_id'), this.accountHolderB.get('_id'), 12345, 10);

        this.accountHolderA.reload();
        this.accountHolderB.reload();
        expect(this.accountHolderA.get('account.balance')).toBe(50);
        expect(this.accountHolderB.get('account.balance')).toBe(60);
        expect(result).toEqual({
          message: 'Branch numbers do not match'
        });
      });
      it('should return an error message when account holder B branch is different', function () {
        this.accountHolderA.set({'account.balance': 50, 'account.branchNumber': 12345});
        this.accountHolderB.set({'account.balance': 60, 'account.branchNumber': 56789});
        this.accountHolderA.save();
        this.accountHolderB.save();

        const result = BankService.sameBankDepositCheck(this.accountHolderA.get('_id'), this.accountHolderB.get('_id'), 12345, 10);

        this.accountHolderA.reload();
        this.accountHolderB.reload();
        expect(this.accountHolderA.get('account.balance')).toBe(50);
        expect(this.accountHolderB.get('account.balance')).toBe(60);
        expect(result).toEqual({
          message: 'Branch numbers do not match'
        });
      });
    });
  });
});