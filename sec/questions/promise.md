### promise 
    为了解决异步编程的问题，避免回调地狱，引入了 promise 对象

    promise 对象代表一个异步操作的最终完成（或失败），及其结果值
    异步操作：指的是那些不会立即返回结果的操作，而是在未来的某个时间点返回结果
    最终完成：指的是异步操作成功完成，或者失败
    结果值：指的是异步操作成功完成时的结果，或者失败时的错误信息

    三种状态 pending 等待态 fulfilled 成功态 rejected 失败态
    状态只能从 pending 到 fulfilled 或从 pending 到 rejected，且只能改变一次
    一旦状态改变，就不会再变，任何时候都可以得到这个结果
 
    then 方法 第一个参数是成功的回调函数，第二个参数是失败的回调函数
    成功的回调函数：当 promise 对象状态变成成功态时调用
    失败的回调函数：当 promise 对象状态变成失败态时调用

    .then(
        (data) => console.log('成功:', data),
        (error) => console.log('失败:', error)
    );
    
    catch 方法
        专门处理 promise 对象抛出的错误 失败状态的回调函数

    promise 静态方法
        1. Promise.all
            接收一个 promise 对象的数组，等待所有 promise 都成功，才会调用 then 方法
            只要有一个 promise 失败，就会调用 catch 方法
            成功的回调函数：当所有 promise 都成功时调用
            失败的回调函数：当任意一个 promise 失败时调用
        
        2. Promise.race
            接收一个 promise 对象的数组，等待任意一个 promise 完成（成功或失败），就会调用 then 方法
        
        3. Promise.resolve
            返回一个已经成功的 promise 对象
        
        4. Promise.reject
            返回一个已经失败的 promise 对象
        
        5. Promise.allSettled
            接收一个 promise 对象的数组，等待所有 promise 都完成（成功或失败），才会调用 then 方法
            按照 promise 对象完成的顺序，依次调用 then 方法
        
        6. Promise.any
            接收一个 promise 对象的数组，等待任意一个 promise 成功，就会调用 then 方法

            
                