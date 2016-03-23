module.exports = Meteor.isServer ?
   require('./server/bank-service') :
   require('./client/bank-service');