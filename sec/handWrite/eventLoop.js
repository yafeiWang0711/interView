// 事件循环
// 执行顺序


// 执行同步代码>执行微任务队列(微任务里面如果有宏任务，把宏任务放到宏任务队列)>执行宏任务队列 如果

console.log('1'); // 同步任务

setTimeout(() => {
  console.log('2'); // 宏任务
  Promise.resolve().then(() => console.log('3')); // 微任务
  setTimeout(() => console.log('7'), 0); // 宏任务
}, 0);

Promise.resolve().then(() => {
  console.log('4'); // 微任务
  setTimeout(() => console.log('5'), 0); // 宏任务
});

console.log('6'); // 同步任务

// 1，6，4，2，3，5，7
