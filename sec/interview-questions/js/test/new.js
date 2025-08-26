// new 的实现  new 操作符的实现原理
// new 操作符用于创建一个对象实例

// 1. 创建一个空对象
// 2. 将空对象的原型指向构造函数的原型
// 3. 将空对象作为构造函数的上下文
// 4. 如果构造函数返回一个对象，则返回该对象，否则返回空对象

function myNew(fn, ...args) {
    // 1. 创建一个空对象
    const obj = {};

    // 2. 将空对象的原型指向构造函数的prototype
    // 第一种方法 直接赋值
    obj.__proto__ = fn.prototype;
    // 第二种方法 使用Object.setPrototypeOf
    Object.setPrototypeOf(obj, fn.prototype);

    // 3. 将空对象作为构造函数的上下文
    const result = fn.apply(obj, args);

    // 4. 如果构造函数返回一个对象，则返回该对象，否则返回空对象
    return result instanceof Object ? result : obj;


}

// 测试
function Person(name, age) {
    this.name = name;
    this.age = age;
}

const person = myNew(Person, '张三', 18);
console.log(person); // { name: '张三', age: 18 }

// 手写new


// function myNew(fn, ...args) {
//     const obj = {};
//     obj.__proto__ = fn.prototype;
//     const result = fn.apply(obj, args);
//     return result instanceof Object ? result : obj;
// }