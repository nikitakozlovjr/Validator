[![Maintainability](https://api.codeclimate.com/v1/badges/984748ab82fd2ed42032/maintainability)](https://codeclimate.com/github/nikitakozlovjr/Validator/maintainability)

## Validator
### Description
_____

This module is designed for validating values. This validator provides validation functions:
- `number()`
- `string()`
- `array()`
- `function()`
- `object()`

#### Validation of numbers

```javascript

const validator = new Validator();
const schemaNumber = validator.number()

const isNumber1 = schemaNumber.isValid('4'); // false
const isNumber2 = schemaNumber.isValid(4); // true
```
____

The number validator provides functions: 
- `even()` 
- `odd()`
- `interval()`

##### Even method
___

This method checks for the even number passed. If the passed value is a number and it is even, the method returns `true`, otherwise `false`

```javascript
const isEven1 = schemaNumber.even().isValid(4); // true
const isEven2 = schemaNumber.even().isValid(3); // false
const isEven3 = schemaNumber.even().isValid({ number: 4 }); // false
```

##### Odd method
___

This method checks for the odd number passed. If the passed value is a number and it is odd, the method returns true, otherwise false

```javascript
const isOdd1 = schemaNumber.odd().isValid(4); // false
const isOdd2 = schemaNumber.odd().isValid(3); // true
const isOdd2 = schemaNumber.odd().isValid({ number: 4 }); // false
```

##### Interval method
___

This method accepts two arguments as input:
- *min* -> number
- *max* -> number
  
It checks whether the transmitted number is in the range from min to max. If the passed value is a number and is included in the interval, the
method returns `true`, otherwise `false`.

```javascript
const inInterval1 = schemaNumber.interval(1, 7).isValid(4); // true
const inInterval2 = schemaNumber.interval(4, 9).isValid(3); // true
const inInterval3 = schemaNumber.interval(3, 5).isValid({ number: 4 }); // false
```