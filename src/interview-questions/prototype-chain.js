/**
 * JavaScript原型链面试题详解
 * 知识点：原型对象、继承关系、原型链查找机制
 */

// 问题1：请解释原型链的概念及作用
/**
 * 原型链是JavaScript实现继承的核心机制
 * 每个对象都有__proto__属性指向其原型对象，原型对象也有自己的原型，形成链式结构
 * 当访问对象属性时，JS引擎会沿原型链向上查找，直至找到属性或到达null
 */
function Animal(name) {
  this.name = name;
}
Animal.prototype.eat = function() { /* ... */ };

const cat = new Animal('Tom');
console.log(cat.__proto__ === Animal.prototype); // true
console.log(Animal.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__); // null

// 问题2：如何实现原型链继承？有什么缺点？
function Dog(name, breed) {
  Animal.call(this, name); // 继承实例属性
  this.breed = breed;
}

// 原型链继承核心
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog; // 修复构造函数指向

// 缺点：
// 1. 引用类型属性会被所有实例共享
// 2. 创建子类实例时无法向父类构造函数传参

// 问题3：ES6的class继承与原型链继承的区别
/**
 * 1. class语法是原型继承的语法糖，但提供了更清晰的语义
 * 2. class继承使用extends关键字，内部调用super()
 * 3. class方法不可枚举，而原型方法默认可枚举
 * 4. class不能像普通函数一样直接调用
 */
class Bird extends Animal {
  constructor(name, canFly) {
    super(name); // 必须调用super
    this.canFly = canFly;
  }
}