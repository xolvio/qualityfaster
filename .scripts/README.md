# How the scripts work

This repository contains two scripts that run Chimp and Meteor in our opinionated best-practices configuration.
    
The `npm start` script is used when in development mode and allows you to test drive your development using Cucumber. 

The `npm test` script is used to run a full test suite either locally or on CI.

Below you'll find a detailed explanation of how both of the scripts work.

## `npm start`
This command is used when you develop locally. The flowchart below shows exactly what happens when you run `npm start`.<br/>

![npm start](https://docs.google.com/drawings/d/1LJ0JfvSmYeL82wB9FApLTLqxCXMGviCmJQhx1M10T30/pub?w=2073&amp;h=1575&cb=2)

### Initialization

  1. *Meteor is started*<br/>
  With the default values.  
  2. *Mirror is started (optional)*<br/>
  If the environment variable `WITH_MIRROR=1` is set, then another meteor process that is used for testing.
  3. *Chimp is started*<br/>
  Chimp will run all the tests against the Meteor app. If you started a mirror, then the tests will run against the mirror leaving your main app alone.
   
FWIW, we prefer to run without a mirror.

You can edit the `start.js` script to set any specific customizations you want to set, such as the port that Meteor app or mirror use or any environment variables.

### Development Loop
Now that both Meteor, an optional mirror, and Chimp are all running, you can develop using Meteor as you normally would and Chimp will intelligently rerun tests.

There are three events that trigger Chimp to rerun tests, those are:
  1. The first time it starts
  2. Any time Meteor reloads the client or server (Chimp detects these via DDP)
  3. Any time the test files change

In development mode, it does not make sense to run all the acceptance and end-to-end tests as they will be too slow, so Chimp gets around this by only rerunning specs / tests that have the `@focus` tag. The `@watch` and `@dev` are aliases that also work.

1. *Chimp will first run any scenarios that are tagged with `@focus`*<br/>
  The step definitions that are used in this first run are under `src/tests/features/step_definitions/domain`. We don't ever write UI tests here, these are intended to ensure the domain of the app works.

2. *Chimp will additionally run any scenarios that also have both the `@critical` and `@focus` tags*<br/>
  This second test run will also use the steps under `src/tests/features/step_definitions/domain`, but it will override them with any steps defined under `src/tests/features/step_definitions/critical`. This is where we write UI based tests.
  
This development workflow encourages you to always start with the domain. As you iterate over the domain and write your units (driven by unit tests of course), you can then write a UI based test for the critical path scenarios.

For unit testing, we use Wallaby / Karma. See the main repository README for more info on how the unit testing is done in this repo. We are also using Velocity to run integration tests 

## `npm test`

When you want to run all the tests in sequence, either locally on CI, you use `npm test`. Here's what the script does:

![npm start](https://docs.google.com/drawings/d/1fjgtmg_vUVCuVseroD-7esYW_hB6CM4NW5cTLJCliEM/pub?w=1761&amp;h=1512&cb=1)

And here's a brief description of the steps:
  1. *Runs Unit tests using Karma*<br/>
  These run at blitzing light speed and do not use Meteor at all.
  2. *Runs Velocity based Jasmine tests*<br/>
  These are also very fast to run, but the Meteor startup time can be slow.
  3. *Runs Chimp based Cucumber tests*<br/>
  Just like in development mode, Chimp will first run domain tests then the critical steps.
  4. *Optionally Reports to Simian*<br/>
  If you have a Simian account and want to share progress on your features with your team, Chimp posts results from CI to Simian.
  5. *Reports to the console*<br/>
  So you can see what happened
  6. *Exists*<br/>
  Hopefully with green check-marks everywhere
  
