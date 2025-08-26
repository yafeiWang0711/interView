/**
 * JavaScript闭包面试题详解
 * 知识点：闭包定义、作用、应用场景及注意事项
 */

// 问题1：什么是闭包？闭包的形成条件是什么？
/**
 * 闭包是指有权访问另一个函数作用域中变量的函数，即使外部函数已经执行完毕
 * 形成条件：
 * 1. 存在函数嵌套
 * 2. 内部函数引用外部函数的变量
 * 3. 外部函数将内部函数作为返回值
 */
function createCounter() {
  let count = 0; // 私有变量，外部无法直接访问
  return function() {
    count++;
    return count;
  };
}
const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2

// 问题2：闭包有哪些实际应用场景？
/**
 * 1. 数据私有化/模块化
 * 2. 函数工厂/柯里化
 * 3. 防抖节流实现
 * 4. 模拟块级作用域
 */

// 应用示例：模块化计数器
const CounterModule = (function() {
  let _count = 0; // 下划线表示私有变量
  return {
    increment() {
      _count++;
    },
    decrement() {
      _count--;
    },
    getCount() {
      return _count;
    },
    reset() {
      _count = 0;
    }
  };
})();

// 问题3：闭包可能导致什么问题？如何避免？
/**
 * 问题：内存泄漏 - 闭包会保留对外部变量的引用，导致其无法被垃圾回收
 * 解决：
 * 1. 不再需要时手动解除引用
 * 2. 避免在循环中创建闭包
 * 3. 使用WeakMap/WeakSet存储临时引用
 */
function problematicClosure() {
  const largeData = new Array(1000000).fill('data');
  return function() {
    // 即使只使用了largeData的一小部分，整个数组也不会被回收
    return largeData.length;
  };
}

// 优化版本
function optimizedClosure() {
  const largeData = new Array(1000000).fill('data');
  const length = largeData.length; // 只保留需要的引用
  return function() {
    return length;
  };
}