class Validator {

    static isArray = (value) => Array.isArray(value);

    validators = [Validator.isArray];

    maxDepth(maxDepth) {
        const getDepth = (value) => Validator.isArray(value) ? 1 + Math.max(0, ...value.map(getDepth)) : 0;
        this.validators.push((value) => {
            console.log(getDepth(value))
            return getDepth(value) - 1 <= maxDepth
        });
        return this;
    }
    isValid(value) {
        const result = this.validators.map((validator) => validator(value));
        return !result.includes(false);
    }
}

export default Validator;