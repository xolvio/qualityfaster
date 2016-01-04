describe('Account Holder', function () {
  describe('initialization event', function () {
    it('should create an account with a balance of 0', function () {
      var accountHolder = new AccountHolder();

      accountHolder.save();

      expect(accountHolder.get('account').get('balance')).toBe(0);
    });
    it('should create an account with 0 number of checks', function () {
      var accountHolder = new AccountHolder();

      accountHolder.save();

      expect(accountHolder.get('account').get('numberOfChecks')).toBe(0);
    });
  });
});