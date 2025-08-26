/**
 * JavaScript this关键字面试题详解
 * 知识点：this绑定规则、箭头函数this、绑定优先级
 */

// 问题1：this关键字在不同场景下的指向
/**
 * 1. 全局上下文：指向全局对象（浏览器中为window，Node中为global）
 * 2. 函数调用：普通函数调用指向全局对象，严格模式下为undefined
 * 3. 方法调用：指向调用该方法的对象
 * 4. 构造函数：指向新创建的实例对象
 * 5. apply/call/bind：指向绑定的第一个参数
 * 6. 箭头函数：继承外层作用域的this，不绑定自身this
 */

// 问题2：如何实现bind方法的polyfill
Function.prototype.myBind = function(context) {
  if (typeof this !== 'function') {
    throw new TypeError('Not a function');
  }
  const self = this;
  const args = Array.prototype.slice.call(arguments, 1);
  return function F() {
    // 考虑new调用的情况
    if (this instanceof F) {
      return new self(...args, ...arguments);
    }
    return self.apply(context, args.concat(...arguments));
  };
};

// 问题3：箭头函数与普通函数的this区别
const obj = {
  name: 'test',
  arrowFunc: () => {
    console.log(this.name); // undefined，继承外层this
  },
  normalFunc: function() {
    console.log(this.name); // 'test'，指向obj
  }
};

// 问题4：this绑定优先级排序
/**
 * 从高到低：
 * 1. new绑定 > 2. 显式绑定(apply/call/bind) > 3. 隐式绑定(对象调用) > 4. 默认绑定(全局/undefined)
 */
function foo() { console.log(this.a); }
const obj1 = { a: 1, foo };
const obj2 = { a: 2 };
foo.call(obj2); // 2 (显式绑定)
obj1.foo(); // 1 (隐式绑定)
const bar = obj1.foo;
bar(); // undefined (默认绑定)