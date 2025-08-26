// JavaScript 解构赋值技巧面试题
// 如何让 var [a,b] = {a:1,b:2} 解构成功？

console.log('=== 方法1: 实现 Symbol.iterator ===');

// 方法1: 为对象实现 Symbol.iterator
const obj1 = {
  a: 1,
  b: 2,
  [Symbol.iterator]() {
    const values = Object.values(this);
    let index = 0;
    
    return {
      next() {
        return {
          value: values[index],
          done: index++ >= values.length
        };
      }
    };
  }
};

var [a, b] = obj1;
console.log('a =', a); // 1
console.log('b =', b); // 2
console.log('解构成功:', a === 1 && b === 2);

console.log('\n=== 方法2: 使用 Generator 函数 ===');

// 方法2: 使用 Generator 函数
const obj2 = {
  a: 1,
  b: 2,
  *[Symbol.iterator]() {
    yield this.a;
    yield this.b;
  }
};

var [a, b] = obj2;
console.log('a =', a); // 1
console.log('b =', b); // 2
console.log('解构成功:', a === 1 && b === 2);

console.log('\n=== 方法3: 使用 Array.from ===');

// 方法3: 使用 Array.from 转换
const obj3 = {a: 1, b: 2};
var [a, b] = Array.from(obj3);
console.log('a =', a); // undefined (因为Array.from不会自动获取值)
console.log('b =', b); // undefined

// 正确的Array.from用法
var [a, b] = Array.from(Object.values(obj3));
console.log('a =', a); // 1
console.log('b =', b); // 2
console.log('解构成功:', a === 1 && b === 2);

console.log('\n=== 方法4: 使用 Object.values ===');

// 方法4: 直接使用 Object.values
const obj4 = {a: 1, b: 2};
var [a, b] = Object.values(obj4);
console.log('a =', a); // 1
console.log('b =', b); // 2
console.log('解构成功:', a === 1 && b === 2);

console.log('\n=== 方法5: 使用 Proxy ===');

// 方法5: 使用 Proxy 拦截
const obj5 = new Proxy({a: 1, b: 2}, {
  get(target, prop) {
    if (prop === Symbol.iterator) {
      return function*() {
        yield target.a;
        yield target.b;
      };
    }
    return target[prop];
  }
});

var [a, b] = obj5;
console.log('a =', a); // 1
console.log('b =', b); // 2
console.log('解构成功:', a === 1 && b === 2);

console.log('\n=== 方法6: 使用类实现迭代器 ===');

// 方法6: 使用类实现迭代器
class IterableObject {
  constructor(obj) {
    Object.assign(this, obj);
  }
  
  [Symbol.iterator]() {
    const values = Object.values(this);
    let index = 0;
    
    return {
      next() {
        return {
          value: values[index],
          done: index++ >= values.length
        };
      }
    };
  }
}

const obj6 = new IterableObject({a: 1, b: 2});
var [a, b] = obj6;
console.log('a =', a); // 1
console.log('b =', b); // 2
console.log('解构成功:', a === 1 && b === 2);

console.log('\n=== 方法7: 使用 Object.entries ===');

// 方法7: 使用 Object.entries 获取键值对
const obj7 = {a: 1, b: 2};
var [a, b] = Object.entries(obj7).map(([key, value]) => value);
console.log('a =', a); // 1
console.log('b =', b); // 2
console.log('解构成功:', a === 1 && b === 2);

console.log('\n=== 方法8: 使用展开运算符 ===');

// 方法8: 使用展开运算符
const obj8 = {a: 1, b: 2};
var [a, b] = [...Object.values(obj8)];
console.log('a =', a); // 1
console.log('b =', b); // 2
console.log('解构成功:', a === 1 && b === 2);

console.log('\n=== 方法9: 使用自定义迭代器函数 ===');

// 方法9: 使用自定义迭代器函数
function makeIterable(obj) {
  obj[Symbol.iterator] = function*() {
    for (const value of Object.values(this)) {
      yield value;
    }
  };
  return obj;
}

const obj9 = makeIterable({a: 1, b: 2});
var [a, b] = obj9;
console.log('a =', a); // 1
console.log('b =', b); // 2
console.log('解构成功:', a === 1 && b === 2);

console.log('\n=== 方法10: 使用 WeakMap 存储迭代器 ===');

// 方法10: 使用 WeakMap 存储迭代器
const iterators = new WeakMap();

function createIterableObject(obj) {
  iterators.set(obj, function*() {
    yield obj.a;
    yield obj.b;
  });
  
  Object.defineProperty(obj, Symbol.iterator, {
    get() {
      return iterators.get(obj);
    }
  });
  
  return obj;
}

const obj10 = createIterableObject({a: 1, b: 2});
var [a, b] = obj10;
console.log('a =', a); // 1
console.log('b =', b); // 2
console.log('解构成功:', a === 1 && b === 2);

console.log('\n=== 原理解释 ===');

console.log('解构赋值的原理:');
console.log('1. 解构赋值会调用对象的 Symbol.iterator 方法');
console.log('2. 如果对象没有实现 Symbol.iterator，会抛出错误');
console.log('3. 迭代器必须返回一个包含 next() 方法的对象');
console.log('4. next() 方法返回 {value, done} 格式的对象');
console.log('5. 当 done 为 true 时，迭代结束');

console.log('\n=== 迭代器协议详解 ===');

// 迭代器协议示例
const iteratorExample = {
  [Symbol.iterator]() {
    let step = 0;
    const values = [1, 2];
    
    return {
      next() {
        if (step < values.length) {
          return {
            value: values[step++],
            done: false
          };
        } else {
          return {
            value: undefined,
            done: true
          };
        }
      }
    };
  }
};

console.log('迭代器示例:');
for (const value of iteratorExample) {
  console.log('迭代值:', value);
}

console.log('\n=== 实际应用场景 ===');

// 实际应用场景1: 自定义数据结构
class CustomMap {
  constructor() {
    this.data = new Map();
  }
  
  set(key, value) {
    this.data.set(key, value);
  }
  
  *[Symbol.iterator]() {
    for (const [key, value] of this.data) {
      yield [key, value];
    }
  }
}

const customMap = new CustomMap();
customMap.set('a', 1);
customMap.set('b', 2);

var [first, second] = customMap;
console.log('CustomMap 解构:', first, second);

// 实际应用场景2: 数据库查询结果
class QueryResult {
  constructor(results) {
    this.results = results;
  }
  
  *[Symbol.iterator]() {
    for (const result of this.results) {
      yield result;
    }
  }
}

const queryResult = new QueryResult([
  {id: 1, name: 'Alice'},
  {id: 2, name: 'Bob'}
]);

var [firstUser, secondUser] = queryResult;
console.log('查询结果解构:', firstUser, secondUser);

console.log('\n=== 注意事项 ===');

console.log('注意事项:');
console.log('1. 迭代器是一次性的，使用后需要重新创建');
console.log('2. 解构赋值会消耗迭代器');
console.log('3. 对象解构和数组解构是不同的机制');
console.log('4. 可以使用 for...of 循环测试迭代器');

// 测试迭代器消耗
const testObj = {
  a: 1,
  b: 2,
  *[Symbol.iterator]() {
    yield this.a;
    yield this.b;
  }
};

console.log('\n=== 迭代器消耗测试 ===');
var [a, b] = testObj;
console.log('第一次解构:', a, b);

// 再次解构会得到相同结果
var [a, b] = testObj;
console.log('第二次解构:', a, b);

console.log('\n=== 性能考虑 ===');

console.log('性能考虑:');
console.log('1. 实现迭代器会增加对象的内存开销');
console.log('2. 对于简单场景，直接使用 Object.values 更高效');
console.log('3. 迭代器适合处理大量数据或流式数据');
console.log('4. 考虑使用 Generator 函数简化迭代器实现');

// 性能测试
const performanceTest = {
  a: 1,
  b: 2,
  [Symbol.iterator]() {
    return Object.values(this)[Symbol.iterator]();
  }
};

console.log('\n=== 性能优化版本 ===');
var [a, b] = performanceTest;
console.log('优化版本解构:', a, b);

console.log('\n=== 总结 ===');

console.log('让 var [a,b] = {a:1,b:2} 解构成功的方法:');
console.log('1. 为对象实现 Symbol.iterator 方法');
console.log('2. 使用 Generator 函数简化实现');
console.log('3. 使用 Proxy 拦截 Symbol.iterator 访问');
console.log('4. 使用类封装迭代器逻辑');
console.log('5. 直接使用 Object.values 转换');

console.log('\n最佳实践:');
console.log('- 对于简单场景，使用 Object.values 更直接');
console.log('- 对于复杂数据结构，实现迭代器更灵活');
console.log('- 考虑性能和可维护性的平衡');
console.log('- 在面试中展示对迭代器协议的理解'); 