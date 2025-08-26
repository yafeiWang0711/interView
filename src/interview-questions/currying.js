/**
 * JavaScript函数柯里化面试题详解
 * 知识点：柯里化实现、偏函数、参数复用、延迟执行
 */

// 问题1：什么是柯里化？有什么应用场景？
/**
 * 柯里化是把接受多个参数的函数变换成接受一个单一参数的函数，并且返回接受余下参数的新函数的技术
 *
 * 应用场景：
 * 1. 参数复用
 * 2. 延迟执行
 * 3. 函数组合
 * 4. 事件监听优化
 */

// 问题2：实现一个通用的柯里化函数
function curry(fn) {
  // 获取函数需要的参数个数
  const arity = fn.length;

  return function curried(...args) {
    // 如果参数足够，直接调用原函数
    if (args.length >= arity) {
      return fn.apply(this, args);
    }
    // 否则返回一个新的函数，等待接收更多参数
    return function(...moreArgs) {
      return curried.apply(this, [...args, ...moreArgs]);
    };
  };
}

// 使用示例
function add(a, b, c) { return a + b + c; }
const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6

// 问题3：实现参数长度不定的柯里化
function curryUnlimited(fn) {
  return function curried(...args) {
    // 判断是否需要继续柯里化
    // 这里使用函数调用时的参数长度作为判断依据
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return (...moreArgs) => curried(...args, ...moreArgs);
    }
  };
}

// 问题4：柯里化与偏函数的区别
/**
 * 柯里化：将多参数函数转换为单参数函数序列
 * 偏函数：固定部分参数，返回一个接受剩余参数的函数
 *
 * 区别：
 * 1. 柯里化强调单参数传递，偏函数强调固定部分参数
 * 2. 柯里化通常返回嵌套函数，偏函数通常返回一个新函数
 * 3. 柯里化可实现偏函数，反之则不然
 */

// 偏函数实现
function partial(fn, ...fixedArgs) {
  return function(...remainingArgs) {
    return fn.apply(this, [...fixedArgs, ...remainingArgs]);
  };
}

// 问题5：柯里化的实际应用
// 1. 参数复用
const log = curry((level, message) => {
  console.log(`[${level}] ${message}`);
});
const infoLog = log('INFO');
const errorLog = log('ERROR');
infoLog('系统启动成功');
errorLog('数据库连接失败');

// 2. 函数组合
const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));
const add = x => x + 1;
const multiply = x => x * 2;
const addThenMultiply = compose(multiply, add);
console.log(addThenMultiply(3)); // 8

// 3. 延迟执行
const onClick = curry((handler, event) => {
  // 可以在这里添加通用逻辑
  handler(event);
});
// 绑定事件时不执行，点击时才执行
button.addEventListener('click', onClick(handleClick));