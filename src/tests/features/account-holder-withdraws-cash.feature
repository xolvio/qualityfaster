Feature: Account holder same-bank money transfers

  As an Account Holder
  I want to transfer money from my bank account to other account holders in the same bank
  So that I can pay my dues

  Background:
    Given I am logged in
    And "James" has an account with the same bank

  @watch @critical
  Scenario: Account has sufficient funds
    Given my bank account balance is $100
    And "James"'s bank account balance is $0
    When I transfer $20 to "James"'s bank account
    Then my account balance should be $80
    And "James"'s account balance should be $20

  Scenario: Account has insufficient funds
    Given my bank account balance is $10
    And "James"'s bank account balance is $50
    When I transfer $20 to "James"'s bank account
    Then I should be informed there are insufficient funds
    And my account balance should be $10
    And "James"'s account balance should be $50