import BankServiceIso from './iso';

export default class BankService extends BankServiceIso {
  static getInstance() {
    if (!this.instance) {
      this.instance = new BankService();
    }
    return this.instance;
  };
};