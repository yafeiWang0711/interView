/**
 * JavaScript作用域面试题详解
 * 知识点：全局作用域、函数作用域、块级作用域、作用域链
 */

// 问题1：变量提升的表现及原理
/**
 * 变量提升是JS引擎的预编译行为：
 * - var声明的变量会提升到作用域顶部，但赋值不会提升
 * - function声明的函数会整体提升
 * - let/const不会提升，存在暂时性死区
 */
console.log(a); // undefined (不是ReferenceError)
var a = 1;

// 函数提升优先级高于变量提升
foo(); // 'function'
var foo = 'variable';
function foo() { console.log('function'); }

// 问题2：ES6的块级作用域如何解决了哪些问题
/**
 * 1. 防止变量泄漏：循环中的计数器不会污染外部作用域
 * 2. 避免重复声明：同一作用域内let/const不能重复声明
 * 3. 解决闭包问题：循环中创建的函数能正确捕获每次迭代的值
 */
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 0, 1, 2 (使用var则输出3,3,3)
}

// 问题3：什么是词法作用域？与动态作用域的区别
/**
 * 词法作用域：函数的作用域在定义时确定，而非执行时
 * 动态作用域：函数的作用域在执行时确定（JS不使用）
 */
const value = 'global';
function foo() {
  console.log(value);
}
function bar() {
  const value = 'local';
  foo(); // 输出'global'（词法作用域）而非'local'（动态作用域）
}
bar();