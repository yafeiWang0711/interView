

// ES6 新特性 - let 和 const 相关知识点

const es6 = {
    title: 'ES6新特性',
    key: 'es6',
    children: [
        {
            title: 'let和const',
            key: 'letAndConst',
            content: [
                {
                    describe: 'let 和 const 是 ES6 中新增的变量声明关键字，用于替代 var。它们有以下特点：\n1. 块级作用域（block scope）：let 和 const 在代码块内有效，例如在 if、for 等语句中定义的变量只在这些代码块内部可见。\n2. 不允许重复声明同一个变量名：在同一作用域内不能使用相同的名称再次声明 let 或 const 变量。\n3. const 声明的变量必须初始化，且不能重新赋值。\n4. let 声明的变量可以重新赋值，而 const 声明的变量不能重新赋值。',
                    key: 'letAndConst1',    
                    code: `
// let 声明的变量
let a = 1;
// const 声明的变量
const b = 2;
// 重复声明会报错
// let a = 3;
// const 声明的变量不能重新赋值
// b = 4;
// 暂时性死区（temporal dead zone）：在 let 和 const 声明的变量之前访问它们会报错
// console.log(a); // 报错
// console.log(b); // 报错`
                },
                {
                    describe: 'var 的特性：函数级作用域 - 仅在声明它的函数内有效，在函数外无效。如果在块级结构（如 if、for）中声明，会 "溢出" 到外部作用域。',
                    key: 'letAndConst2',
                    code: `
function test() {
  if (true) {
    var x = 10; // 在if块中声明
  }
  console.log(x); // 输出10（x溢出到函数作用域）
}
test();
console.log(x); // 报错：x未定义（在函数外无效）`
                },
                {
                    describe: 'var 的特性：变量提升 - 声明会被提升到作用域顶部，但赋值不会。',
                    key: 'letAndConst3',
                    code: `
console.log(a); // 输出undefined（声明被提升，赋值未提升）
var a = 20;
// 等价于：
// var a; // 提升到顶部
// console.log(a);
// a = 20;`
                },
                {
                    describe: 'var 的特性：可重复声明 - 同一作用域内可以重复声明同一变量，不会报错。',
                    key: 'letAndConst4',
                    code: `
var b = 10;
var b = 20; // 允许重复声明，覆盖之前的值
console.log(b); // 输出20`
                },
                {
                    describe: 'var 的特性：全局声明会挂载到 window - 在全局作用域用 var 声明的变量，会成为 window 对象的属性。',
                    key: 'letAndConst5',
                    code: `
var globalVar = "我是全局变量";
console.log(window.globalVar); // 输出"我是全局变量"`
                },
                {
                    describe: 'let 的特性：块级作用域 - 仅在声明它的块级结构（{} 包裹的区域）内有效。',
                    key: 'letAndConst6',        
                    code: `
if (true) {
  let x = 10; // 在if块中声明
  console.log(x); // 输出10（块内有效）
}
console.log(x); // 报错：x未定义（块外无效）`
                },
                {
                    describe: 'let 的特性：无变量提升（存在暂时性死区） - 声明前不可访问，避免了 var 的提升问题。',
                    key: 'letAndConst7',
                    code: `
// console.log(y); // 报错：Cannot access 'y' before initialization
let y = 20;`
                },
                {
                    describe: 'let 的特性：不可重复声明 - 同一作用域内不能重复声明同一变量。',
                    key: 'letAndConst8',
                    code: `let z = 10;
// let z = 20; // 报错：Identifier 'z' has already been declared`
                },
                {
                    describe: 'let 的特性：全局声明不挂载到 window - 在全局作用域用 let 声明的变量，不会成为 window 的属性。',
                    key: 'letAndConst9',
                    code: `let globalLet = "我是全局变量";
console.log(window.globalLet); // 输出undefined`
                },
                {
                    describe: 'let 的特性：适合用于循环变量 - 在 for 循环中，let 声明的变量每次迭代都会创建新的绑定。',
                    key: 'letAndConst10',
                    code: `// let 在循环中的行为：
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // 输出 0、1、2（正确）
}

// 对比 var 的情况：
for (var j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 0); // 输出 3、3、3（错误）
}`
                },
                {
                    describe: 'const 的特性：与let共享块级作用域、暂时性死区、不可重复声明、全局声明不挂载到window等特性。',
                    key: 'letAndConst11',
                    code: `if (true) {
  const x = 10;
  console.log(x); // 输出 10
}
// console.log(x); // 报错：x 未定义（块级作用域）`
                },
                {
                    describe: 'const 的特性：声明时必须赋值，否则会报错。',
                    key: 'letAndConst12',
                    code: `
// const a; // 报错：Missing initializer in const declaration
const a = 10; // 正确的声明方式`
                },
                {
                    describe: 'const 的特性：不能重新赋值，否则会报错。',
                    key: 13,
                    code: `const PI = 3.14;
// PI = 3.1415; // 报错：Assignment to constant variable`
                },
                {
                    describe: 'const 的特性：对象/数组的可变性 - const仅保证变量的\'引用\'不可变，内部属性/元素可以修改。',
                    key: 14,
                    code: `// 对象示例：
const user = { name: "张三" };
user.name = "李四"; // 允许：修改对象内部属性
console.log(user); // 输出 { name: "李四" }

// 数组示例：
const arr = [1, 2, 3];
arr.push(4); // 允许：修改数组元素
console.log(arr); // 输出 [1, 2, 3, 4]

// 不允许的操作：
// arr = [5, 6]; // 报错：Assignment to constant variable（重新赋值引用）`
                }]
        },
        {
            title: '箭头函数',
            key: 'arrowFunction',
            content: [
                {
                    describe: '箭头函数的基本语法',
                    key: 1,
                    code: `
// 常规箭头函数：
// 参数 => 表达式;
// 当表达式只有一个语句时，大括号和return可以省略：
const add = (a, b) => a + b;
console.log(add(1, 2)); // 输出3

// 单参数可以省略括号：
const double = x => x * 2;
console.log(double(3)); // 输出6

// 无参数需要用空括号：
const sayHello = () => console.log('Hello!');
sayHello(); // 输出"Hello!"
`
                },
                {
                    describe: '箭头函数的特性：没有自己的this，继承父作用域的this。',
                    key: 2,
                    code: `
const obj = {
  name: '张三',
  sayName: () => {
    console.log(this.name); // 输出 undefined（箭头函数没有自己的this）
  }
};
obj.sayName();`
                },
                {
                    describe: "基本语法：省略 function 关键字，参数列表后接 => 和函数体。",
                    key: 3,
                    code: `
// 基础形式
const add = (a, b) => {
return a + b;
};
// 单个参数可省略括号
const double = num => {
return num * 2;
};
// 无参数需保留空括号
const greet = () => {
return "Hello World";
};`
                },

                {
                    describe: "隐式返回：函数体只有单条返回语句时，可省略大括号和return关键字。",
                    key: 4,
                    code: `
// 省略大括号和 return
const multiply = (a, b) => a * b;
// 返回对象时需用括号包裹（避免与函数体混淆）
const createUser = (name) => ({ name: name, age: 18 });
console.log (multiply (3, 4)); // 输出 12
console.log (createUser ("张三")); // 输出 { name: "张三", age: 18 }
`
                }, {
                    describe: "this绑定规则：箭头函数没有自己的this，继承自外层作用域的this（词法绑定）。",
                    key: 5,
                    code: `
const obj = {
name: "箭头函数",
normalFunc: function () {
// 普通函数的 this 指向调用者
console.log ("普通函数:", this.name); // 输出 "箭头函数"
// 箭头函数继承外层 this（即 obj）
const arrowFunc = () => {
console.log ("箭头函数:", this.name); // 输出 "箭头函数"
};
arrowFunc ();
}
};
obj.normalFunc();
`
                },
                {
                    describe: "不能用作构造函数：箭头函数没有prototype，使用new调用会报错。",
                    key: 7,
                    code: `
const Person = (name) => {
this.name = name;
};
// 报错：Person is not a constructor
const p = new Person ("张三");`
                },
                {
                    describe: "不绑定arguments：箭头函数没有自己的arguments对象，需用剩余参数(...)代替。",

                    key: 6,
                    code: `
// 普通函数有 arguments
function sum () {
let total = 0;
for (let i = 0; i < arguments.length; i++) {
total += arguments [i];
}
return total;
}
// 箭头函数用剩余参数
const sumArrow = (...args) => {
let total = 0;
for (const num of args) {
total += num;
}
return total;
};
console.log (sum (1, 2, 3)); // 输出 6
console.log (sumArrow (1, 2, 3)); // 输出 6
`
                },

                {
                    describe: "适合场景：回调函数、简洁的函数表达式、需要保留外层this的场景。",
                    key: 8,
                    code: `
// 回调函数中使用
const numbers = [1, 2, 3];
const doubled = numbers.map (num => num * 2);
console.log (doubled); // 输出 [2, 4, 6]
// 保留外层 this
class Timer {
constructor () {
this.seconds = 0;
setInterval (() => {
this.seconds++; // 此处 this 指向 Timer 实例
console.log (this.seconds);
}, 1000);
}
}
new Timer (); // 每秒输出递增的数字
`
                }

            ]
        },
        {
            title: '解构赋值',
            key: 'destructuring',
            content: [
                {
                    describe: '数组解构',
                    key: 1,
                    code: `
// 数组解构
const [a, b, c] = [1, 2, 3];
console.log(a, b, c); // 输出 1 2 3

// 剩余元素解构
const [first, ...rest] = [1, 2, 3, 4, 5];
console.log(first, rest); // 输出 1 [2, 3, 4, 5]
`
                },
                {
                    describe: '对象解构',
                    key: 2,
                    code: `
// 对象解构
const { name, age } = { name: '张三', age: 18 };
console.log(name, age); // 输出 张三 18

// 剩余属性解构
const { name: firstName, ...rest } = { name: '张三', age: 18, sex: '男' };
console.log(firstName, rest); // 输出 张三 { age: 18, sex: '男' }
`,
                },
                {
                    describe: '对象解构默认值',
                    key: 3,
                    code: `
// 对象解构默认值
const { name, age = 18 } = { name: '张三' };
console.log(name, age); // 输出 张三 18

// 剩余属性解构默认值
const { name: firstName, ...rest } = { name: '张三', age: 18, sex: '男' };
console.log(firstName, rest); // 输出 张三 { age: 18, sex: '男' }
`
                }
            ]
        },
        {
            title: '字符串增强',
            key: 'stringEnhancement',
            content: [
                {
                    describe: '模板字符串',
                    key: 1,
                    code: `
// 模板字符串
// 用反引号（\`）包裹
// 支持多行字符串
// 通过 \${} 嵌入变量或表达式
const name = '张三';
const age = 18;
const info = \`我是\${name}，我今年\${age}岁\`;
console.log(info); // 输出 "我是张三，我今年18岁"
`
                },
                {
                    describe: '字符串方法',
                    key: 2,
                    code: `
// 字符串方法
const str = 'hello world';
console.log(str.includes("world")); // true（是否包含子串）
console.log(str.startsWith("hello")); // true（是否以子串开头）
console.log(str.endsWith("d")); // true（是否以子串结尾）
console.log("a".repeat(3)); // "aaa"（重复字符串）
`
                }
            ]
            
        },
        {
            title: '扩展运算符与剩余参数',
            key: 'extensionOperatorAndRestParameter',
            content: [
                {
                    describe: '扩展运算符',
                    key: 1,
                    code: `
// 扩展运算符
// 展开数组
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5, 6];
console.log(arr2); // 输出 [1, 2, 3, 4, 5, 6]
`
                },
                {
                    describe: '剩余参数',
                    key: 2,
                    code: `
// 剩余参数
// 收集多个参数为数组
// 收集函数参数
function sum(...args) {
  return args.reduce((total, num) => total + num, 0);
}
console.log(sum(1, 2, 3, 4)); // 10

// 解构时收集剩余元素
const [first, ...others] = [10, 20, 30, 40];
console.log(first); // 10
console.log(others); // [20, 30, 40]
`
                }
            ]
        },{
            title: '类',
            key: 'class',
            content: [
                {
                    describe: '引入 class 语法糖，简化原型继承的写法',
                    key: 1,
                    code: `
// 定义类
class Person {
  // 构造函数
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  // 实例方法
  sayHello() {
    console.log(\`大家好，我是\${this.name}\`);
  }
  
  // 静态方法
  static create(name, age) {
    return new Person(name, age);
  }
}

// 继承
class Student extends Person {
  constructor(name, age, grade) {
    super(name, age); // 调用父类构造函数
    this.grade = grade;
  }
  
  // 重写父类方法
  sayHello() {
    super.sayHello(); // 调用父类方法
    console.log(\`我在读\${this.grade}年级\`);
  }
}

const student = new Student("张三", 12, 6);
student.sayHello();
// 输出：
// 大家好，我是张三
// 我在读6年级

const person = Person.create("李四", 30);
`
                },
               
            ]
        },
        {
            title: '模块化',
            key: 'module',
            content: [
                {
                    describe: '导出',
                    key: 1,
                    code: `
// module.js
// 导出变量
export const name = "模块示例";

// 导出函数
export function add(a, b) {
  return a + b;
}

// 导出类
export class MyClass {
  constructor() {}
}

// 导出默认成员
export default function multiply(a, b) {
  return a * b;
}
`
                },
                {
                    describe: '导入',
                    key: 2,
                    code: `
// 导入模块
import name, { add, MyClass } from './module';

// 使用导入的成员
console.log(name); // 输出 "模块示例"
console.log(add(1, 2)); // 输出 3
const myClass = new MyClass();

// 导入默认导出
import multiply from './module';
console.log(multiply(2, 3)); // 输出 6
`
                },
            ]
        },
        {
            title: '异步编程',
            key: 'asyncProgramming',
            content: [
                {
                    describe: '引入 Promise、async/await 语法糖，简化异步操作的写法',
                    key: 1,
                    code: `
// 异步函数
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('请求失败:', error);
  }
}

// 调用异步函数
fetchData();

// Promise
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功');
  }, 2000);
});

promise.then((result) => {
  console.log(result); // 输出 "成功"
});

promise.catch((error) => {
  console.error('失败:', error);
});

// Promise.all
// 所有的promise都成功时，才执行then，有一个失败时，就执行catch
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values); // 输出 [3, 42, "foo"]
});

// Promise.race
// 第一个promise完成时，就执行then，有一个失败时，就执行catch
Promise.race([promise1, promise2, promise3]).then((value) => {
  console.log(value); // 输出 3
});

// Promise.reject
// 直接返回一个失败的promise
Promise.reject('失败').catch((error) => {
  console.error(error); // 输出 "失败"
});

// Promise.allSettled
// 所有的promise都完成时，就执行then (无论成功还是失败) 按照顺序输出结果
Promise.allSettled([promise1, promise2, promise3]).then((results) => {
  console.log(results);
});
`
                },
            ]
        }
        
    ]
}


export default es6;