var vm = Npm.require('vm');
global.require = meteorInstall();

Meteor.methods({
  'xolvio/backdoor': function (func, args) {
    check(func, String);
    check(args, Match.Optional(Array));

    try {
      return {
        value: vm.runInThisContext('(' + func + ')').apply(global, args)
      };
    } catch (error) {
      return {
        error: {message: error.toString(), stack: error.stack.toString()}
      };
    }
  }
});
