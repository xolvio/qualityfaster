export class AccountHolder {
  constructor(options) {
    if (options._id) {
      this._id = options._id;
    }
    this.name = options.name;
    this.account = options.account;
  }
}
