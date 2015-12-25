module.exports = function() {
  this.Before(function() {
    global.CRITICAL = false;
    fixtures.common.reset();
  });
};