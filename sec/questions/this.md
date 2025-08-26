### this 
    this 是 JavaScript 中的一个关键字，它指向当前执行代码的对象。
    this 的值是在运行时确定的，不是在定义时确定的。
    this 的值取决于函数的调用方式。
    函数的调用方式主要包括以下几种：
        1. 函数调用
        2. 方法调用
        3. 构造函数调用
        4. .apply() 调用
        5. .call() 调用
        6. .bind() 调用
        7. 箭头函数调用
        8. 事件绑定调用

    改变 this 的指向
        1. 使用 .apply() 方法
            .apply() 方法可以接受两个参数，第一个参数是 this 的指向对象，第二个参数是一个数组或类数组对象，表示传递给函数的参数。
            .apply() 方法会立即调用函数，并且返回函数的执行结果。
            例如：
            function.apply(thisArg, [argsArray])
            其中，thisArg 是 this 的指向对象，argsArray 是一个数组或类数组对象，表示传递给函数的参数。
            Function.prototype.apply = function(thisArg, argsArray) {
                thisArg = thisArg || window;
                thisArg.fn = this;
                let result = thisArg.fn(...argsArray);
                delete thisArg.fn;
                return result;
            }
            其中，thisArg 是 this 的指向对象，argsArray 是一个数组或类数组对象，表示传递给函数的参数。
            thisArg.fn = this; 这行代码将函数 fn 赋值给 thisArg 对象的 fn 属性。
            let result = thisArg.fn(...argsArray); 这行代码使用展开运算符 ... 将 argsArray 展开为多个参数，然后调用 thisArg 对象的 fn 属性，将 thisArg 对象作为 this 指向，将展开后的参数传递给 fn 函数。
            delete thisArg.fn; 这行代码删除 thisArg 对象的 fn 属性。

        2. 使用 .call() 方法
            .call() 方法可以接受多个参数，第一个参数是 this 的指向对象，后面的参数是传递给函数的参数。
            .call() 方法会立即调用函数，并且返回函数的执行结果。
            例如：
            function.call(thisArg, arg1, arg2, ...)
            其中，thisArg 是 this 的指向对象，arg1, arg2, ... 是传递给函数的参数。
            Function.prototype.call = function(thisArg, ...args) {
                thisArg = thisArg || window;
                thisArg.fn = this;
                let result = thisArg.fn(...args);
                delete thisArg.fn;
                return result;
            }
            其中，thisArg 是 this 的指向对象，...args 是传递给函数的参数。
            thisArg.fn = this; 这行代码将函数 fn 赋值给 thisArg 对象的 fn 属性。
            let result = thisArg.fn(...args); 这行代码使用展开运算符 ... 将 args 展开为多个参数，然后调用 thisArg 对象的 fn 属性，将 thisArg 对象作为 this 指向，将展开后的参数传递给 fn 函数。
            delete thisArg.fn; 这行代码删除 thisArg 对象的 fn 属性。    
        3. 使用 .bind() 方法
        .bind() 方法可以接受多个参数，第一个参数是 this 的指向对象，后面的参数是传递给函数的参数。
        .bind() 方法不会立即调用函数，而是返回一个新的函数，这个新函数的 this 指向被绑定为第一个参数指定的对象。    
        例如： 
        function.bind(thisArg, arg1, arg2, ...)
        其中，thisArg 是 this 的指向对象，arg1, arg2, ... 是传递给函数的参数。
        Function.prototype.bind = function(thisArg, ...args) {
            thisArg = thisArg || window;
            thisArg.fn = this;
            return function(...args2) {
                let result = thisArg.fn(...args, ...args2);
                delete thisArg.fn;
                return result;
            }
        }
        其中，thisArg 是 this 的指向对象，...args 是传递给函数的参数。
        thisArg.fn = this; 这行代码将函数 fn 赋值给 thisArg 对象的 fn 属性。
        return function(...args2) { 这行代码返回一个新的函数，这个新函数的 this 指向被绑定为 thisArg 对象。
        let result = thisArg.fn(...args, ...args2); 这行代码使用展开运算符 ... 将 args 和 args2 展开为多个参数，然后调用 thisArg 对象的 fn 属性，将 thisArg 对象作为 this 指向，将展开后的参数传递给 fn 函数。
        delete thisArg.fn; 这行代码删除 thisArg 对象的 fn 属性。
        return result; 这行代码返回函数的执行结果。
        }