const { calc } = require('./calculator');

test(`'3', '+', '2'`, () => {
  expect(calc('3', '+', '2')).toBe('5');
});

test(`'6', '/', '3'`, () => {
  expect(calc('6', '/', '3')).toBe('2');
});

test(`'2', '+', '2', '*', '2'`, () => {
  expect(calc('2', '+', '2', '*', '2')).toBe('8');
});

// console.log(calc('3', '+', '2') === '5');
// console.log(calc('6', '/', '3') === '2');
// console.log(calc('2', '+', '2', '*', '2') === '8');
