// 在js中 call、apply、bind 用来做什么？

// 改变this指向

// call、apply、bind 都是函数的方法，都可以改变函数内部的 this 指向
// call、apply、bind 的第一个参数都是 this 指向的对象

// 简单理解 就是 在函数内部，将函数绑定到上下文对象的新属性上，然后调用函数




// call

function fn(...args) {
    console.log('hello' + this.name + args.join(','));
}

const obj = {
    name: '张三'
}

// call 的参数是直接传递的
// 作用：调用一个函数，并设置函数内部的this值为指定的值，同时传递一系列参数给函数
// 返回值：返回被调用函数的返回值
fn.call(obj, 1, 2, 3,33,44); // hello 张三 1 2 3 33 44

// // apply 的参数是传递一个数组
fn.apply(obj, [1, 2, 3,33,44]); // hello 张三 1 2 3 33 44

// bind 的参数是传递一个对象
const myBind = fn.bind(obj);
myBind(1, 2, 3,33,44); // hello 张三 1 2 3 33 44


// call 参数 （one，param1，param2，param3 ，...） 第一个为this指向的对象，后面的参数为传递给函数的参数
// apply 参数 （one，[param1，param2，param3 ，...]) 第一个为this指向的对象，后面的参数为传递给函数的参数，在数组里面
// bind 参数 （one）（param1，param2，param3 ，...） 第一个括号为this指向的对象，后面的参数为传递给函数的参数，返回一个函数，需要手动调用


// 手写call、apply、bind

// this是调用Call apply bind的函数，将函数绑定到上下文对象的新属性上


// let foo = {
//     value: 1,
//     bar: function() {
//         console.log(this.value)
//     }
// }

// 相当于在foo对象里面，调用bar函数

// call
 Function.prototype.myCall = function (context, ...args) {
    context.fn = this;
    const result = context.fn(...args);
    delete context.fn;
    return result;
 }

 // apply
 Function.prototype.myApply = function (context, args) {
    context.fn = this;
    const result = context.fn(...args);
    delete context.fn;
    return result;
 }

 // bind
 Function.prototype.myBind = function (context, ...args) {
    return (...newArgs) => this.myCall(context, ...args, ...newArgs);
 }

 // 测试
 const obj1 = {
    name: '张三'
 }

 function fn1(a, b) {
    console.log('hello' + this.name + a + b);
 }

 fn1.myCall(obj1, 1, 2); // hello 张三 1 2
 fn1.myApply(obj1, [1, 2]); // hello 张三 1 2
 const myBind1 = fn1.myBind(obj1);
 myBind1(1, 2); // hello 张三 1 2


//  Function.prototype.myCall = function(context, ...args) {
//    context = context || window;
//    context.fn = this;
//    const result = context.fn(...args);
//    delete context.fn;
//    return result;
//  };
 
//  // 实现 apply
//  Function.prototype.myApply = function(context, args = []) {
//    context = context || window;
//    context.fn = this;
//    const result = context.fn(...args);
//    delete context.fn;
//    return result;
//  };
 
//  // 实现 bind
//  Function.prototype.myBind = function(context, ...args1) {
//    const fn = this;
   
//    return function(...args2) {
//      return fn.apply(context, [...args1, ...args2]);
//    };
//  };