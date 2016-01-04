Here are the tests, from which every new development effort starts. New features, improvements, and bug fixes. 

### For New Features / Changes to Features
Start with a new / change to a feature file in the **features** directory, and drive development using a technique called Modelling by Example. This establishes the domain and ensures the exact right amount of "integration" testing is done.

As you develop **components** to fulfil the feature, use Test Driven Development for the ALL the components. The components can be models, services, UI components, helpers, validators, utils, publications and so on. The tests can be unit (always preferred) or integration based depending on the practicalities and constraints.

### For Improvements / Bug Fixes
If the improvement or bug fix is not directly related to a feature and cannot be expressed as a scenario for a feature, then it is change in the specification of a component. So start with a new / change to a component test and use Test Driven Development.
