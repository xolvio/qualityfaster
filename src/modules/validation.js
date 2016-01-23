export function validate(validators, data) {
  return _.reduce(validators, (errors, validator) => {
    const error = validator(data);
    if (error) {
      errors.push(error)
    }
    return errors;
  }, []);
}

export function throwMeteorError({id, message}) {
  throw new Meteor.Error(id, message);
}

export function validateAndThrowMeteorError(validators, data) {
  validate(validators, data).map(throwMeteorError);
}
