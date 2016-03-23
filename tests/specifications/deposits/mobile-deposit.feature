Feature: Mobile check deposit

  As an Account Holder
  I want to deposit my check through my mobile
  So that I can save time

  Background:
    Given I have an account with the branch number 12345
    And "Clare" has an account with the branch number 12345
    And the bank has issued a 10-check checkbook to "Clare"

  @critical
  Scenario: Deposit check by number from same bank
    Given my bank account balance is $100
    And "Clare"'s bank account balance is $90
    And "Clare" has written a $10 check to me
    When I deposit the check into my account
    Then my account balance should be $110
    And "Clare"'s account balance should be $80
    And "Clare" should have 9 checks left in her checkbook
