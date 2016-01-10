module.exports = function () {
  // runs before each and every single scenario
  this.Before(function () {
    global.CRITICAL = false;
    fixtures.common.reset();

    server.execute(function () {
      // a world in the Meteor server context
      global.serverWorld = {};
    });

  });
};