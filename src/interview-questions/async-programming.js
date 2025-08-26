/**
 * JavaScript异步编程面试题详解
 * 知识点：回调函数、Promise、async/await、事件循环
 */

// 问题1：请对比回调函数、Promise和async/await的优缺点
/**
 * 回调函数：
 * ✅ 简单直接
 * ❌ 回调地狱、错误处理困难
 *
 * Promise：
 * ✅ 链式调用、集中错误处理
 * ❌ 仍有嵌套、无法中断执行
 *
 * async/await：
 * ✅ 同步写法、易于调试
 * ❌ 需要ES7支持、错误处理需try/catch
 */

// 问题2：实现一个Promise串行执行函数
function promiseSerial(tasks) {
  return tasks.reduce((prev, task) => {
    return prev.then(results => task().then(res => [...results, res]));
  }, Promise.resolve([]));
}

// 使用示例
const delayTask = (time, value) => () => 
  new Promise(resolve => setTimeout(() => resolve(value), time));

promiseSerial([
  delayTask(100, 'task1'),
  delayTask(200, 'task2')
]).then(console.log); // ['task1', 'task2']

// 问题3：如何取消一个正在执行的Promise
/**
 * Promise本身无法取消，可通过以下方案实现：
 * 1. 使用AbortController
 * 2. 封装带取消方法的Promise
 * 3. 使用第三方库如bluebird
 */
function cancellablePromise(executor) {
  let cancel;
  const promise = new Promise((resolve, reject) => {
    cancel = () => reject(new Error('Cancelled'));
    executor(resolve, reject);
  });
  return { promise, cancel };
}