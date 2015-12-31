describe('Account Service', function () {
  describe('create', function () {
    it('creates and returns an AccountHolder backed by a Meteor user account', function () {
      var accountHolder = AccountService.create({
        username: 'hello',
        password: 'w0rld'
      });

      var meteorUser = Meteor.users.findOne({username: 'hello'});
      expect(accountHolder.get('_id')).toEqual(meteorUser._id);
      expect(accountHolder.get('username')).toEqual(meteorUser.username);
    });
    it('does not store the password on the account holder object', function () {
      var accountHolder = AccountService.create({
        username: 'hello',
        password: 'w0rld'
      });

      expect(accountHolder.get('password')).toBe(null);
    });
    it('sets the branch on the account', function () {
      var accountHolder = AccountService.create({
        username: 'hello',
        password: 'w0rld'
      }, 12345);

      expect(accountHolder.get('account.branchNumber')).toBe(12345);
    });
  });
});