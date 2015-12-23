# Automated Testing Best Practices by [Xolv.io](http://xolv.io)
We at Xolv.io are testing and automation geeks that helps other companies deliver higher quality, faster. 

We wrote [Chimp](http://chimpjs.com) to help us with this mission and this repository is aimed at making you awesome!
 
 *If you want to be awesome at testing, you must read everything below before looking at the code.*

## They Key Success Factors 
For your testing codebase to serve you well and stand the test of time, you must be committed to making your automated tests fast, reliable and maintainable.

### Speed 
Waiting costs everybody time, money and hair-loss. Investing time to make your tests run fast will pay back exponentially. The quicker you can detect defects, the cheaper it is to fix them. Making sure that your tests can run fast as the codebase grows can be a major engineering challenge. Ignoring the challenge does not make it go away and as the build & test time slows down, so does your team productivity, which costs you money.

> Slow tests are the #3 reason teams fails at automated testing

### Reliability 
Flaky tests that fail when you change unrelated parts of your system, and false negatives (or worse false positives) will introduce delays into your development process and will make your team lose faith in the process. When this happens, it is twice the problem of slow tests. Not only are developers triggering reruns of the build and hoping for the best, they are also losing time.

> Unreliable tests are the #2 reason teams fails at automated testing

### Maintainability
It’s very common for a testing codebase to become “out of date”. This typically happens when the tests look like scripts as opposed to test codebase that employs a software engineering discipline. As the application codebase changes, these test scripts quickly mismatch the code and it’s far easier to disable them than it is to maintain them.

> Unmaintainable tests are the #1 reason teams fails at automated testing

## The Key Lessons

### Lesson #1: Test Scripts !== Executable Specifications

Here is a test script (taken from the Nightwatch.js homepage):
```javascript
module.exports = {
  'Demo test Google' : function (client) {
    client
    .url('http://www.google.com')
    .waitForElementVisible('body', 1000)
    .assert.title('Google')
    .assert.visible('input[type=text]')
    .setValue('input[type=text]', 'rembrandt van rijn')
    .waitForElementVisible('button[name=btnG]', 1000)
    .click('button[name=btnG]')
    .pause(1000)
    .assert.containsText('ol#rso li:first-child',
      'Rembrandt - Wikipedia')
    .end();
  }
};
```
The characteristics of these tests is that they emulate what a manual tester would do. Whilst automating repetitive manual tasks is a good idea, it’s easy to forget that a human tester is able to adapt to common sense whereas a test script is dumb! You can see in the script above there are references to the HTML markup everywhere. This means if the HTML changes on that page as part of a small enhancement or restyle, the test script will fail.

Your immediate reaction might be that you can improve this script by doing some or all of the following:
 * Remove dependency on the HTML structure
 * Replace the `pause` with `waitForXXX`
 * Extract the text to a resource file
 * Employ a page-object pattern

These are all good measures for sure for fixing the problem with the test-script, but they are not fixes for the problem of test-scripts themselves - they are actually the problem!

Test scripts come *AFTER* you have finished coding as an after-thought. They are the shrink-wrap around your code. They can be a lot of fun to write when you first start out but the sad truth is, you are building up a steaming pile of technical-debt and you're unaware of it. As the pressure to release new features increases, these test scripts become a hindrance since they an after-thought and our almost always out of date. The higher your test-script coverage, the more likely it is that valid new changes will break the tests. Let's just say that one more time - *"valid new changes will break the tests"*. And this is where teh false negatives appear and the tests are disabled "temporarily", usually with the best intentions! 

Test scripts are not all bad, they can be useful. For example, you might want to start writing tests scripts before you refactor a legacy system, and replace the scripts as you write a replacement, or manual testers can use a record-playback tool to create a reproducible bug report for developers. Perhaps you have some non-technical testers and they maintain their own test scripts to help them speed up their current job, but they know to throw away the scripts as they become out-of-date and these scripts do not block a build. Notice the common thread amongst all the use-cases and problems for test scripts, is that they are temporary and short-lived. 

**Test scripts temporary and short-lived.** Remember that, always!

Also notice how the script tells you *HOW* the system is doing something, but not *WHAT* or *WHY*. It completely lacks context. The interesting thing is that there were some specifications at some point that specify how the system should behave. Someone, somewhere had to talk, send emails, look at wireframes and whiteboards and transform that all into code. Where is the specification kept though? In a GitHub issue? In the brains of the developers that wrote it years ago? Actually, it's in the code - that's always the source of truth.

Now let's look at an executable specification in contrast, and let's assume we are Google, staying true to the example above:

```gherkin
Feature: Google Index updates cached pages 

  As a searcher
  I want to see up to date results 
  So that I can find the information I am looking for
  
  Scenario: User searches after the index
    Given Wikipedia contains a page with the title "Rembrandt"
    And Google has indexed the Wikipedia site
    When a user searches for the term "rembrandt van rijn"
    Then the results show "Wikipedia - Rembrandt"
```

That is the specification right there. It does not tell you at all *HOW* to do it, but it does tell you *WHAT* and *WHY*. From the specifications, you can do two things. You can write automated tests that check the code the fulfils the specifications, and you can write the actual code that fulfils the specifications. You can even do this crazy thing called Test Driven Development that drive the development of the specs above using tests and is known to reduce defects by 30-50%.

The tests that are produced in this fashion are always long lasting because they come *BEFORE* the code. Think about it, every time you want to change the code, you start by changing the specs, and then you go on to change the tests as well as the code to match. So you have three artifacts: the specs, the tests and the code. Some frameworks merge the specs and the code (like Mocha and Jasmine) and others separate them (like Cucumber). The example above shows Cucumber's Gherkin syntax, and you can achieve the same with Mocha/Jasmine like this:
 
```javascript
describe('Google Index updates cached pages', function() {
  
  // As a searcher
  // I want to see up to date results 
  // So that I can find the information I am looking for
  
  it('User searches after the index', function() {
    // Given Wikipedia contains a page with the title "Rembrandt"
    // And Google has indexed the Wikipedia site
    
    // When a user searches for the term "rembrandt van rijn"
    
    // Then the results show "Wikipedia - Rembrandt"
  }); 
});
```
  
### TBC...






