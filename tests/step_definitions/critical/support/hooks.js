module.exports = function () {
  this.Before(function () {
    fixtures.common.reset();
    browser.url(process.env.ROOT_URL);
    server.execute(function () {
      global.serverWorld = {};
    });
    client.execute(function () {
      $('#velocityOverlay,#velocity-status-widget').remove();
    });
    this.accounts = this.accounts || {};
  })
};