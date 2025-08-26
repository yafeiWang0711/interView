/**
 * JavaScript类型转换面试题详解
 * 知识点：显式转换、隐式转换、==与===、特殊值转换
 */

// 问题1：JavaScript的数据类型及判断方法
/**
 * 基本类型：String, Number, Boolean, null, undefined, Symbol, BigInt
 * 引用类型：Object, Array, Function, Date, RegExp等
 *
 * 判断方法：
 * 1. typeof: 适合判断基本类型(null除外)
 * 2. instanceof: 适合判断引用类型
 * 3. Object.prototype.toString.call(): 最准确的判断方法
 * 4. Array.isArray(): 判断数组
 */

// 问题2：==与===的区别及转换规则
/**
 * ===: 严格相等，不进行类型转换，类型和值都必须相等
 * ==: 抽象相等，会进行类型转换，只比较值
 *
 * ==转换规则：
 * 1. 如果类型相同，直接比较值
 * 2. 如果类型不同：
 *    a. null == undefined → true
 *    b. 数字 == 字符串 → 字符串转数字
 *    c. 布尔值 == 其他类型 → 布尔值转数字
 *    d. 对象 == 基本类型 → 对象转基本类型
 *    e. 其他情况 → false
 */

// 经典面试题
console.log(0 == false); // true
console.log(1 == true); // true
console.log('' == false); // true
console.log(null == undefined); // true
console.log([] == 0); // true
console.log({} == '[object Object]'); // true
console.log(NaN == NaN); // false (NaN不等于任何值，包括它自己)

// 问题3：显式类型转换方法
// 1. 转字符串
const num = 123;
console.log(String(num)); // "123"
console.log(num.toString()); // "123"

// 2. 转数字
const str = "456";
console.log(Number(str)); // 456
console.log(parseInt(str)); // 456
console.log(parseFloat("456.78")); // 456.78

// 3. 转布尔值
console.log(Boolean(0)); // false
console.log(Boolean(