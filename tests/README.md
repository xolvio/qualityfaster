Here are the tests, from which every new development effort starts. New features, improvements, and bug fixes. 

### For New Features / Changes to Features
Start with a new / change to a feature file in the **specifications** directory, and drive development using a technique called Modelling by Example. This establishes the domain and ensures the exact right amount of "integration" testing is done.

As you develop **components** to fulfil the feature, use Test Driven Development for the ALL the components. The components can be models, services, UI components, helpers, validators, utils, publications and so on. The tests can be unit (always preferred) or integration based depending on the practicalities and constraints.

### For Improvements / Bug Fixes
If the improvement or bug fix is not directly related to the domain, then it's most likely only related to a specific component, so the change should be applied to the specification of a component. You start with a test and use Test Driven Development.

The tests for all the components can be found under the `/src` folder. For example, if you have a `bank-service.js`, then you'll see there's a `bank-service-spec.js` file right next to it. 

For example, if a you are working on a bug that is related an overlay that should close when the user clicks outside of it, then you would start with a test that proves the bug exists:

```javascript
describe('The overlay', function() {
  it('should close when the user clicks outside of it', function() {
    // SETUP load the overlay into the DOM
    // EXECUTE simulate a click outside of the overlay
    // VERIFY ensure the overlay is no longer visible
  });  
}); 
```

Then you go and make the changes to the code to make the test pass. This technique massively reduces the risk of regression bugs.