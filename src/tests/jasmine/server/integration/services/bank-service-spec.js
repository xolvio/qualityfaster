describe('Bank Service', function () {
  beforeEach(function () {
    this.accountHolderA = new AccountHolder();
    this.accountHolderA.set({
      'username': 'accountHolder1'
    });
    this.accountHolderB = new AccountHolder();
    this.accountHolderB.set({
      'username': 'accountHolder2'
    });
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
});