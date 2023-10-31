import StringSchema from './StringSchema.js';
import ArraySchema from './ArraySchema.js';
import ObjectSchema from './ObjectSchema.js';

class Validator {
    string() {
        return new StringSchema();
    };
    array() {
        return new ArraySchema();
    };
    object() {
        return new ObjectSchema();
    }
};

export default Validator;