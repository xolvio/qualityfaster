export default class AccountServiceIso {
  create(options) {
    var accountHolderId = Accounts.createUser({
      username: options.username,
      password: options.password
    });



    //var newAccountHolder = Meteor.users.findOne(accountHolderId);
    //newAccountHolder.set(accountHolder);
    //newAccountHolder.set('account.branchNumber', branchNumber);
    //newAccountHolder.save();
    //return newAccountHolder;
  }
};