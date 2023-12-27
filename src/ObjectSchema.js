class Validator {
  validators = {};

  shape(schema) {
    this.validators = schema;
    return this;
  }

  validatorField(data, validator) {
    if (validator.isValid) {
      return validator.isValid(data);
    }

    const dataKeys = Object.keys(data);
    const validatorKeys = Object.keys(validator);

    if (dataKeys.length !== validatorKeys.length) {
      return false;
    }

    return validatorKeys.every((key) => this.validatorField(data[key], validator[key]));
  }

  isValid(data) {
    return this.validatorField(data, this.validators);
  }
}

export default Validator;
