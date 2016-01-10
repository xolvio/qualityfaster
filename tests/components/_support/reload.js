var global = window || global;

const Package = global.Package || {};

// Prevents that reload does reloading while testing
Package.reload = {
  Reload: {
    _onMigrate: function () {},
    _migrationData: function () {
      return undefined;
    },
    _migrate: function () {
      return false;
    },
    _withFreshProvidersForTest: function () {},
    _reload: function () {}
  }
};

global.Package = Package;