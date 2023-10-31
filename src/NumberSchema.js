class Validator {

    static isNumber = (value) => typeof value === 'number' ? true : false;

    validators = [Validator.isNumber];

    even() {
        this.validators.push((num) => num % 2 === 0);
        return this;
    }
    odd() {
        this.validators.push((num) => num % 2 !== 0);
        return this;
    }
    interval(min, max) {
        this.validators.push((value) => value >= min && value <= max);
        return this;
    }
    isValid(value) {
        const result = this.validators.map((validator) => validator(value));
        return !result.includes(false);
    }
}

export default Validator;