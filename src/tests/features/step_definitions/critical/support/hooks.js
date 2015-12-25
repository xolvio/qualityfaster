module.exports = function () {
  this.Before(function () {
    global.CRITICAL = true;
    browser.url(process.env.ROOT_URL);
    client.execute(function() {
      $('#velocityOverlay,#velocity-status-widget').remove();
    });
  })
};