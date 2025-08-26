// var 变量提升 全局变量

// let 局部变量

// const 局部常量  定义的基本数据类型不能改变，运用数据类型可以改变

// var a = 1
// a1 = 2

// var a1

// let b = 1
// b1 =32
// const c = 1

// const c1 = {
//     a: 'c_a'
// }

// const c2 = '111'

// c1.a='34234'
// // c2 = 'c2'  会报错

// console.log('a',a);
// console.log('a1',a1);
// console.log('b',b);
// // console.log('b1',b1); //b1 is not defined

// console.log('c',c);
// console.log('c1',c1);
// console.log('c2',c2);


// {
//     var a = 123
// }

// console.log(a);


var a = 'global'


function outer() {
  var b = 'outer'

  function inner() {
    var c = 'inner'
    console.log(a, b, c) // ✅ global outer inner
  }

  inner()
}

outer()
// console.log(c) // ❌ ReferenceError: b is not defined
