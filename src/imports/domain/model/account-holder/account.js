export class Account {
  constructor(options) {
    this.branchNumber = options.branchNumber;
    this.numberOfChecks = options.numberOfChecks ? options.numberOfChecks : 0;
    this.balance = options.balance ? options.balance : 0;
  }
}
