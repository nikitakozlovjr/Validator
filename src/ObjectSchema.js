class Validator {

    validators = {};

    shape(schema) {
        Object.keys(schema).map((key) => this.validators[key] = schema[key]);
        return this;
    }
    isValid(value) {
        const keys = Object.keys(value);

        if(keys.length !== Object.keys(this.validators).length) {
            return false;
        }

        const result = keys.map((key) => this.validators[key].isValid(value[key]));
        return !result.includes(false);
    }
}

export default Validator;