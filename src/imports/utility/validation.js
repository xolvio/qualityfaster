export function validate(validators, data) {
  return _.reduce(validators, (errors, validator) => {
    const error = validator(data);
    if (error) {
      errors.push(error)
    }
    return errors;
  }, []);
}

export function throwError(message) {
  throw new Error(message);
}

export function validateAndThrowError(validators, data) {
  validate(validators, data).map(throwError);
}
