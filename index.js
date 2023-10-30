import Validator from './src/Validator.js';
const validator = new Validator();
const schema1 = validator.string().startsFromUpperCase();

console.log(schema1.isValid('Hexlet'));
export default Validator;
