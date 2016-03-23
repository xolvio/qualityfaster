module.exports = function() {
  this.Then(/^I should be informed there are insufficient funds$/, function () {
    expect(this.result.message).toBe('Insufficient Funds');
  });
};
