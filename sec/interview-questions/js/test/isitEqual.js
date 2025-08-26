// == 和 ===有什么区别



// == 运算符在比较大时候会进行隐式类型转换，将操作数转换为相同的类型后再进行比较

// === 不会进行隐式类型转换，会先检查比较数的类型，如果类型不通就直接返回false
// === 要求值要相同，并起数据类型也要相同

let a = '1'
let b = 2
let c = 3
let d = '3'
let e = true

console.log(a == b); //false
console.log(c == d); //true
console.log(c === d); //false
console.log(1 == e); // true
console.log(1 == '1'); // true
console.log(0 == false); // true
console.log(null == undefined); // true
console.log('' == 0); // true

// NaN 与任何值(包括自己)都不相等。 但是Object.is(NaN,NaN) true
console.log(NaN == NaN) // false
console.log('NaN,NaN',Object.is(NaN,NaN))


// object.is 基本数据类型
// 它遵循与 === 相同的行为，但有两个不同之处：
console.log('Object.is(NaN,NaN)',Object.is(NaN,NaN)) //true
console.log('Object.is(-0,+0)',Object.is(-0,+0)) //false
// Object.is(NaN,NaN) true
// Object.is(-0,+0) false
console.log('NaN === NaN',NaN === NaN) // false
console.log('-0 === +0',-0 === +0) // true


console.log(Object.is(true,1))



