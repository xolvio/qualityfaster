module.exports = Meteor.isServer ?
   require('./server/account-service') :
   require('./client/account-service');