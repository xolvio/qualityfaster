import {validateAndThrowMeteorError} from '../../../validation';

export function validateTransfer({fromAccountHolder, toAccountHolder, amount}) {
  if (fromAccountHolder.get('account.balance') < amount) {
    return {id: 'INSUFFICIENT_FUNDS', message: 'Insufficient Funds'};
  } else {
    return null;
  }
}

export function persistTransfer({fromAccountHolder, toAccountHolder, amount}) {
  fromAccountHolder.set('account.balance', fromAccountHolder.get('account.balance') - amount);
  toAccountHolder.set('account.balance', toAccountHolder.get('account.balance') + amount);
  fromAccountHolder.save();
  toAccountHolder.save();
}

export default class BankServiceIso {
  transfer(fromAccountHolder, toAccountHolder, amount) {
    const transferEvent = {fromAccountHolder, toAccountHolder, amount};
    validateAndThrowMeteorError([validateTransfer], transferEvent);
    persistTransfer(transferEvent);
  }
  issueChecks(accountHolder, numberOfChecks) {
    accountHolder.set('account.numberOfChecks', accountHolder.get('account.numberOfChecks') + numberOfChecks);
  }
  depositCheck(fromAccountHolder, toAccountHolder, branchNumber, amount) {
    if (fromAccountHolder.get('account.branchNumber') !== branchNumber ||
       toAccountHolder.get('account.branchNumber') !== branchNumber) {
      return {message: 'Branch numbers do not match'};
    }
    if (fromAccountHolder.get('account.numberOfChecks') <= 0) {
      return {message: 'Account holder does not have enough checks'};
    }
    fromAccountHolder.set({'account.numberOfChecks': fromAccountHolder.get('account.numberOfChecks') -1});
    return this.transfer(fromAccountHolder, toAccountHolder, amount);
  }
  internalTransfer(bankTeller, fromAccountHolder, toAccountHolder, amount) {
    if (bankTeller.get('role') !== 'authorized') {
      return {
        message: 'You do not have the correct access rights'
      }
    }
    this.transfer(fromAccountHolder, toAccountHolder, amount);
  }
};
