describe('Bank Service', function () {
  describe('transfer', function () {

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
});