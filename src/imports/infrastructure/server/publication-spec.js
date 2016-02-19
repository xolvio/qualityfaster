import {AccountHolders} from '../collections';

describe('publications', function () {
  describe('myAccount', function () {
    it('should return the current account holder', function () {
      spyOn(Meteor, 'publish');
      spyOn(AccountHolders, 'find');
      require('./publications');
      var publishFunction = Meteor.publish.calls.argsFor(0)[1];

      const thisContext = {userId: 'someId'};
      publishFunction.apply(thisContext);

      expect(AccountHolders.find).toHaveBeenCalledWith('someId');
    });
  });
});