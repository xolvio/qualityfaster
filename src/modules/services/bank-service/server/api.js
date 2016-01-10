import {AccountHolders} from '../../../models/collections';
import BankService from '..';

const bankService = BankService.getInstance();

Meteor.methods({
  'bank/transfer' (toAccountNumber, amount) {
    if (!Meteor.userId()) {
      return {message: 'You are not logged in'};
    }
    const fromAccountHolder = AccountHolders.findOne(Meteor.userId());
    const toAccountHolder = AccountHolders.findOne(toAccountNumber);
    var result = bankService.transfer(fromAccountHolder, toAccountHolder, amount);
    fromAccountHolder.save();
    toAccountHolder.save();

    return result;
  },
  'bank/depositCheck' (fromAccountNumber, branchNumber, amount) {
    if (!Meteor.userId()) {
      return {message: 'You are not logged in'};
    }
    const fromAccountHolder = AccountHolders.findOne(fromAccountNumber);
    const toAccountHolder = AccountHolders.findOne(Meteor.userId());
    var result = bankService.depositCheck(fromAccountHolder, toAccountHolder, branchNumber, amount);
    fromAccountHolder.save();
    toAccountHolder.save();
    return result;
  },
  'bank/issueChecks' (accountHolderId, numberOfChecks) {
    // XXX this should require a role of Bank Teller or similar
    const accountHolder = AccountHolders.findOne(accountHolderId);
    bankService.issueChecks(accountHolder, numberOfChecks);
    accountHolder.save();
  }
});