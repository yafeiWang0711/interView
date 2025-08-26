// 实现一个简单的 Promise 对象

function myPromise() {
    // 定义 Promise 状态
    let status = 'pending';
    // 定义 Promise 结果
    let result = null;
    // 定义 Promise 成功回调函数队列
    let onFulfilledCallbacks = [];
    // 定义 Promise 失败回调函数队列
    let onRejectedCallbacks = [];
    // 定义 resolve 方法
    function į(value) {
        if (status === 'pending') {
            status = 'fulfilled';
            result = value;
            onFulfilledCallbacks.forEach(fn => fn(result));
        }
    }
    // 定义 reject 方法
    function reject(reason) {
        if (status === 'pending') {
            status = 'rejected';
            result = reason;
            onRejectedCallbacks.forEach(fn => fn(result));
        }
    }
    // 定义 then 方法
    this.then = function (onFulfilled, onRejected) {
        if (status === 'fulfilled') {
            onFulfilled(result);
        }
        if (status === 'rejected') {
            onRejected(result);
        }
    }
    // 定义 catch 方法
    this.catch = function (onRejected) {
        if (status === 'rejected') {
            onRejected(result);
        }
    }
    // 定义 finally 方法
    this.finally = function (onFinally) {
        if (status === 'fulfilled') {
            onFinally();
        }
        if (status === 'rejected') {
            onFinally();
        }
    }
    // 定义 resolve 方法
    this.resolve = function (value) {
        resolve(value);
    }
    // 定义 reject 方法
    this.reject = function (reason) {
        reject(reason);
    }
}


function myPromiseAll(promises) {
    return new Promise((resolve, reject) => {
        let count = 0;
        let result = [];
        promises.forEach((promise, index) => {
            promise.then((value) => {
                count++;
                result[index] = value;
                if (count === promises.length) {
                    resolve(result);
                }
            }).catch((reason) => {
                reject(reason);
            })
        })
    })
}

function myPromiseSettled(promises) {
    return new Promise((resolve) => {
        let count = 0;
        let result = [];
        promises.forEach((promise, index) => {
            promise.then((value) => {
                count++;
                result[index] = {
                    status: 'fulfilled',
                    value
                }
                if (count === promises.length) {
                    resolve(result);
                }
            }).catch((reason) => {
                count++;
                result[index] = {
                    status: 'rejected',
                    reason
                }
                if (count === promises.length) {
                    resolve(result);
                }
            })
        })
    })
}