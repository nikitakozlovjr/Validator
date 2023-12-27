class Validator {

    static isFunction = (value) => typeof value === 'function';
    
    validators = [Validator.isFunction];
    exp = null;
    context = {};
    arg = [];

    expect(result) {
        this.exp = result;
        return this; 
    }
    callWith(context) {
        this.context = context;
        return this;
    }
    arguments(arg) {
        this.arg = arg;
        return this;
    }
    isValid(func) {
        if(this.exp) {
            return Validator.isFunction(func) 
            ? func.call(this.context, this.arg) === this.exp
            : false;
        }
        return this.validators.every((validator) => validator(func));
    }
};

export default Validator;