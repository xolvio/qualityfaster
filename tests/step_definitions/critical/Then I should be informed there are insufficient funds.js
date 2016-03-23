module.exports = function() {
  this.Then(/^I should be informed there are insufficient funds$/, function () {
    expect(this.bankTransferResult).toEqual({
      message: 'Insufficient Funds'
    });
  });
};
