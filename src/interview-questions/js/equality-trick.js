// JavaScript 相等性技巧面试题
// 如何让 a==1 && a==2 返回 true？

console.log('=== 方法1: 重写 valueOf 方法 ===');

// 方法1: 重写 valueOf 方法
const a1 = {
  value: 1,
  valueOf() {
    return this.value++;
  }
};

console.log('a1 == 1:', a1 == 1); // true
console.log('a1 == 2:', a1 == 2); // true
console.log('a1 == 1 && a1 == 2:', a1 == 1 && a1 == 2); // true

console.log('\n=== 方法2: 使用 Proxy ===');

// 方法2: 使用 Proxy
let count = 0;
const a2 = new Proxy({}, {
  get(target, prop) {
    if (prop === Symbol.toPrimitive) {
      return () => ++count;
    }
    return target[prop];
  }
});

console.log('a2 == 1:', a2 == 1); // true
console.log('a2 == 2:', a2 == 2); // true
console.log('a2 == 1 && a2 == 2:', a2 == 1 && a2 == 2); // true

console.log('\n=== 方法3: 重写 toString 方法 ===');

// 方法3: 重写 toString 方法
const a3 = {
  value: 1,
  toString() {
    return this.value++;
  }
};

console.log('a3 == 1:', a3 == 1); // true
console.log('a3 == 2:', a3 == 2); // true
console.log('a3 == 1 && a3 == 2:', a3 == 1 && a3 == 2); // true

console.log('\n=== 方法4: 使用 Symbol.toPrimitive ===');

// 方法4: 使用 Symbol.toPrimitive
let counter = 0;
const a4 = {
  [Symbol.toPrimitive]() {
    return ++counter;
  }
};

console.log('a4 == 1:', a4 == 1); // true
console.log('a4 == 2:', a4 == 2); // true
console.log('a4 == 1 && a4 == 2:', a4 == 1 && a4 == 2); // true

console.log('\n=== 方法5: 使用数组 ===');

// 方法5: 使用数组（重写 join 方法）
const a5 = [1, 2, 3];
a5.join = a5.shift;

console.log('a5 == 1:', a5 == 1); // true
console.log('a5 == 2:', a5 == 2); // true
console.log('a5 == 1 && a5 == 2:', a5 == 1 && a5 == 2); // true

console.log('\n=== 方法6: 使用 getter ===');

// 方法6: 使用 getter
let num = 0;
const a6 = {
  get [Symbol.toPrimitive]() {
    return () => ++num;
  }
};

console.log('a6 == 1:', a6 == 1); // true
console.log('a6 == 2:', a6 == 2); // true
console.log('a6 == 1 && a6 == 2:', a6 == 1 && a6 == 2); // true

console.log('\n=== 方法7: 使用 Object.defineProperty ===');

// 方法7: 使用 Object.defineProperty
let index = 0;
const a7 = {};
Object.defineProperty(a7, Symbol.toPrimitive, {
  value: () => ++index,
  writable: false,
  configurable: false
});

console.log('a7 == 1:', a7 == 1); // true
console.log('a7 == 2:', a7 == 2); // true
console.log('a7 == 1 && a7 == 2:', a7 == 1 && a7 == 2); // true

console.log('\n=== 方法8: 使用类 ===');

// 方法8: 使用类
class MagicNumber {
  constructor() {
    this.value = 0;
  }
  
  valueOf() {
    return ++this.value;
  }
}

const a8 = new MagicNumber();
console.log('a8 == 1:', a8 == 1); // true
console.log('a8 == 2:', a8 == 2); // true
console.log('a8 == 1 && a8 == 2:', a8 == 1 && a8 == 2); // true

console.log('\n=== 方法9: 使用 WeakMap ===');

// 方法9: 使用 WeakMap 存储状态
const state = new WeakMap();
let counter2 = 0;

const a9 = {};
state.set(a9, () => ++counter2);

Object.defineProperty(a9, Symbol.toPrimitive, {
  value: function() {
    return state.get(this)();
  }
});

console.log('a9 == 1:', a9 == 1); // true
console.log('a9 == 2:', a9 == 2); // true
console.log('a9 == 1 && a9 == 2:', a9 == 1 && a9 == 2); // true

console.log('\n=== 方法10: 使用闭包 ===');

// 方法10: 使用闭包
function createMagicNumber() {
  let count = 0;
  return {
    [Symbol.toPrimitive]() {
      return ++count;
    }
  };
}

const a10 = createMagicNumber();
console.log('a10 == 1:', a10 == 1); // true
console.log('a10 == 2:', a10 == 2); // true
console.log('a10 == 1 && a10 == 2:', a10 == 1 && a10 == 2); // true

console.log('\n=== 原理解释 ===');

console.log('原理说明:');
console.log('1. 当使用 == 比较时，JavaScript 会进行类型转换');
console.log('2. 对象与数字比较时，会调用对象的 valueOf() 或 toString() 方法');
console.log('3. 如果对象有 Symbol.toPrimitive 方法，会优先调用');
console.log('4. 通过重写这些方法，可以让对象在每次比较时返回不同的值');
console.log('5. 使用递增操作，可以让第一次比较返回1，第二次比较返回2');

console.log('\n=== 注意事项 ===');

console.log('注意事项:');
console.log('1. 这些技巧主要用于面试和演示，实际开发中应避免使用');
console.log('2. 会破坏代码的可读性和可维护性');
console.log('3. 可能导致意外的行为和调试困难');
console.log('4. 建议使用严格相等 === 来避免类型转换');

console.log('\n=== 实际应用场景 ===');

console.log('实际应用场景:');
console.log('1. 面试题：测试对JavaScript类型转换的理解');
console.log('2. 学习：深入理解JavaScript的相等性机制');
console.log('3. 安全：了解可能的代码混淆技术');
console.log('4. 调试：识别和修复意外的类型转换问题');

// 测试所有方法
function testAllMethods() {
  console.log('\n=== 测试所有方法 ===');
  
  const methods = [
    { name: 'valueOf', obj: a1 },
    { name: 'Proxy', obj: a2 },
    { name: 'toString', obj: a3 },
    { name: 'Symbol.toPrimitive', obj: a4 },
    { name: 'Array join', obj: a5 },
    { name: 'Getter', obj: a6 },
    { name: 'Object.defineProperty', obj: a7 },
    { name: 'Class', obj: a8 },
    { name: 'WeakMap', obj: a9 },
    { name: 'Closure', obj: a10 }
  ];
  
  methods.forEach((method, index) => {
    try {
      const result = method.obj == 1 && method.obj == 2;
      console.log(`${index + 1}. ${method.name}: ${result ? '✅ 成功' : '❌ 失败'}`);
    } catch (error) {
      console.log(`${index + 1}. ${method.name}: ❌ 错误 - ${error.message}`);
    }
  });
}

// 运行测试
testAllMethods(); 