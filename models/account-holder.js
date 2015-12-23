Account = Astro.Class({
  name: 'Account',
  fields: {
    number: {
      type: 'number'
    },
    balance: {
      type: 'number',
      default: 0
    }
  }
});

AccountHolders = Meteor.users;
AccountHolder = Astro.Class({
  name: 'AccountHolder',
  collection: AccountHolders,
  fields: {
    name: 'string',
    username: 'string',
    password: 'string',
    emails: 'array',
    services: 'object',
    createdAt: 'date',
    account: {
      type: 'object',
      nested: 'Account',
      default: function () {
        return {};
      }
    }
  }
});