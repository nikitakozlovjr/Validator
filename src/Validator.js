import StringSchema from './StringSchema.js';
import ArraySchema from './ArraySchema.js';

class Validator {
    string() {
        return new StringSchema();
    };
    array() {
        return new ArraySchema();
    }
};

export default Validator;