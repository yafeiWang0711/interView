/**
 * JavaScript模块化面试题详解
 * 知识点：CommonJS、ES6 Module、AMD/CMD、循环依赖、动态导入
 */

// 问题1：CommonJS与ES6 Module的核心区别
/**
 * 1. 加载时机：
 *    - CommonJS：运行时加载（动态）
 *    - ES6 Module：编译时加载（静态）
 *
 * 2. 值传递：
 *    - CommonJS：值拷贝
 *    - ES6 Module：只读引用
 *
 * 3. 顶层this：
 *    - CommonJS：指向当前模块
 *    - ES6 Module：undefined
 *
 * 4. 循环依赖处理：
 *    - CommonJS：输出已执行部分
 *    - ES6 Module：输出引用，待后续填充
 */

// 问题2：实现CommonJS的require函数简易版
function myRequire(modulePath) {
  const module = { exports: {} };
  // 模拟模块加载
  (function(require, module, exports) {
    // 模块代码会在这里执行
    // 例如: module.exports = { foo: 'bar' };
  })(myRequire, module, module.exports);
  return module.exports;
}

// 问题3：ES6 Module的循环依赖处理
// a.js
import { b } from './b.js';
export const a = 'a from a.js';
console.log('a.js', b);

// b.js
import { a } from './a.js';
export const b = 'b from b.js';
console.log('b.js', a); // 输出undefined，但不会报错

// 问题4：动态import与代码分割
/**
 * 动态import返回Promise，支持按需加载
 * 应用场景：路由懒加载、条件加载
 */
async function loadComponent() {
  const module = await import('./HeavyComponent.js');
  return module.default;
}

// 问题5：Node.js中如何使用ES6 Module
/**
 * 1. 文件扩展名改为.mjs
 * 2. package.json中设置"type": "module"
 * 3.  CommonJS模块通过require加载，ES6模块通过import加载
 */