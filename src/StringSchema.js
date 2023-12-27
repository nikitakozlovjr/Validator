class Validator {
  static isString = (value) => (typeof value === 'string');

  validators = [Validator.isString];

  startsFromUpperCase() {
    this.validators.push((str) => /[A-Z]/.test(str.trim()[0]));
    return this;
  }

  length(value) {
    this.validators.push((str) => str.length === value);
    return this;
  }

  hasExclamation() {
    this.validators.push((str) => str.includes('!'));
    return this;
  }

  hasSpaces() {
    this.validators.push((str) => str.includes(' '));
    return this;
  }

  isValid(value) {
    const result = this.validators.map((validator) => validator(value));
    return !result.includes(false);
  }
}

export default Validator;
