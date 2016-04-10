# Automated Testing Best Practices by [Xolv.io](http://xolv.io)
[![Circle Build](https://circleci.com/gh/xolvio/automated-testing-best-practices.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/xolvio/automated-testing-best-practices)
[![Travis Build](https://travis-ci.org/xolvio/automated-testing-best-practices.svg?branch=master)](https://travis-ci.org/xolvio/automated-testing-best-practices)

We at Xolv.io are testing and automation geeks that help other companies deliver higher quality, faster. We wrote [Chimp.js](http://chimpjs.com) to help us with this mission and we would like to show you how to use it properly **and be awesome at testing!**

This repository is a complete modern Agile development and testing setup that allows you to release features at high speed, and maintain that speed as the complexity of your team, codebase and domain increases.

For your testing codebase to serve you well and stand the test of time, you must be committed to making your automated tests **fast**, **reliable** and **maintainable**.

Please read EVERYTHING, even if you are already a ninja.

> __Note:__ The automation scripts that are provided in this repository are still a work in progress. Contributions to improve them are appreciated. It currently doesn't work on Windows (see [#36](https://github.com/xolvio/automated-testing-best-practices/issues/36)).

#### Speed
Waiting costs everybody time, money and hair-loss. Investing time to make your tests run fast will pay back exponentially. The quicker you can detect defects, the cheaper it is to fix them. Making sure that your tests can run fast as the codebase grows can be a major engineering challenge. Ignoring the challenge does not make it go away and as the build & test time slows down, so does your team productivity, which costs you money.

> Slow tests are the #3 reason teams fail at automated testing

#### Reliability
Flaky tests that fail when you change unrelated parts of your system, and false negatives (or worse false positives) will introduce delays into your development process and will make your team lose faith in the process. When this happens, it is twice the problem of slow tests. Not only are developers triggering reruns of the build and hoping for the best, they are also losing time.

> Unreliable tests are the #2 reason teams fail at automated testing

#### Maintainability
It’s very common for a testing codebase to become “out of date”. This typically happens when the tests look like scripts as opposed to test codebase that employs a software engineering discipline. As the application codebase changes, these test scripts quickly mismatch the code and it’s far easier to disable them than it is to maintain them.

> Unmaintainable tests are the #1 reason teams fail at automated testing

You have to learn the right techniques and form the right habits to be able to do this.

## Forming Good Habits

Just like snowboarding or driving a car, your chances of forming good habits starts with knowing what the good habits are and then practicing them. We cannot emphasise enough the importance of testing. Too often we're called in both to enterprise and to companies with growing projects and asked "will the patient live?", and every single time, the root causes of slow delivery are the lack of automated tests and automation in general.

The key to succeeding long-term, is knowing what makes your tests work with you and not against you. So we ask that you **read everything** on our [testing success factors](./content/TESTING-SUCCESS-FACTORS.md) page prior to digging into the codebase. You are going to know a lot more about a high-performance engine or snowboard if you RTFM!

We frequently meet developers that think they know how to do automated testing. When we dig deeper, we find they know how to do unit testing, but the distinction between acceptance and end-to-end testing is blurry for them. They have the best intentions but unfortunately they end up **building technical debt without knowing it**.

We are on a mission to fix this problem, and we're setting the example in this repository to show the way we do it. We also welcome and encourage all feedback as we have plenty to learn from the community.

*\- Your friends at Xolv.io :)*

## About This Repository

#### Technologies & Tools

##### Meteor
In our view, JavaScript is currently the best language choice for modern web application development. It provides the ability to write code on the server, client, database and even build scripts. This reduces the cognitive load on developers that comes from context switching, and increases code reuse, both of which lead to higher productivity.

Meteor embraces this view. It is a complete Node.js based full-stack JavaScript framework that emphasises fast feedback and a great developer experience. It has a great package system as well as being compatible with NPM.

##### Packages

* **[React](https://facebook.github.io/react/)**<br/>
  Great view layer with some great design principles. It comes with built-in testing support and is testable entirely independently without needing to run Meteor.

##### Testing Tools

In this repository, we have created a great developer experience for unit, acceptance and end-to-end testing, with super fast feedback. Here are the tools choices:

* **[Wallaby](http://wallabyjs.com/) (premium)**<br/>
  An IDE extension that gives you real-time feedback for your unit tests. Real real-time! You break a test, you instantly know. It also shows you which lines of code you don't have coverage for yet. You should seriously check this out if you haven't already. It will speed your entire get up!
* **[Karma](http://karma-runner.github.io/)**<br/>
  Used to run the unit tests in CI mode or when doing a full run locally. If you don't use Wallaby, you can also use Karma to run all the tests every time you save a file.
* **[Chimp](https://github.com/xolvio/chimp/)**<br/>
  Our very own OSS package. Chimp allows you to drive the development of new features with quality built in from the outset. We have configured it in this repository to drive the domain development first, then the UI for critical scenarios.

## Installation & Usage

Please remember to **read everything** on our [testing success factors](./content/TESTING-SUCCESS-FACTORS.md) before proceeding.

#### Locally
1. Clone this repo<br/>
   ```
   git clone https://github.com/xolvio/automated-testing-best-practices.git
   cd automated-testing-best-practices
   npm install
   ```

1. Start Chimp + Meteor without Mirror<br/>
   ```
   npm start
   ```
   Or if you like to have a Mirror (another Meteor app for Chimp to run against):<br/>
   ```
   WITH_MIRROR=1 npm start
   ```

3. Start the unit testing runner by either starting Wallaby from your IDE (highly recommended! See above), or you can start Karma with:
   ```
   npm run karma
   ```

   NOTES:
   * You need to run Meteor before you run the Wallaby server testing mode as it requires a connection to the running database
   * Currently the only way to run server unit tests is using Wallaby locally, CI tests will not work until Meteor 1.3 is released

4. Test and Develop!

  If you'd like to run a full build locally, exit the process and run:

  ```
  npm test
  ```
  [Test script docs](.scripts/README.md#npm-test)

#### On CI
All you need to do is this:
```
npm run ci
```

You might need to do a little more setup depending on your specific CI environment.

This repository already includes a `circle.yml` and `travis.yml` files that runs Chimp on CircleCI and TravisCI, as well as taking care of all the dependency caching.

![](https://ga-beacon-xolvio.appspot.com/UA-34846790-2/readme?pixel)
