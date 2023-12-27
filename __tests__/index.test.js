// @ts-check

import { test } from 'node:test';
import assert from 'assert/strict';
import Validator from '../index.js';

test('NumberSchema test', () => {
  const validator = new Validator();
  const schema = validator.number();

  assert.equal(schema.isValid(null), false); // false
  assert.equal(schema.isValid(''), false); // false
  assert.equal(schema.isValid(true), false); // false
  assert.equal(schema.isValid(123), true); // true
  assert.equal(schema.isValid(0), true); // true

  const validator1 = new Validator();
  const schema1 = validator1.number().even();
  const schema2 = validator1.number().odd();

  assert.equal(schema1.isValid(''), false);
  assert.equal(schema1.isValid(2), true);
  assert.equal(schema2.isValid(2), false);
  assert.equal(schema2.isValid(3), true);
});

test('StringSchema test', () => {
  const validator = new Validator();

  const schema1 = validator.string();
  assert.equal(schema1.isValid('Hexlet'), true);
  assert.equal(schema1.isValid(''), true);
  assert.equal(schema1.isValid(true), false);
  assert.equal(schema1.isValid(123), false);
  assert.equal(schema1.isValid(), false);

  const schema2 = validator.string().startsFromUpperCase();
  assert.equal(schema2.isValid(''), false);
  assert.equal(schema2.isValid('Hexlet'), true);
  assert.equal(schema2.isValid(' '), false);
  assert.equal(schema2.isValid('!H!'), false);
  assert.equal(schema2.isValid('1H!'), false);
  assert.equal(schema2.isValid('3H!'), false);
  assert.equal(schema2.isValid('0H!'), false);

  const schema3 = validator.string().length(5).startsFromUpperCase();
  assert.equal(schema3.isValid('hexlet'), false);
  assert.equal(schema3.isValid(' hello?'), false);
  assert.equal(schema3.isValid('Hieee'), true);
  assert.equal(schema3.isValid('!Hide'), false);

  const schema4 = validator.string().length(5).startsFromUpperCase().hasExclamation();
  assert.equal(schema4.isValid('hexlet'), false);
  assert.equal(schema4.isValid(' hello?'), false);
  assert.equal(schema4.isValid('Hieee'), false);
  assert.equal(schema4.isValid('Hide!'), true);

  const schema5 = validator.string().hasExclamation().length(5);
  assert.equal(schema5.isValid('hexle'), false);
  assert.equal(schema5.isValid(' hello?'), false);
  assert.equal(schema5.isValid('Hieee'), false);
  assert.equal(schema5.isValid('Hide!'), true);
});

test('ArraySchema test', () => {
  const validator = new Validator();
  const schema = validator.array();
  const schema1 = validator.array().maxDepth(1);
  const schema2 = validator.array().maxDepth(8);
  const schema3 = validator.array().maxDepth(3);

  assert.equal(schema.isValid('Hello!'), false);
  assert.equal(schema.isValid(123), false);
  assert.equal(schema.isValid([]), true);
  assert.equal(schema.isValid([1, 23, 4]), true);
  assert.equal(schema.isValid({}), false);
  assert.equal(schema.isValid(() => { }), false);
  assert.equal(schema1.isValid(null), false);
  assert.equal(schema1.isValid([]), true);
  assert.equal(schema1.isValid([0, 0, 0, 0]), true);
  assert.equal(schema1.isValid([0, 0, 0, 0, [1], [1, [2]]]), false);

  assert.equal(schema2.isValid([1, 2, 3, [0, [1, [2, [3, [4]]]]]]), true);
  assert.equal(schema2
    .isValid([1, [2], [1, [2, [3, [4, [5, [6, [7, [8, [9, [10, [11]]]]]]]]]]]]), false);

  assert.equal(schema3.isValid([0, 0, 0, [1, [2], [2, [3]], [1, [2, [3, [4]]]]]]), false);
  assert.equal(schema3.isValid([[1], [[2]], [[[3]]]]), true);
});

test('FunctionSchema test', () => {
  const v = new Validator();

  const schema1 = v.function();
  assert.equal(schema1.isValid(() => { }), true);
  assert.equal(schema1.isValid(console.log), true);
  assert.equal(schema1.isValid({}), false);

  const schema2 = v.function().expect('1');
  assert.equal(schema2.isValid(() => 1), false);
  assert.equal(schema2.isValid(() => '1'), true);

  const schema3 = v.function().callWith({ prop: '1' }).expect('1');
  assert.equal(schema3.isValid(() => '1'), true);
  assert.equal(schema3.isValid(() => 1), false);
  assert.equal(schema3.isValid(function test() { return this.prop; }), true);

  const schema4 = v.function().arguments([1, 2, 3, 4, 5, 6, 7]).expect(1);

  assert.equal(schema4.isValid((args) => Math.min(...args)), true);
  assert.equal(schema4.isValid(() => 1), true);
  assert.equal(schema4.isValid(function p() { return this.prop; }), false);

  const schema5 = v.function().arguments([1, 2, 3, 4, 5, 6, 7]).expect(true).callWith({ prop: 2 });
  assert.equal(schema5.isValid(function p(args) { return args[1] === this.prop; }), true); // true;
  assert.equal(schema5.isValid(function p(args) { return args[2] === this.prop; }), false); // true;
});

test('ObjectSchema plain test', () => {
  const validator = new Validator();
  const schema1 = validator.object().shape({
    name: validator.string().startsFromUpperCase(),
    basket: validator.array().maxDepth(1),
  });

  const schema2 = validator.object().shape({
    name: validator.string(),
    basket: validator.array().maxDepth(0),
    payment: validator.array().maxDepth(2),
  });

  assert.equal(schema1.isValid({ name: 'B11', basket: ['potatos', 'tomatos', 'oranges', ['carrots']] }), true);
  assert.equal(schema1.isValid({ name: '12', basket: ['potatos', 'tomatos', 'oranges'] }), false);
  assert.equal(schema1.isValid({}), false);

  assert.equal(schema2.isValid({ name: 'sergey', basket: ['apple', 'cucumber'], payment: ['10 dollars', '10 cents', [0, [1]]] }), true);
  assert.equal(schema2.isValid({ name: 17, basket: ['apple', 'cucumber'], payment: ['10 dollars', '10 cents'] }), false);
  assert.equal(schema2.isValid({ name: '213', basket: ['apple'], payment: ['10 dollars', '10 cents'] }), true);
});

test('ObjectSchema nested test', () => {
  const v = new Validator();

  const schema = v.object().shape({
    string: v.string(),
    obj: {
      func: v.function(),
      innerObj: {
        string: v.string().hasSpaces(),
        deepestObj: {
          func: v.function().arguments(['h', 'e', 'l', 'l', 'o']).expect('hell'),
        },
      },
    },
  });

  assert.equal(schema.isValid({
    string: '54',
    obj: {
      func: () => { },
      innerObj: {
        string: 'he he he',
        deepestObj: {
          func: (args) => args.slice(0, args.length - 1).join(''),
        },
      },
    },
  }), true);
});
