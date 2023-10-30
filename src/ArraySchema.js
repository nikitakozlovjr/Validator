class Validator {

    static isArray = (value) => Array.isArray(value);

    validators = [Validator.isArray];

    isValid(value) {
        const result = this.validators.map((validator) => validator(value));
        return !result.includes(false);
    }
}

export default Validator;