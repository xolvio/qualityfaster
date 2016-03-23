module.exports = function () {
  // runs before each and every single scenario
  this.Before(function () {
    fixtures.common.reset();
  });
};