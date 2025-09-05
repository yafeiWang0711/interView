### es6 
    1. es6模块化开发
        comonjs amd cmd es6

        require 引入模块
        module.exports 导出模块
        export 导出模块
        import 引入模块
        1. 导出模块
            1. 导出默认模块
                export default 模块
            2. 导出多个模块
                export { 模块1, 模块2, 模块3 }
        2. 引入模块
            1. 引入默认模块
                import 模块 from '模块路径'
            2. 引入多个模块
                import { 模块1, 模块2, 模块3 } from '模块路径'
    
    webpack升级成vite 有问题吗？
        1. 问题
            1. 项目比较大的时候，vite的启动速度会比webpack快很多。
            2. 项目比较小的时候，vite的启动速度会比webpack慢很多。
        2. 解决
            1. 项目比较大的时候，使用vite。
            2. 项目比较小的时候，使用webpack。
        3. 引入commomjs模块

        
#### 1. 箭头函数
    1. 箭头函数的this指向
        1. 箭头函数的this指向是固定的，不会改变。
        2. 箭头函数的this指向是在定义时确定的，不是在调用时确定的。

#### 2. 模板字符串
    1. 模板字符串的使用
        1. 模板字符串的使用是通过反引号（`）来定义的。
            let str = `hello ${name}`;
            console.log(str);
        2. 模板字符串可以包含变量和表达式。
            let str = `hello ${name}, you are ${age} years old`;
            console.log(str);
    2. 模板字符串的优势
        1. 模板字符串的优势是可以避免字符串拼接的问题。
        2. 模板字符串的优势是可以使代码更加简洁。

#### 3. let 和 const
    1. let 声明的变量是块级作用域的。
    2. const 声明的变量是块级作用域的，并且是只读的。
    3. let 和 const 声明的变量不会提升。

#### 4. 解构赋值
    1. 数组解构赋值
        1. 数组解构赋值的使用
            let [a, b] = [1, 2];
            console.log(a); // 1
            console.log(b); // 2
        2. 数组解构赋值的默认值
            let [a, b = 2] = [1];
            console.log(a); // 1
            console.log(b); // 2
    2. 对象解构赋值
        1. 对象解构赋值的使用
            let { a, b } = { a: 1, b: 2 };
            console.log(a); // 1
            console.log(b); // 2

#### 



