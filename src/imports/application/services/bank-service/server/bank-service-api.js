import {AccountHolders} from '../../../../infrastructure/collections';
import BankService from '../../../../domain/services/bank-service';
import {AccountHolderRepository} from '../../../../domain/model/account-holder/account-holder-repository';

const bankService = BankService.getInstance();

Meteor.methods({
  'bank/transfer' (toAccountHolderId, amount) {
    const meteorUser = Meteor.user();
    if (!meteorUser) {
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

    const fromAccountHolder = AccountHolderRepository.find(meteorUser.accountHolderId);
    const toAccountHolder = AccountHolderRepository.find(toAccountHolderId);
    bankService.transfer(fromAccountHolder, toAccountHolder, parseFloat(amount));
    AccountHolderRepository.update(fromAccountHolder);
    AccountHolderRepository.update(toAccountHolder);
  },
  'bank/depositCheck' (fromAccountNumber, branchNumber, amount) {
    const meteorUser = Meteor.user();
    if (!meteorUser) {
      return {message: 'You are not logged in'};
    }
    const fromAccountHolder = AccountHolderRepository.find(fromAccountNumber);
    const toAccountHolder = AccountHolderRepository.find(meteorUser.accountHolderId);
    var result = bankService.depositCheck(fromAccountHolder, toAccountHolder, branchNumber, amount);
    AccountHolderRepository.update(fromAccountHolder);
    AccountHolderRepository.update(toAccountHolder);
    return result;
  },
  'bank/issueChecks' (accountHolderId, numberOfChecks) {
    // FIXME spike - needs to be fleshed out and tested
    // XXX looks like this needs the role of Bank Teller or similar
    const accountHolder = AccountHolderRepository.find(accountHolderId);
    bankService.issueChecks(accountHolder, numberOfChecks);
    AccountHolderRepository.update(accountHolder);
  }
});
