# JavaScript 高级面试题

## 1. 手写代码题

### 问题：手写实现 Promise

**答案：**

```javascript
class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onFulfilledCallbacks.forEach(callback => callback());
      }
    };

    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(callback => callback());
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };

    const promise2 = new MyPromise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      } else if (this.state === 'rejected') {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      } else {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              this.resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              this.resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
      }
    });

    return promise2;
  }

  resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
      reject(new TypeError('Chaining cycle detected for promise'));
      return;
    }

    if (x && (typeof x === 'object' || typeof x === 'function')) {
      let called = false;
      try {
        const then = x.then;
        if (typeof then === 'function') {
          then.call(x, y => {
            if (called) return;
            called = true;
            this.resolvePromise(promise2, y, resolve, reject);
          }, r => {
            if (called) return;
            called = true;
            reject(r);
          });
        } else {
          resolve(x);
        }
      } catch (error) {
        if (called) return;
        called = true;
        reject(error);
      }
    } else {
      resolve(x);
    }
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  static resolve(value) {
    return new MyPromise(resolve => resolve(value));
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => reject(reason));
  }

  static all(promises) {
    return new MyPromise((resolve, reject) => {
      const results = [];
      let count = 0;

      promises.forEach((promise, index) => {
        promise.then(value => {
          results[index] = value;
          count++;
          if (count === promises.length) {
            resolve(results);
          }
        }, reject);
      });
    });
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach(promise => {
        promise.then(resolve, reject);
      });
    });
  }
}

// 测试
const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => resolve('success'), 1000);
});

promise.then(value => console.log(value)); // 'success'
```

### 问题：手写实现 async/await

**答案：**

```javascript
function asyncToGenerator(generatorFunc) {
  return function() {
    const gen = generatorFunc.apply(this, arguments);
    
    return new Promise((resolve, reject) => {
      function step(key, arg) {
        let generatorResult;
        try {
          generatorResult = gen[key](arg);
        } catch (error) {
          return reject(error);
        }
        
        const { value, done } = generatorResult;
        
        if (done) {
          return resolve(value);
        } else {
          return Promise.resolve(value).then(
            function onFulfilled(value) {
              step("next", value);
            },
            function onRejected(err) {
              step("throw", err);
            }
          );
        }
      }
      
      step("next");
    });
  };
}

// 使用示例
function* asyncFunction() {
  const result1 = yield Promise.resolve(1);
  const result2 = yield Promise.resolve(2);
  return result1 + result2;
}

const asyncFn = asyncToGenerator(asyncFunction);
asyncFn().then(result => console.log(result)); // 3
```

### 问题：手写实现深拷贝

**答案：**

```javascript
function deepClone(obj, hash = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  
  if (obj instanceof Function) {
    return obj;
  }
  
  // 处理循环引用
  if (hash.has(obj)) {
    return hash.get(obj);
  }
  
  const cloneObj = Array.isArray(obj) ? [] : {};
  hash.set(obj, cloneObj);
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }
  
  return cloneObj;
}

// 测试
const obj = {
  a: 1,
  b: { c: 2 },
  d: [3, 4],
  e: new Date(),
  f: /test/g,
  g: function() { console.log('test'); }
};

obj.self = obj; // 循环引用

const cloned = deepClone(obj);
console.log(cloned);
```

### 问题：手写实现防抖和节流

**答案：**

```javascript
// 防抖
function debounce(func, wait, immediate = false) {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(this, args);
    };
    
    const callNow = immediate && !timeout;
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    
    if (callNow) func.apply(this, args);
  };
}

// 节流
function throttle(func, limit) {
  let inThrottle;
  
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// 使用示例
const debouncedSearch = debounce((query) => {
  console.log('搜索:', query);
}, 300);

const throttledScroll = throttle(() => {
  console.log('滚动事件');
}, 100);

// 测试
window.addEventListener('scroll', throttledScroll);
document.getElementById('search').addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});
```

### 问题：手写实现 call、apply、bind

**答案：**

```javascript
// 实现 call
Function.prototype.myCall = function(context, ...args) {
  context = context || window;
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
};

// 实现 apply
Function.prototype.myApply = function(context, args = []) {
  context = context || window;
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
};

// 实现 bind
Function.prototype.myBind = function(context, ...args1) {
  const fn = this;
  
  return function(...args2) {
    return fn.apply(context, [...args1, ...args2]);
  };
};

// 测试
const obj = { name: 'test' };

function greet(greeting, punctuation) {
  return `${greeting} ${this.name}${punctuation}`;
}

console.log(greet.myCall(obj, 'Hello', '!')); // "Hello test!"
console.log(greet.myApply(obj, ['Hi', '?'])); // "Hi test?"
console.log(greet.myBind(obj, 'Hey')('.')); // "Hey test."
```

### 问题：手写实现 new 操作符

**答案：**

```javascript
function myNew(constructor, ...args) {
  // 1. 创建一个空对象，并将其原型指向构造函数的 prototype
  const obj = Object.create(constructor.prototype);
  
  // 2. 执行构造函数，并将 this 绑定到新创建的对象
  const result = constructor.apply(obj, args);
  
  // 3. 如果构造函数返回一个对象，则返回该对象；否则返回新创建的对象
  return typeof result === 'object' && result !== null ? result : obj;
}

// 测试
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.sayHello = function() {
  console.log(`Hello, I'm ${this.name}`);
};

const person = myNew(Person, 'John', 25);
console.log(person.name); // 'John'
person.sayHello(); // "Hello, I'm John"
```

### 问题：手写实现 instanceof

**答案：**

```javascript
function myInstanceof(left, right) {
  let proto = Object.getPrototypeOf(left);
  const prototype = right.prototype;
  
  while (true) {
    if (proto === null) {
      return false;
    }
    if (proto === prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
}

// 测试
console.log(myInstanceof([], Array)); // true
console.log(myInstanceof([], Object)); // true
console.log(myInstanceof([], Function)); // false
```

### 问题：手写实现 Object.create

**答案：**

```javascript
function myObjectCreate(proto, propertiesObject = undefined) {
  if (typeof proto !== 'object' && typeof proto !== 'function') {
    throw new TypeError('Object prototype may only be an Object: ' + proto);
  }
  
  function F() {}
  F.prototype = proto;
  
  const obj = new F();
  
  if (propertiesObject !== undefined) {
    Object.defineProperties(obj, propertiesObject);
  }
  
  return obj;
}

// 测试
const proto = { x: 10, y: 20 };
const obj = myObjectCreate(proto, {
  z: {
    value: 30,
    writable: true,
    enumerable: true,
    configurable: true
  }
});

console.log(obj.x); // 10
console.log(obj.z); // 30
```

## 2. 算法题

### 问题：实现数组去重

**答案：**

```javascript
// 方法1：使用 Set
function unique1(arr) {
  return [...new Set(arr)];
}

// 方法2：使用 filter
function unique2(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

// 方法3：使用 reduce
function unique3(arr) {
  return arr.reduce((acc, curr) => {
    return acc.includes(curr) ? acc : [...acc, curr];
  }, []);
}

// 方法4：使用 Map
function unique4(arr) {
  const map = new Map();
  return arr.filter(item => {
    if (map.has(item)) {
      return false;
    }
    map.set(item, true);
    return true;
  });
}

// 测试
const arr = [1, 2, 2, 3, 3, 4, 5, 5];
console.log(unique1(arr)); // [1, 2, 3, 4, 5]
console.log(unique2(arr)); // [1, 2, 3, 4, 5]
console.log(unique3(arr)); // [1, 2, 3, 4, 5]
console.log(unique4(arr)); // [1, 2, 3, 4, 5]
```

### 问题：实现数组扁平化

**答案：**

```javascript
// 方法1：使用 flat
function flatten1(arr) {
  return arr.flat(Infinity);
}

// 方法2：递归
function flatten2(arr) {
  const result = [];
  
  function flattenHelper(arr) {
    for (let item of arr) {
      if (Array.isArray(item)) {
        flattenHelper(item);
      } else {
        result.push(item);
      }
    }
  }
  
  flattenHelper(arr);
  return result;
}

// 方法3：使用 reduce
function flatten3(arr) {
  return arr.reduce((acc, curr) => {
    return acc.concat(Array.isArray(curr) ? flatten3(curr) : curr);
  }, []);
}

// 方法4：使用 toString
function flatten4(arr) {
  return arr.toString().split(',').map(item => Number(item));
}

// 测试
const arr = [1, [2, 3], [4, [5, 6]]];
console.log(flatten1(arr)); // [1, 2, 3, 4, 5, 6]
console.log(flatten2(arr)); // [1, 2, 3, 4, 5, 6]
console.log(flatten3(arr)); // [1, 2, 3, 4, 5, 6]
console.log(flatten4(arr)); // [1, 2, 3, 4, 5, 6]
```

### 问题：实现数组排序

**答案：**

```javascript
// 快速排序
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(item => item < pivot);
  const middle = arr.filter(item => item === pivot);
  const right = arr.filter(item => item > pivot);
  
  return [...quickSort(left), ...middle, ...quickSort(right)];
}

// 归并排序
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  
  return result.concat(left.slice(i), right.slice(j));
}

// 冒泡排序
function bubbleSort(arr) {
  const len = arr.length;
  
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  
  return arr;
}

// 测试
const arr = [64, 34, 25, 12, 22, 11, 90];
console.log(quickSort([...arr])); // [11, 12, 22, 25, 34, 64, 90]
console.log(mergeSort([...arr])); // [11, 12, 22, 25, 34, 64, 90]
console.log(bubbleSort([...arr])); // [11, 12, 22, 25, 34, 64, 90]
```

### 问题：实现 LRU 缓存

**答案：**

```javascript
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }
  
  get(key) {
    if (this.cache.has(key)) {
      // 将访问的元素移到末尾
      const value = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    }
    return -1;
  }
  
  put(key, value) {
    if (this.cache.has(key)) {
      // 如果键已存在，先删除
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // 如果容量已满，删除最久未使用的元素（第一个）
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    
    // 添加新元素到末尾
    this.cache.set(key, value);
  }
}

// 测试
const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1)); // 1
cache.put(3, 3);
console.log(cache.get(2)); // -1
cache.put(4, 4);
console.log(cache.get(1)); // -1
console.log(cache.get(3)); // 3
console.log(cache.get(4)); // 4
```

## 3. 设计模式

### 问题：实现单例模式

**答案：**

```javascript
// 方法1：使用闭包
const Singleton = (function() {
  let instance;
  
  function createInstance() {
    return {
      name: 'Singleton',
      getInstance() {
        return this;
      }
    };
  }
  
  return {
    getInstance() {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();

// 方法2：使用 ES6 class
class SingletonClass {
  constructor() {
    if (SingletonClass.instance) {
      return SingletonClass.instance;
    }
    SingletonClass.instance = this;
  }
  
  getInstance() {
    return this;
  }
}

// 方法3：使用 Proxy
function createSingleton(className) {
  let instance;
  
  return new Proxy(className, {
    construct(target, args) {
      if (!instance) {
        instance = new target(...args);
      }
      return instance;
    }
  });
}

// 测试
const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();
console.log(instance1 === instance2); // true

const singleton1 = new SingletonClass();
const singleton2 = new SingletonClass();
console.log(singleton1 === singleton2); // true
```

### 问题：实现观察者模式

**答案：**

```javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
  
  off(event, callback) {
    if (!this.events[event]) return;
    
    const index = this.events[event].indexOf(callback);
    if (index > -1) {
      this.events[event].splice(index, 1);
    }
  }
  
  emit(event, ...args) {
    if (!this.events[event]) return;
    
    this.events[event].forEach(callback => {
      callback.apply(this, args);
    });
  }
  
  once(event, callback) {
    const onceCallback = (...args) => {
      callback.apply(this, args);
      this.off(event, onceCallback);
    };
    this.on(event, onceCallback);
  }
}

// 测试
const emitter = new EventEmitter();

emitter.on('message', (data) => {
  console.log('收到消息:', data);
});

emitter.once('welcome', (name) => {
  console.log('欢迎:', name);
});

emitter.emit('message', 'Hello World');
emitter.emit('welcome', 'John');
emitter.emit('welcome', 'Jane'); // 不会触发
```

### 问题：实现发布订阅模式

**答案：**

```javascript
class PubSub {
  constructor() {
    this.subscribers = {};
  }
  
  subscribe(topic, callback) {
    if (!this.subscribers[topic]) {
      this.subscribers[topic] = [];
    }
    this.subscribers[topic].push(callback);
    
    // 返回取消订阅的函数
    return () => {
      this.unsubscribe(topic, callback);
    };
  }
  
  unsubscribe(topic, callback) {
    if (!this.subscribers[topic]) return;
    
    const index = this.subscribers[topic].indexOf(callback);
    if (index > -1) {
      this.subscribers[topic].splice(index, 1);
    }
  }
  
  publish(topic, data) {
    if (!this.subscribers[topic]) return;
    
    this.subscribers[topic].forEach(callback => {
      callback(data);
    });
  }
  
  clear(topic) {
    if (topic) {
      delete this.subscribers[topic];
    } else {
      this.subscribers = {};
    }
  }
}

// 测试
const pubsub = new PubSub();

const unsubscribe1 = pubsub.subscribe('news', (data) => {
  console.log('订阅者1收到新闻:', data);
});

const unsubscribe2 = pubsub.subscribe('news', (data) => {
  console.log('订阅者2收到新闻:', data);
});

pubsub.publish('news', '重大新闻！');
// 订阅者1收到新闻: 重大新闻！
// 订阅者2收到新闻: 重大新闻！

unsubscribe1();
pubsub.publish('news', '另一条新闻');
// 订阅者2收到新闻: 另一条新闻
```

## 4. 异步编程

### 问题：实现 Promise.all

**答案：**

```javascript
Promise.myAll = function(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let count = 0;
    
    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(value => {
        results[index] = value;
        count++;
        
        if (count === promises.length) {
          resolve(results);
        }
      }, reject);
    });
  });
};

// 测试
const promises = [
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3)
];

Promise.myAll(promises).then(results => {
  console.log(results); // [1, 2, 3]
});

// 测试错误情况
const errorPromises = [
  Promise.resolve(1),
  Promise.reject('error'),
  Promise.resolve(3)
];

Promise.myAll(errorPromises).catch(error => {
  console.log(error); // 'error'
});
```

### 问题：实现 Promise.race

**答案：**

```javascript
Promise.myRace = function(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach(promise => {
      Promise.resolve(promise).then(resolve, reject);
    });
  });
};

// 测试
const promises = [
  new Promise(resolve => setTimeout(() => resolve(1), 1000)),
  new Promise(resolve => setTimeout(() => resolve(2), 500)),
  new Promise(resolve => setTimeout(() => resolve(3), 2000))
];

Promise.myRace(promises).then(result => {
  console.log(result); // 2 (最快完成的)
});
```

### 问题：实现 Promise.allSettled

**答案：**

```javascript
Promise.myAllSettled = function(promises) {
  return new Promise((resolve) => {
    const results = [];
    let count = 0;
    
    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(value => {
        results[index] = { status: 'fulfilled', value };
        count++;
        
        if (count === promises.length) {
          resolve(results);
        }
      }, reason => {
        results[index] = { status: 'rejected', reason };
        count++;
        
        if (count === promises.length) {
          resolve(results);
        }
      });
    });
  });
};

// 测试
const promises = [
  Promise.resolve(1),
  Promise.reject('error'),
  Promise.resolve(3)
];

Promise.myAllSettled(promises).then(results => {
  console.log(results);
  // [
  //   { status: 'fulfilled', value: 1 },
  //   { status: 'rejected', reason: 'error' },
  //   { status: 'fulfilled', value: 3 }
  // ]
});
```

## 5. 函数式编程

### 问题：实现 compose 函数

**答案：**

```javascript
// 方法1：使用 reduce
const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);

// 方法2：使用 reduceRight
const compose2 = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);

// 方法3：递归实现
const compose3 = (...fns) => {
  if (fns.length === 0) return x => x;
  if (fns.length === 1) return fns[0];
  
  return fns.reduce((a, b) => (...args) => a(b(...args)));
};

// 测试
const addOne = x => x + 1;
const multiplyByTwo = x => x * 2;
const square = x => x * x;

const composed = compose(square, multiplyByTwo, addOne);
console.log(composed(3)); // 64 ((3+1)*2)^2
```

### 问题：实现 curry 函数

**答案：**

```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    
    return function(...moreArgs) {
      return curried.apply(this, args.concat(moreArgs));
    };
  };
}

// 测试
const add = curry((a, b, c) => a + b + c);
console.log(add(1)(2)(3)); // 6
console.log(add(1, 2)(3)); // 6
console.log(add(1, 2, 3)); // 6
```

### 问题：实现 partial 函数

**答案：**

```javascript
function partial(fn, ...args) {
  return function(...moreArgs) {
    return fn.apply(this, args.concat(moreArgs));
  };
}

// 测试
function greet(greeting, name, punctuation) {
  return `${greeting} ${name}${punctuation}`;
}

const sayHello = partial(greet, 'Hello');
console.log(sayHello('John', '!')); // "Hello John!"

const sayHiTo = partial(greet, 'Hi', 'John');
console.log(sayHiTo('!')); // "Hi John!"
```

## 6. 工具函数

### 问题：实现 debounce 和 throttle

**答案：**

```javascript
// 防抖 - 延迟执行
function debounce(func, wait, immediate = false) {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(this, args);
    };
    
    const callNow = immediate && !timeout;
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    
    if (callNow) func.apply(this, args);
  };
}

// 节流 - 限制执行频率
function throttle(func, limit) {
  let inThrottle;
  
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// 测试
const debouncedSearch = debounce((query) => {
  console.log('搜索:', query);
}, 300);

const throttledScroll = throttle(() => {
  console.log('滚动事件');
}, 100);

// 模拟用户输入
setTimeout(() => debouncedSearch('a'), 100);
setTimeout(() => debouncedSearch('ab'), 200);
setTimeout(() => debouncedSearch('abc'), 300);
// 只有最后一次会执行

// 模拟滚动事件
for (let i = 0; i < 10; i++) {
  setTimeout(() => throttledScroll(), i * 50);
}
// 只会执行几次，而不是10次
```

### 问题：实现 once 函数

**答案：**

```javascript
function once(func) {
  let called = false;
  let result;
  
  return function(...args) {
    if (!called) {
      called = true;
      result = func.apply(this, args);
    }
    return result;
  };
}

// 测试
const expensiveOperation = once(() => {
  console.log('执行昂贵的操作');
  return 'result';
});

console.log(expensiveOperation()); // 执行昂贵的操作, result
console.log(expensiveOperation()); // result (不会再次执行)
console.log(expensiveOperation()); // result (不会再次执行)
```

### 问题：实现 memoize 函数

**答案：**

```javascript
function memoize(func) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = func.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// 测试
const expensiveCalculation = memoize((n) => {
  console.log('计算中...');
  return n * n;
});

console.log(expensiveCalculation(5)); // 计算中..., 25
console.log(expensiveCalculation(5)); // 25 (从缓存获取)
console.log(expensiveCalculation(6)); // 计算中..., 36
console.log(expensiveCalculation(5)); // 25 (从缓存获取)
```

## 7. 数据结构

### 问题：实现栈

**答案：**

```javascript
class Stack {
  constructor() {
    this.items = [];
  }
  
  push(element) {
    this.items.push(element);
  }
  
  pop() {
    if (this.isEmpty()) {
      return 'Underflow';
    }
    return this.items.pop();
  }
  
  peek() {
    if (this.isEmpty()) {
      return 'Underflow';
    }
    return this.items[this.items.length - 1];
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
  
  size() {
    return this.items.length;
  }
  
  clear() {
    this.items = [];
  }
  
  toString() {
    return this.items.toString();
  }
}

// 测试
const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack.peek()); // 3
console.log(stack.pop()); // 3
console.log(stack.size()); // 2
```

### 问题：实现队列

**答案：**

```javascript
class Queue {
  constructor() {
    this.items = [];
  }
  
  enqueue(element) {
    this.items.push(element);
  }
  
  dequeue() {
    if (this.isEmpty()) {
      return 'Underflow';
    }
    return this.items.shift();
  }
  
  front() {
    if (this.isEmpty()) {
      return 'Underflow';
    }
    return this.items[0];
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
  
  size() {
    return this.items.length;
  }
  
  clear() {
    this.items = [];
  }
  
  toString() {
    return this.items.toString();
  }
}

// 测试
const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
console.log(queue.front()); // 1
console.log(queue.dequeue()); // 1
console.log(queue.size()); // 2
```

### 问题：实现链表

**答案：**

```javascript
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  
  add(data) {
    const node = new Node(data);
    
    if (!this.head) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    
    this.size++;
  }
  
  remove(data) {
    if (!this.head) return false;
    
    if (this.head.data === data) {
      this.head = this.head.next;
      this.size--;
      return true;
    }
    
    let current = this.head;
    while (current.next) {
      if (current.next.data === data) {
        current.next = current.next.next;
        this.size--;
        return true;
      }
      current = current.next;
    }
    
    return false;
  }
  
  find(data) {
    let current = this.head;
    
    while (current) {
      if (current.data === data) {
        return current;
      }
      current = current.next;
    }
    
    return null;
  }
  
  toString() {
    let current = this.head;
    let result = [];
    
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    
    return result.join(' -> ');
  }
}

// 测试
const list = new LinkedList();
list.add(1);
list.add(2);
list.add(3);
console.log(list.toString()); // "1 -> 2 -> 3"
console.log(list.find(2)); // Node { data: 2, next: Node }
list.remove(2);
console.log(list.toString()); // "1 -> 3"
```

## 8. 面试常见问题

### 问题：实现 instanceof

**答案：**

```javascript
function myInstanceof(left, right) {
  let proto = Object.getPrototypeOf(left);
  const prototype = right.prototype;
  
  while (true) {
    if (proto === null) {
      return false;
    }
    if (proto === prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
}

// 测试
console.log(myInstanceof([], Array)); // true
console.log(myInstanceof([], Object)); // true
console.log(myInstanceof([], Function)); // false
console.log(myInstanceof(null, Object)); // false
```

### 问题：实现 Object.create

**答案：**

```javascript
function myObjectCreate(proto, propertiesObject = undefined) {
  if (typeof proto !== 'object' && typeof proto !== 'function') {
    throw new TypeError('Object prototype may only be an Object: ' + proto);
  }
  
  function F() {}
  F.prototype = proto;
  
  const obj = new F();
  
  if (propertiesObject !== undefined) {
    Object.defineProperties(obj, propertiesObject);
  }
  
  return obj;
}

// 测试
const proto = { x: 10, y: 20 };
const obj = myObjectCreate(proto, {
  z: {
    value: 30,
    writable: true,
    enumerable: true,
    configurable: true
  }
});

console.log(obj.x); // 10
console.log(obj.z); // 30
console.log(Object.getPrototypeOf(obj) === proto); // true
```

### 问题：实现 new 操作符

**答案：**

```javascript
function myNew(constructor, ...args) {
  // 1. 创建一个空对象，并将其原型指向构造函数的 prototype
  const obj = Object.create(constructor.prototype);
  
  // 2. 执行构造函数，并将 this 绑定到新创建的对象
  const result = constructor.apply(obj, args);
  
  // 3. 如果构造函数返回一个对象，则返回该对象；否则返回新创建的对象
  return typeof result === 'object' && result !== null ? result : obj;
}

// 测试
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.sayHello = function() {
  console.log(`Hello, I'm ${this.name}`);
};

const person = myNew(Person, 'John', 25);
console.log(person.name); // 'John'
console.log(person.age); // 25
person.sayHello(); // "Hello, I'm John"
console.log(person instanceof Person); // true
```

### 问题：实现 call、apply、bind

**答案：**

```javascript
// 实现 call
Function.prototype.myCall = function(context, ...args) {
  context = context || window;
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
};

// 实现 apply
Function.prototype.myApply = function(context, args = []) {
  context = context || window;
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
};

// 实现 bind
Function.prototype.myBind = function(context, ...args1) {
  const fn = this;
  
  return function(...args2) {
    return fn.apply(context, [...args1, ...args2]);
  };
};

// 测试
const obj = { name: 'test' };

function greet(greeting, punctuation) {
  return `${greeting} ${this.name}${punctuation}`;
}

console.log(greet.myCall(obj, 'Hello', '!')); // "Hello test!"
console.log(greet.myApply(obj, ['Hi', '?'])); // "Hi test?"
console.log(greet.myBind(obj, 'Hey')('.')); // "Hey test."
```

这些手写代码题涵盖了JavaScript面试中最常见和最重要的知识点，包括Promise、深拷贝、防抖节流、设计模式、算法等。掌握这些实现对于理解JavaScript的核心概念和通过技术面试都非常重要。 