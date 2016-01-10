export default require(Meteor.isServer ?
   './server/index' :
   './client/index');