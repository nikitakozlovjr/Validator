class Validator {
    
    static isString = (value) => typeof value === 'string' ? true : false;

    validators = [Validator.isString];

    isValid(value) {
        const result = this.validators.map((validator) => validator(value));
        return !result.includes(false);
    }
}

export default Validator;