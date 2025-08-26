// 类型转换

// 强制类型转换：
// 强制类型转换是指开发者明确地使用一些方法或操作符将一个数据类型转换为另一个数据类型。这种转换通常是为了确保代码的正确性和可读性。

// Number()
// String()
// Boolean()
// parseInt()
// parseFloat()

let a = 124

let as = String(a)
let asn = Number(as)
console.log('as',typeof as);
console.log('asn',typeof asn);


let num1 = 'a123b'
let num1s = parseInt(num1)
console.log(num1s); // NaN
console.log(parseInt('123123aaa'));123123
console.log(parseInt('aa1123')); //NaN

console.log(parseFloat('123.123aaa'));

console.log(Boolean(1)); // true
console.log(Boolean(0)); // false
console.log(Boolean(''));// false
console.log(Boolean('234')); //true
console.log(Boolean({})); //true



// 隐式类型转换：

// 在算术运算中（如 +, -, *, /）
// 在比较运算中（如 ==, !=）
// 在逻辑运算中（如 &&, ||）


let result = "10" + 5; // "105"
let comparison = "10" == 10; // true
let logical = "Hello" || "World"; // "Hello"










// 隐式类型转换：
// 隐式类型转换是由 JavaScript 引擎自动进行的类型转换，不需要开发者显式指定。这种转换在某些情况下可能会导致意外的结果，但也简化了一些常见的操作。