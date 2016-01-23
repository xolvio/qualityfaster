import {validate, throwMeteorError} from './validation';

describe('validate', function () {
  describe('when no validators return an error', function () {
    it('returns an empty array', function () {
      const firstValidator = () => null;
      const secondValidator = () => null;
      const myValidate = _.partial(
        validate,
        [firstValidator, secondValidator]
      );

      expect(myValidate({})).toEqual([]);
    });
  });

  describe('when validators return errors', function () {
    it('returns the errors', function () {
      const firstValidator = () => ({message: 'My first error'});
      const secondValidator = () => ({message: 'My second error'});
      const myValidate = _.partial(
        validate,
        [firstValidator, secondValidator]
      );

      expect(myValidate({})).toEqual([
        {message: 'My first error'},
        {message: 'My second error'},
      ]);
    });
  });
});

describe('throwMeteorError', function () {
  it('throws the error as Meteor.Error', function () {
    expect(function () {
      throwMeteorError({id: 'MY_ERROR', message: 'My error'});
    }).toThrow(new Meteor.Error('MY_ERROR', 'My error'));
  });
});
