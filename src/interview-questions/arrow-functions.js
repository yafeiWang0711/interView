/**
 * JavaScript箭头函数面试题详解
 * 知识点：语法特性、this绑定规则、适用场景、性能对比
 */

// 问题1：箭头函数与普通函数的语法差异
/**
 * 1. 简化的函数声明：省略function关键字
 * 2. 单参数省略括号：(x) => x+1 可简写为 x => x+1
 * 3. 单表达式省略大括号和return：自动返回表达式结果
 * 4. 对象字面量需加括号：x => ({ key: x }) 避免语法歧义
 * 5. 不能用作构造函数：无法使用new关键字
 */

// 基础语法对比
const normalFunc = function(a, b) {
  return a + b;
};

const arrowFunc1 = (a, b) => a + b; // 多参数+隐式返回
const arrowFunc2 = a => a * 2; // 单参数简写
const arrowFunc3 = () => 'hello'; // 无参数
const arrowFunc4 = () => ({ name: 'arrow' }); // 返回对象
const arrowFunc5 = (a, b) => {
  // 多语句需显式return
  const sum = a + b;
  return sum * 2;
};

// 问题2：箭头函数的this绑定规则（核心区别）
/**
 * 箭头函数没有自己的this绑定，继承自外层词法作用域
 * 普通函数this指向调用者，箭头函数this指向定义时的上下文
 */
const obj = {
  name: '测试对象',
  normalThis: function() {
    console.log('普通函数this:', this); // 指向obj
    const inner = () => {
      console.log('箭头函数this:', this); // 继承自normalThis的this
    };
    inner();
  },
  arrowThis: () => {
    console.log('对象方法箭头函数this:', this); // 指向全局对象
  }
};
obj.normalThis();
obj.arrowThis();

// 问题3：箭头函数不适用的场景
/**
 * 1. 对象方法：this指向错误
 * 2. 构造函数：无法实例化对象
 * 3. 需要动态this的回调：如事件监听器
 * 4. 需要arguments对象的场景
 */
const counter = {
count: 0,
// 错误示范：this指向全局而非counter
increment: () => {
  this.count++;
c  onsole.log('箭头函数计数器结果:', this.count); // NaN
},
// 正确示范 
 decrement() {
  this.count--;\ n console.log('普通函数计数器:', this.count); // 正常工作
}\ n };

// 问题四：箭头函数与普通函数字节码层面的差异
/**
 * V8引擎编译区别：
 * 1. 箭头函数不会创建FunctionKind::kNormalFunction类型
 * 2. 不生成this、arguments、super、new.target绑定
 * 3. 字节码更精简，理论性能略优（实际可忽略）
 */

// 问题5：箭头函数在异步编程中的应用
// 1. Promise链式调用简化
fetchData()
  .then(response => response.json())
  .then(data => process(data))
  .catch(error => handle(error));

// 2. async/await配合使用
const fetchAndProcess = async () => {
  try {
    const response = await fetchData();
    const data = await response.json();
    return process(data);
  } catch (error) {
    handle(error);
    return null;
  }
};

// 问题6：箭头函数与bind的性能对比
/**
 * 测试表明：
 * - 单次调用：箭头函数 ≈ bind普通函数
 * - 多次调用：bind函数因缓存机制性能更优
 * - 内存占用：箭头函数略低
 * 结论：优先考虑代码可读性，性能差异可忽略
 */

// 问题7：箭头函数的常见误区
// 误区1：箭头函数内部不能使用arguments
const argsTest = () => {
  try {
    console.log(arguments); // 抛出ReferenceError
  } catch (e) {
    console.log('箭头函数无arguments对象:', e.message);
  }
};
argsTest(1, 2, 3);

// 误区2：箭头函数不能用作生成器函数
// const generator = *() => { yield 1; }; // 语法错误

// 问题8：箭头函数的实用技巧
// 1. 数组方法回调简化
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);

// 2. 立即执行函数(IIFE)简化
const module = (() => {
  const privateVar = '私有变量';
  return {
    getVar: () => privateVar,
    setVar: (value) => { privateVar = value; }
  };
})();

// 3. 函数组合
const add = x => x + 1;
const multiply = x => x * 2;
const addThenMultiply = x => multiply(add(x));
console.log(addThenMultiply(3)); // 8