class Account {
  constructor(options) {
    this.branchNumber = options.branchNumber;
    this.numberOfChecks = 0;
    this.balance = 0;
  }
}

export class AccountHolder {
  constructor(options) {
    this.name = options.name;
    this.account = new Account(options.branchNumber);
  }
}
