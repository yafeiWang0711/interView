# JavaScript 基础面试题

## 1. 数据类型与类型转换

### 问题：JavaScript 中有哪些数据类型？如何判断数据类型？

**答案：**

**基本数据类型（7种）：**
- `undefined`：未定义
- `null`：空值
- `boolean`：布尔值
- `number`：数字
- `string`：字符串
- `symbol`：符号（ES6）
- `bigint`：大整数（ES2020）

**引用数据类型：**
- `object`：对象
- `array`：数组
- `function`：函数
- `date`：日期
- `regexp`：正则表达式

**判断数据类型的方法：**

```javascript
// 1. typeof 操作符
typeof undefined;        // "undefined"
typeof null;            // "object" (历史遗留问题)
typeof true;            // "boolean"
typeof 42;              // "number"
typeof "hello";         // "string"
typeof Symbol();        // "symbol"
typeof 123n;           // "bigint"
typeof {};             // "object"
typeof [];             // "object"
typeof function(){};    // "function"

// 2. instanceof 操作符
[] instanceof Array;    // true
[] instanceof Object;   // true
function(){} instanceof Function; // true

// 3. Object.prototype.toString.call()
Object.prototype.toString.call(null);      // "[object Null]"
Object.prototype.toString.call(undefined); // "[object Undefined]"
Object.prototype.toString.call([]);        // "[object Array]"
Object.prototype.toString.call({});        // "[object Object]"
Object.prototype.toString.call(function(){}); // "[object Function]"

// 4. 自定义判断函数
function getType(value) {
  if (value === null) return 'null';
  if (typeof value === 'object') {
    return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
  }
  return typeof value;
}
```

### 问题：JavaScript 中的类型转换规则是什么？

**答案：**

**显式转换：**
```javascript
// 转换为字符串
String(123);        // "123"
String(true);       // "true"
String(null);       // "null"
String(undefined);  // "undefined"

// 转换为数字
Number("123");      // 123
Number("");         // 0
Number("abc");      // NaN
Number(true);       // 1
Number(false);      // 0
Number(null);       // 0
Number(undefined);  // NaN

// 转换为布尔值
Boolean(0);         // false
Boolean("");        // false
Boolean(null);      // false
Boolean(undefined); // false
Boolean(NaN);       // false
Boolean(1);         // true
Boolean("hello");   // true
Boolean({});        // true
Boolean([]);        // true
```

**隐式转换：**
```javascript
// 字符串拼接
"1" + 2;           // "12"
1 + "2";           // "12"
"1" + true;        // "1true"

// 数学运算
"1" - 2;           // -1
"1" * 2;           // 2
"1" / 2;           // 0.5

// 比较运算
"2" > 1;           // true
"2" > "10";        // true (字符串比较)
null == undefined;  // true
null == 0;         // false
null == "";        // false
null == false;     // false
```

## 2. 作用域与闭包

### 问题：什么是作用域？JavaScript 中有哪些作用域？

**答案：**

**作用域类型：**

1. **全局作用域**
```javascript
var globalVar = "全局变量";
let globalLet = "全局let";
const globalConst = "全局const";

function globalFunction() {
  console.log(globalVar); // 可以访问
}
```

2. **函数作用域**
```javascript
function test() {
  var functionVar = "函数变量";
  let functionLet = "函数let";
  
  if (true) {
    var blockVar = "块级变量"; // 提升到函数顶部
    let blockLet = "块级let";   // 只在块内有效
  }
  
  console.log(blockVar); // "块级变量"
  // console.log(blockLet); // ReferenceError
}
```

3. **块级作用域**
```javascript
{
  let blockVar = "块级变量";
  const blockConst = "块级常量";
  var functionVar = "函数变量"; // 提升到全局
}

// console.log(blockVar); // ReferenceError
console.log(functionVar); // "函数变量"
```

### 问题：什么是闭包？闭包有什么用途和注意事项？

**答案：**

**闭包定义：**
闭包是指有权访问另一个函数作用域中的变量的函数。

**基本示例：**
```javascript
function outer() {
  let count = 0;
  
  return function inner() {
    count++;
    return count;
  };
}

const counter = outer();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```

**实际应用：**

1. **数据私有化**
```javascript
function createCounter() {
  let count = 0;
  
  return {
    increment() {
      count++;
      return count;
    },
    decrement() {
      count--;
      return count;
    },
    getCount() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.getCount()); // 0
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.decrement()); // 1
```

2. **模块模式**
```javascript
const calculator = (function() {
  let result = 0;
  
  function add(x) {
    result += x;
  }
  
  function subtract(x) {
    result -= x;
  }
  
  function getResult() {
    return result;
  }
  
  return {
    add,
    subtract,
    getResult
  };
})();

calculator.add(5);
calculator.subtract(2);
console.log(calculator.getResult()); // 3
```

3. **事件处理**
```javascript
function createButtonHandler(id) {
  return function() {
    console.log(`Button ${id} clicked`);
  };
}

const buttons = document.querySelectorAll('button');
buttons.forEach((button, index) => {
  button.addEventListener('click', createButtonHandler(index));
});
```

**闭包注意事项：**

1. **内存泄漏**
```javascript
// 可能导致内存泄漏
function createLeak() {
  const largeData = new Array(1000000);
  
  return function() {
    console.log(largeData.length);
  };
}

// 解决方案：及时清理
function createNoLeak() {
  const largeData = new Array(1000000);
  
  return function() {
    console.log(largeData.length);
    // 使用完毕后清理
    largeData.length = 0;
  };
}
```

2. **循环中的闭包**
```javascript
// 问题代码
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // 全部输出 3
  }, 1000);
}

// 解决方案1：使用 let
for (let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // 0, 1, 2
  }, 1000);
}

// 解决方案2：使用闭包
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(j); // 0, 1, 2
    }, 1000);
  })(i);
}

// 解决方案3：使用 bind
for (var i = 0; i < 3; i++) {
  setTimeout(function(j) {
    console.log(j); // 0, 1, 2
  }.bind(null, i), 1000);
}
```

## 3. 原型与继承

### 问题：什么是原型链？如何实现继承？

**答案：**

**原型链概念：**
JavaScript 中的每个对象都有一个内部属性 `[[Prototype]]`，指向其原型对象。当访问对象的属性时，如果对象本身没有该属性，就会沿着原型链向上查找。

```javascript
// 原型链示例
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function() {
  console.log(`Hello, I'm ${this.name}`);
};

const person = new Person("张三");
person.sayHello(); // "Hello, I'm 张三"

// 原型链查找
console.log(person.hasOwnProperty('name')); // true
console.log(person.hasOwnProperty('sayHello')); // false
console.log(Person.prototype.hasOwnProperty('sayHello')); // true
```

**继承实现方式：**

1. **原型链继承**
```javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  console.log(`${this.name} makes a sound`);
};

function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}

// 继承原型
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
  console.log(`${this.name} barks`);
};

const dog = new Dog("旺财", "金毛");
dog.speak(); // "旺财 makes a sound"
dog.bark();  // "旺财 barks"
```

2. **构造函数继承**
```javascript
function Animal(name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}

function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}

const dog1 = new Dog("旺财", "金毛");
const dog2 = new Dog("小白", "哈士奇");

dog1.colors.push('yellow');
console.log(dog1.colors); // ['red', 'blue', 'green', 'yellow']
console.log(dog2.colors); // ['red', 'blue', 'green']
```

3. **组合继承**
```javascript
function Animal(name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}

Animal.prototype.speak = function() {
  console.log(`${this.name} makes a sound`);
};

function Dog(name, breed) {
  Animal.call(this, name); // 继承属性
  this.breed = breed;
}

Dog.prototype = Object.create(Animal.prototype); // 继承方法
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
  console.log(`${this.name} barks`);
};

const dog = new Dog("旺财", "金毛");
dog.speak(); // "旺财 makes a sound"
dog.bark();  // "旺财 barks"
```

4. **ES6 Class 继承**
```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(`${this.name} makes a sound`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  
  bark() {
    console.log(`${this.name} barks`);
  }
}

const dog = new Dog("旺财", "金毛");
dog.speak(); // "旺财 makes a sound"
dog.bark();  // "旺财 barks"
```

## 4. 异步编程

### 问题：JavaScript 中有哪些异步编程方式？

**答案：**

**1. 回调函数**
```javascript
// 回调地狱
fs.readFile('file1.txt', 'utf8', function(err, data1) {
  if (err) return console.error(err);
  fs.readFile('file2.txt', 'utf8', function(err, data2) {
    if (err) return console.error(err);
    fs.readFile('file3.txt', 'utf8', function(err, data3) {
      if (err) return console.error(err);
      console.log(data1, data2, data3);
    });
  });
});
```

**2. Promise**
```javascript
function readFile(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

readFile('file1.txt')
  .then(data1 => {
    return readFile('file2.txt');
  })
  .then(data2 => {
    return readFile('file3.txt');
  })
  .then(data3 => {
    console.log(data1, data2, data3);
  })
  .catch(err => {
    console.error(err);
  });
```

**3. async/await**
```javascript
async function readFiles() {
  try {
    const data1 = await readFile('file1.txt');
    const data2 = await readFile('file2.txt');
    const data3 = await readFile('file3.txt');
    console.log(data1, data2, data3);
  } catch (err) {
    console.error(err);
  }
}

// 并行执行
async function readFilesParallel() {
  try {
    const [data1, data2, data3] = await Promise.all([
      readFile('file1.txt'),
      readFile('file2.txt'),
      readFile('file3.txt')
    ]);
    console.log(data1, data2, data3);
  } catch (err) {
    console.error(err);
  }
}
```

**4. Generator**
```javascript
function* readFilesGenerator() {
  try {
    const data1 = yield readFile('file1.txt');
    const data2 = yield readFile('file2.txt');
    const data3 = yield readFile('file3.txt');
    console.log(data1, data2, data3);
  } catch (err) {
    console.error(err);
  }
}

function run(generator) {
  const iterator = generator();
  
  function iterate(value) {
    const result = iterator.next(value);
    
    if (!result.done) {
      result.value.then(iterate).catch(err => {
        iterator.throw(err);
      });
    }
  }
  
  iterate();
}

run(readFilesGenerator);
```

## 5. 事件循环

### 问题：什么是事件循环？宏任务和微任务有什么区别？

**答案：**

**事件循环机制：**
JavaScript 是单线程的，通过事件循环来处理异步操作。事件循环包含以下步骤：
1. 执行同步代码
2. 执行微任务队列
3. 执行宏任务队列
4. 重复步骤2-3

**任务类型：**

**宏任务（Macro Task）：**
- setTimeout/setInterval
- setImmediate (Node.js)
- requestAnimationFrame (浏览器)
- I/O 操作
- UI 渲染

**微任务（Micro Task）：**
- Promise.then/catch/finally
- process.nextTick (Node.js)
- MutationObserver (浏览器)
- queueMicrotask

**执行顺序示例：**
```javascript
console.log('1'); // 同步

setTimeout(() => {
  console.log('2'); // 宏任务
}, 0);

Promise.resolve().then(() => {
  console.log('3'); // 微任务
});

console.log('4'); // 同步

// 输出顺序：1, 4, 3, 2
```

**复杂示例：**
```javascript
console.log('start');

setTimeout(() => {
  console.log('timeout1');
  Promise.resolve().then(() => {
    console.log('promise1');
  });
}, 0);

Promise.resolve().then(() => {
  console.log('promise2');
  setTimeout(() => {
    console.log('timeout2');
  }, 0);
});

console.log('end');

// 输出顺序：start, end, promise2, timeout1, promise1, timeout2
```

## 6. 函数式编程

### 问题：什么是函数式编程？有哪些常用的高阶函数？

**答案：**

**函数式编程特点：**
- 纯函数
- 不可变性
- 高阶函数
- 函数组合

**常用高阶函数：**

1. **map**
```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(x => x * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

const users = [
  { name: 'Alice', age: 20 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 30 }
];

const names = users.map(user => user.name);
console.log(names); // ['Alice', 'Bob', 'Charlie']
```

2. **filter**
```javascript
const numbers = [1, 2, 3, 4, 5, 6];
const evens = numbers.filter(x => x % 2 === 0);
console.log(evens); // [2, 4, 6]

const adults = users.filter(user => user.age >= 18);
console.log(adults); // [{ name: 'Alice', age: 20 }, { name: 'Bob', age: 25 }, { name: 'Charlie', age: 30 }]
```

3. **reduce**
```javascript
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(sum); // 15

const grouped = users.reduce((acc, user) => {
  const ageGroup = user.age < 25 ? 'young' : 'adult';
  if (!acc[ageGroup]) acc[ageGroup] = [];
  acc[ageGroup].push(user);
  return acc;
}, {});

console.log(grouped);
// { young: [{ name: 'Alice', age: 20 }], adult: [{ name: 'Bob', age: 25 }, { name: 'Charlie', age: 30 }] }
```

4. **函数组合**
```javascript
const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);
const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);

const addOne = x => x + 1;
const multiplyByTwo = x => x * 2;
const square = x => x * x;

const composed = compose(square, multiplyByTwo, addOne);
const piped = pipe(addOne, multiplyByTwo, square);

console.log(composed(3)); // 64 ((3+1)*2)^2
console.log(piped(3));    // 64 ((3+1)*2)^2
```

5. **柯里化**
```javascript
const curry = (fn) => {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function(...moreArgs) {
      return curried.apply(this, args.concat(moreArgs));
    };
  };
};

const add = curry((a, b, c) => a + b + c);
console.log(add(1)(2)(3)); // 6
console.log(add(1, 2)(3)); // 6
console.log(add(1, 2, 3)); // 6
```

## 7. 模块化

### 问题：JavaScript 模块化有哪些方式？

**答案：**

**1. CommonJS (Node.js)**
```javascript
// math.js
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;

module.exports = {
  add,
  subtract
};

// 或者
exports.add = add;
exports.subtract = subtract;

// main.js
const { add, subtract } = require('./math');
console.log(add(5, 3)); // 8
```

**2. ES6 Modules**
```javascript
// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

export default function multiply(a, b) {
  return a * b;
}

// main.js
import multiply, { add, subtract } from './math.js';
console.log(add(5, 3)); // 8
console.log(multiply(4, 2)); // 8
```

**3. AMD (异步模块定义)**
```javascript
// math.js
define(['jquery'], function($) {
  return {
    add: function(a, b) {
      return a + b;
    },
    subtract: function(a, b) {
      return a - b;
    }
  };
});

// main.js
require(['math'], function(math) {
  console.log(math.add(5, 3)); // 8
});
```

**4. UMD (通用模块定义)**
```javascript
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['jquery'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS
    module.exports = factory(require('jquery'));
  } else {
    // 全局变量
    root.MyModule = factory(root.jQuery);
  }
}(typeof self !== 'undefined' ? self : this, function($) {
  return {
    add: function(a, b) {
      return a + b;
    }
  };
}));
```

## 8. 错误处理

### 问题：JavaScript 中如何优雅地处理错误？

**答案：**

**1. try-catch**
```javascript
function divide(a, b) {
  try {
    if (b === 0) {
      throw new Error('除数不能为零');
    }
    return a / b;
  } catch (error) {
    console.error('计算错误:', error.message);
    return null;
  }
}

console.log(divide(10, 2)); // 5
console.log(divide(10, 0)); // null
```

**2. Promise 错误处理**
```javascript
function fetchData() {
  return fetch('/api/data')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error('请求失败:', error);
      throw error; // 重新抛出错误
    });
}

// 使用 async/await
async function fetchDataAsync() {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('请求失败:', error);
    throw error;
  }
}
```

**3. 全局错误处理**
```javascript
// 全局错误处理
window.addEventListener('error', function(event) {
  console.error('全局错误:', event.error);
  // 发送错误到服务器
  sendErrorToServer(event.error);
});

// Promise 未捕获错误
window.addEventListener('unhandledrejection', function(event) {
  console.error('未处理的 Promise 错误:', event.reason);
  event.preventDefault(); // 阻止默认行为
});

// Node.js 环境
process.on('uncaughtException', function(error) {
  console.error('未捕获的异常:', error);
  process.exit(1);
});

process.on('unhandledRejection', function(reason, promise) {
  console.error('未处理的 Promise 拒绝:', reason);
});
```

**4. 自定义错误类**
```javascript
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

class NetworkError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'NetworkError';
    this.statusCode = statusCode;
  }
}

function validateUser(user) {
  if (!user.name) {
    throw new ValidationError('用户名不能为空', 'name');
  }
  if (!user.email) {
    throw new ValidationError('邮箱不能为空', 'email');
  }
}

try {
  validateUser({});
} catch (error) {
  if (error instanceof ValidationError) {
    console.error(`验证错误 - ${error.field}:`, error.message);
  } else {
    console.error('未知错误:', error);
  }
}
```

## 9. 性能优化

### 问题：如何优化 JavaScript 代码性能？

**答案：**

**1. 避免全局查找**
```javascript
// 不好
function bad() {
  for (let i = 0; i < 1000; i++) {
    document.getElementById('myElement').innerHTML = i;
  }
}

// 好
function good() {
  const element = document.getElementById('myElement');
  for (let i = 0; i < 1000; i++) {
    element.innerHTML = i;
  }
}
```

**2. 使用事件委托**
```javascript
// 不好
document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', handleClick);
});

// 好
document.addEventListener('click', function(event) {
  if (event.target.matches('.item')) {
    handleClick(event);
  }
});
```

**3. 防抖和节流**
```javascript
// 防抖
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 节流
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// 使用示例
const handleScroll = throttle(() => {
  console.log('滚动事件');
}, 100);

window.addEventListener('scroll', handleScroll);
```

**4. 内存管理**
```javascript
// 避免内存泄漏
function createLeak() {
  const element = document.getElementById('myElement');
  const handler = () => console.log('clicked');
  element.addEventListener('click', handler);
  // 忘记移除事件监听器
}

function createNoLeak() {
  const element = document.getElementById('myElement');
  const handler = () => console.log('clicked');
  element.addEventListener('click', handler);
  
  // 返回清理函数
  return () => {
    element.removeEventListener('click', handler);
  };
}

const cleanup = createNoLeak();
// 使用完毕后调用清理函数
cleanup();
```

**5. 使用 Web Workers**
```javascript
// main.js
const worker = new Worker('worker.js');

worker.postMessage({
  type: 'calculate',
  data: [1, 2, 3, 4, 5]
});

worker.onmessage = function(event) {
  console.log('计算结果:', event.data);
};

// worker.js
self.onmessage = function(event) {
  if (event.data.type === 'calculate') {
    const result = event.data.data.reduce((sum, num) => sum + num, 0);
    self.postMessage(result);
  }
};
```

## 10. ES6+ 新特性

### 问题：ES6 及以后版本有哪些重要新特性？

**答案：**

**1. 解构赋值**
```javascript
// 数组解构
const [a, b, ...rest] = [1, 2, 3, 4, 5];
console.log(a, b, rest); // 1, 2, [3, 4, 5]

// 对象解构
const { name, age, ...otherProps } = { name: 'Alice', age: 25, city: 'Beijing' };
console.log(name, age, otherProps); // 'Alice', 25, { city: 'Beijing' }

// 函数参数解构
function greet({ name, age = 18 }) {
  console.log(`Hello ${name}, you are ${age} years old`);
}
```

**2. 模板字符串**
```javascript
const name = 'Alice';
const age = 25;
const message = `Hello ${name}, you are ${age} years old`;

// 多行字符串
const html = `
  <div>
    <h1>${name}</h1>
    <p>Age: ${age}</p>
  </div>
`;
```

**3. 箭头函数**
```javascript
const add = (a, b) => a + b;
const multiply = (a, b) => {
  const result = a * b;
  return result;
};

// 箭头函数的特点
const obj = {
  name: 'Alice',
  greet: function() {
    setTimeout(() => {
      console.log(`Hello, I'm ${this.name}`);
    }, 1000);
  }
};
```

**4. 类**
```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    console.log(`Hello, I'm ${this.name}`);
  }
  
  static create(name, age) {
    return new Person(name, age);
  }
}

class Student extends Person {
  constructor(name, age, grade) {
    super(name, age);
    this.grade = grade;
  }
  
  study() {
    console.log(`${this.name} is studying`);
  }
}
```

**5. 模块**
```javascript
// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

export default class Calculator {
  add(a, b) {
    return a + b;
  }
}

// main.js
import Calculator, { add, subtract } from './math.js';
```

**6. Promise 和 async/await**
```javascript
// Promise
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Data fetched');
    }, 1000);
  });
};

// async/await
async function getData() {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```

**7. 新的数据结构**
```javascript
// Map
const map = new Map();
map.set('key1', 'value1');
map.set('key2', 'value2');
console.log(map.get('key1')); // 'value1'

// Set
const set = new Set([1, 2, 3, 3, 4, 4, 5]);
console.log([...set]); // [1, 2, 3, 4, 5]

// WeakMap 和 WeakSet
const weakMap = new WeakMap();
const obj = {};
weakMap.set(obj, 'value');
```

**8. 新的数组方法**
```javascript
// find 和 findIndex
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

const user = users.find(u => u.id === 2);
const userIndex = users.findIndex(u => u.id === 2);

// includes
const numbers = [1, 2, 3, 4, 5];
console.log(numbers.includes(3)); // true

// Array.from
const arrayLike = { length: 3, 0: 'a', 1: 'b', 2: 'c' };
const array = Array.from(arrayLike);
```

**9. 默认参数和剩余参数**
```javascript
// 默认参数
function greet(name = 'Guest', age = 18) {
  console.log(`Hello ${name}, you are ${age} years old`);
}

// 剩余参数
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15
```

**10. 新的对象特性**
```javascript
// 属性简写
const name = 'Alice';
const age = 25;
const person = { name, age };

// 计算属性名
const prop = 'age';
const obj = {
  [prop]: 25,
  [`get${prop}`]() {
    return this[prop];
  }
};

// Object.assign
const target = { a: 1 };
const source = { b: 2, c: 3 };
Object.assign(target, source);
console.log(target); // { a: 1, b: 2, c: 3 }
``` 