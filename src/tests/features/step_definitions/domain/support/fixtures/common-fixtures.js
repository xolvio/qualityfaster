fixtures.common = {
  reset: function () {
    server.call('logout');
    server.execute(function () {
      Package['xolvio:cleaner'].resetDatabase();
    });
  }
};