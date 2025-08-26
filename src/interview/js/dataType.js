// 基本数据类型	
// number、string、boolean、undefined、null、symbol、bigint。	
// 引用数据类型
// object、array、function、Date、RegExp
// 直接存储在栈内存中	值存储在堆内存，引用存储在栈内


let a = 133
let b = 'string'
let c = true
let d = null
let e = undefined
let f = Symbol('123')
let g = BigInt('233243242')
let h = {}
let i = []
let j = function(){}
let k = new Date()
let l = new RegExp()


//  类型判断 typeof   null/数组/对象/日期/正则 会被判断为object 其他没问题
console.log(typeof a);  // number
console.log(typeof b);  // string
console.log(typeof c);  // boolean
console.log(typeof d);  // object
console.log(typeof e);  // undefined
console.log(typeof f);  // symbol
console.log(typeof g);  // bigint
console.log(typeof h);  // object
console.log(typeof i);  // object
console.log(typeof j);  // function
console.log(typeof k);  // object
console.log(typeof l);  // object


console.log('=========instanceof=========');

// 类型判断 instanceof 可以判断一个实例是否属于某种类型，但仅限于引用数据类型
// 判断基本类型的时候，有的可能会报错
// console.log(a instanceof Number);  // false
// console.log(b instanceof String);  // false
// console.log(c instanceof Boolean);  // false
// console.log(d instanceof null);  // false
// console.log(e instanceof undefined);  // false
// console.log(f instanceof Symbol);  // false
// console.log(g instanceof BigInt);  // false
console.log(h instanceof Object);  // true
console.log(i instanceof Array);  // true
console.log(j instanceof Function);  // true
console.log(k instanceof Date);  // true
console.log(l instanceof RegExp);  // true


console.log('========constructor==========');

// 类型判断 constructor 判断左边是否隶属于后边 但也仅限于引用数据类型
// 主要是利用prototype.constructor 指向实例的构造函数来进行判断的

console.log(a.constructor);  // [Function: Number]
console.log(b.constructor);  // [Function: String]
console.log(c.constructor);  // [Function: Boolean]
// console.log(d.constructor);  // null 会报错
// console.log(e.constructor);  // undefined 也报错
console.log(f.constructor);  // [Function: Symbol]
console.log(g.constructor);  // [Function: BigInt]
console.log(h.constructor);  // [Function: Object]
console.log(i.constructor);  // [Function: Array]
console.log(j.constructor);  // [Function: Function]
console.log(k.constructor);  // [Function: Date]
console.log(l.constructor);  // [Function: RegExp]


console.log('=========Object.prototype.toString.call(a)=========');
console.log(Object.prototype.toString.call(a));  // [object Number]
console.log(Object.prototype.toString.call(b));  // [object String]
console.log(Object.prototype.toString.call(c));  // [object Boolean]
console.log(Object.prototype.toString.call(d));  // [object Null]
console.log(Object.prototype.toString.call(e));  // [object Undefined]
console.log(Object.prototype.toString.call(f));  // [object Symbol]
console.log(Object.prototype.toString.call(g));  // [object BigInt]
console.log(Object.prototype.toString.call(h));  // [object Object]
console.log(Object.prototype.toString.call(i));  // [object Array]
console.log(Object.prototype.toString.call(j));  // [object Function]
console.log(Object.prototype.toString.call(k));  // [object Date]
console.log(Object.prototype.toString.call(l));  // [object RegExp]




let aa = Symbol(23423)
aa = 234
console.log(aa);
