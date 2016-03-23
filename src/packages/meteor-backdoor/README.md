Meteor Backdoor by Xolv.io
==========================

This is a test package that allows you to run run arbitrary code on the server
using a Meteor method. It is used by Chimp to allow you to do integration 
testing from within step definitions / specs.


```javascript
var result = Meteor.call('xolvio/backdoor', function(setting) {
  return Meteor.settings[setting]; // you can return complex objects
}, 'someSetting');

console.log(result.value); // this will output Meteor.settings.someSetting 

// if there is an error, you can access these properties on the error object
console.log(result.error.message);  
console.log(result.error.stack);
```

You can also use the package for any hacking you might want to do. This package
is a `debugOnly` package which means it will not get deployed to production. If
you remove this flag, beware that it's a very dangerous package as it allows 
FULL unrestricted access to your backend, which means your database.