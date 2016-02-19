import {AccountHolders} from '../../../../infrastructure/collections';
import BankService from '../../../../domain/services/bank-service';

const bankService = BankService.getInstance();

Meteor.methods({
  'bank/transfer' (toAccountNumber, amount) {
    if (!Meteor.userId()) {
      return {message: 'You are not logged in'};
    }

    //import {validateAndThrowError} from '../../../../utility/validation';
    //
    //export function validateTransfer({fromAccountHolder, toAccountHolder, amount}) {
    //  if (fromAccountHolder.account.balance < amount) {
    //    return 'INSUFFICIENT_FUNDS';
    //  } else {
    //    return null;
    //  }
    //}
    //const transferEvent = {fromAccountHolder, toAccountHolder, amount};
    //validateAndThrowError([validateTransfer], transferEvent);

    const from = AccountHolders.findOne(Meteor.userId());
    const to = AccountHolders.findOne(toAccountNumber);
    bankService.transfer(from.accountHolder, to.accountHolder, parseFloat(amount));
    AccountHolders.update(from._id, from);
    AccountHolders.update(to._id, to);
  },
  'bank/depositCheck' (fromAccountNumber, branchNumber, amount) {
    if (!Meteor.userId()) {
      return {message: 'You are not logged in'};
    }
    const from = AccountHolders.findOne(fromAccountNumber);
    const to = AccountHolders.findOne(Meteor.userId());
    var result = bankService.depositCheck(from.accountHolder, to.accountHolder, branchNumber, amount);
    AccountHolders.update(from._id, from);
    AccountHolders.update(to._id, to);
    return result;
  },
  'bank/issueChecks' (accountHolderId, numberOfChecks) {
    // XXX this should require a role of Bank Teller or similar
    const accountHolder = AccountHolders.findOne(accountHolderId);
    bankService.issueChecks(accountHolder, numberOfChecks);
    accountHolder.save();
  }
});




