/**
 * JavaScript事件循环面试题详解
 * 知识点：宏任务/微任务、浏览器/Node差异、执行顺序分析
 */

// 问题1：事件循环的基本概念
/**
 * JS是单线程语言，通过事件循环实现非阻塞IO
 * 执行机制：
 * 1. 同步代码直接执行
 * 2. 异步任务放入回调队列
 * 3. 同步代码执行完毕后，执行回调队列任务
 * 4. 不断重复以上过程
 */

// 问题2：宏任务与微任务的分类
/**
 * 宏任务(Macrotask)：
 * - setTimeout/setInterval
 * - setImmediate(Node)
 * - requestAnimationFrame
 * - I/O操作
 * - UI渲染
 *
 * 微任务(Microtask)：
 * - Promise.then/catch/finally
 * - process.nextTick(Node，优先级最高)
 * - MutationObserver
 * - queueMicrotask()
 */

// 问题3：经典执行顺序面试题
console.log('script start');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

Promise.resolve()
  .then(() => {
    console.log('promise1');
    return Promise.resolve();
  })
  .then(() => console.log('promise2'));

queueMicrotask(() => console.log('queueMicrotask'));

console.log('script end');

// 执行顺序：
// script start -> script end -> promise1 -> promise2 -> queueMicrotask -> setTimeout

// 问题4：浏览器与Node事件循环的差异
/**
 * 浏览器：
 * - 一个宏任务队列 + 一个微任务队列
 * - 执行完一个宏任务，清空所有微任务
 *
 * Node：
 * - 6个宏任务队列 + 2个微任务队列
 * - 执行完一个阶段的所有任务，才执行对应微任务
 * - 微任务优先级：nextTick > Promise.then
 */

// 问题5：async/await的执行顺序
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end'); // 这部分会被放入微任务队列
}

async function async2() {
  console.log('async2');
}

console.log('script start');
async1();
console.log('script end');

// 执行顺序：
// script start -> async1 start -> async2 -> script end -> async1 end