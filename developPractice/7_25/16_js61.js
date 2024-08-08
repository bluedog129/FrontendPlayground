const num1 = 123;

const num2 = new Number(123);

console.log(typeof num1); // number
console.log(typeof num2); // object

console.log(Number.MAX_SAFE_INTEGER);
console.log(Number.MAX_VALUE);

let num3 = 123.456;
console.log(num3.toExponential());

const num4 = 1234.1321;
console.log(num4.toFixed(2));
console.log(num4.toLocaleString(3));
console.log(num4.toPrecision(3));

console.log(Math.abs(-123));
console.log(Math.round(Math.random()));

console.clear();

const text = "test";
console.log(text.charAt(0));

const long = "hello my name is jin";
console.log(long.split(" "));
