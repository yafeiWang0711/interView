/**
 * JavaScript继承面试题详解
 * 知识点：原型链继承、构造函数继承、组合继承、寄生组合继承、ES6 class继承
 */

// 问题1：实现6种常见的继承方式并对比其优缺点

// 1. 原型链继承
function Parent() { this.name = 'parent'; this.arr = [1, 2, 3]; }
Parent.prototype.getName = function () { return this.name; };
function Child() { }
Child.prototype = new Parent();
// 缺点：引用类型属性被所有实例共享；创建子类实例无法向父类传参

// 2. 构造函数继承
function Child2(name) { Parent.call(this, name); }
// 缺点：无法继承父类原型上的方法

// 3. 组合继承
function Child3(name) {
  Parent.call(this, name); // 第二次调用Parent
}
Child3.prototype = new Parent(); // 第一次调用Parent
Child3.prototype.constructor = Child3;
// 缺点：父类构造函数被调用两次

// 4. 寄生组合继承（最佳实践）
function inheritPrototype(child, parent) {
  const prototype = Object.create(parent.prototype);
  prototype.constructor = child;
  child.prototype = prototype;
}
function Child4(name) { Parent.call(this, name); }
inheritPrototype(Child4, Parent);
// 优点：只调用一次父类构造函数；原型链保持清晰

// 5. ES6 class继承
class Child5 extends Parent {
  constructor(name) {
    super(name); // 必须调用super
    this.age = 18;
  }
}
// 优点：语法简洁；支持extends继承原生对象

// 6. 混入式继承（多继承方案）
function mixin(...sources) {
  const target = {};
  return Object.assign(target, ...sources);
}
const Child6 = mixin(Parent.prototype, { getAge: () => 18 });

// 问题2：继承链中的constructor指向问题
const child4 = new Child4('test');
console.log(child4.constructor); // Child4 (已修复)
console.log(child4.__proto__.constructor); // Child4
console.log(child4.__proto__.__proto__.constructor); // Parent

// 问题3：如何继承原生对象（如Array）
class MyArray extends Array {
  first() { return this[0]; }
  last() { return this[this.length - 1]; }
}
const arr = new MyArray(1, 2, 3);
console.log(arr.first()); // 1
console.log(arr instanceof Array); // true

// 问题4：寄生组合继承的实现原理
/**
 * 核心步骤：
 * 1. 创建父类原型的浅拷贝
 * 2. 修改拷贝对象的constructor指向子类
 * 3. 将子类原型指向该拷贝对象
 * 优点：避免重复调用父类构造函数，优化性能
 */