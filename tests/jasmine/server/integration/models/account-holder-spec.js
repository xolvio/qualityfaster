describe('Account Holder', function () {
  describe('initialization event', function () {
    it('should create an account with a balance of 0', function () {
      var accountHolder = new AccountHolder();

      accountHolder.save();

      expect(accountHolder.get('account').get('balance')).toBe(0);
    });
  });
});