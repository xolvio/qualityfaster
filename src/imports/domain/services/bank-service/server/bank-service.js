import {validateAndThrowError} from '../../../../utility/validation';

export function validateTransfer({fromAccountHolder, toAccountHolder, amount}) {
  if (fromAccountHolder.account.balance < amount) {
    return 'INSUFFICIENT_FUNDS';
  } else {
    return null;
  }
}

export function persistTransfer({fromAccountHolder, toAccountHolder, amount}) {
  fromAccountHolder.account.balance = fromAccountHolder.account.balance - amount;
  toAccountHolder.account.balance = toAccountHolder.account.balance + amount;
}

export default class BankServiceIso {
  transfer(fromAccountHolder, toAccountHolder, amount) {
    const transferEvent = {fromAccountHolder, toAccountHolder, amount};
    validateAndThrowError([validateTransfer], transferEvent);
    persistTransfer(transferEvent);
  }
  issueChecks(accountHolder, numberOfChecks) {
    accountHolder.account.numberOfChecks = accountHolder.account.numberOfChecks + numberOfChecks;
  }
  depositCheck(fromAccountHolder, toAccountHolder, branchNumber, amount) {
    if (fromAccountHolder.account.branchNumber !== branchNumber ||
       toAccountHolder.account.branchNumber !== branchNumber) {
      return {message: 'Branch numbers do not match'};
    }
    if (fromAccountHolder.account.numberOfChecks <= 0) {
      return {message: 'Account holder does not have enough checks'};
    }
    fromAccountHolder.account.numberOfChecks = fromAccountHolder.account.numberOfChecks -1;
    return this.transfer(fromAccountHolder, toAccountHolder, amount);
  }
};
