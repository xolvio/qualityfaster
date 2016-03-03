import {AccountHolders} from '../collections';
import AccountService from '../../application/services/account-service/index';

describe('publications', function () {
  beforeEach(function () {
    this.publications = {};
    spyOn(Meteor, 'publish').and.callFake((publicationName, publicationFunction) => {
      this.publications[publicationName] = publicationFunction;
    });
    require('./publications');
  });
  describe('user', function () {
    beforeEach(function () {
      this.expectedUser = {some: 'dude'};
      spyOn(Accounts.users, 'find').and.returnValue(this.expectedUser);
    });
    it('should return the currently logged in user', function () {
      const thisContext = {userId: 'notNull'};
      const actualUser = this.publications['user'].apply(thisContext);

      expect(actualUser).toBe(this.expectedUser);
    });
    it('should not try to find a user if a user is not logged in', function () {
      const thisContext = {userId: null};
      const actualUser = this.publications['user'].apply(thisContext);

      expect(actualUser).not.toBe(this.expectedUser);
    });
  });
  describe('accountHolder', function () {
    beforeEach(function () {
      this.expectedUser = {accountHolderId: 'a1b2c3d4'};
      spyOn(Accounts.users, 'findOne').and.returnValue(this.expectedUser);
      this.expectedAccountHolder = {some: 'dudette'};
      spyOn(AccountHolders, 'find').and.returnValue(this.expectedAccountHolder);
    });
    it('should return the current account holder', function () {
      const thisContext = {userId: 'notNull'};
      this.publications['accountHolder'].apply(thisContext);

      expect(Accounts.users.findOne).toHaveBeenCalledWith(thisContext.userId);
    });
    it('should return null when a user is not logged in', function () {
      const thisContext = {userId: null};
      this.publications['accountHolder'].apply(thisContext);

      expect(Accounts.users.findOne).not.toHaveBeenCalled();
    });
  });
});