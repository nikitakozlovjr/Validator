import StringSchema from './StringSchema.js';
import ArraySchema from './ArraySchema.js';
import ObjectSchema from './ObjectSchema.js';
import NumberSchema from './NumberSchema.js';

class Validator {
    string() {
        return new StringSchema();
    };
    number() {
        return new NumberSchema();
    }
    array() {
        return new ArraySchema();
    };
    object() {
        return new ObjectSchema();
    }
};

export default Validator;