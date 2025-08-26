/**
 * JavaScript Promise面试题详解
 * 知识点：状态机、链式调用、错误处理、静态方法实现
 */

// 问题1：Promise的三种状态及特点
/**
 * 1. pending(进行中)：初始状态，可变为fulfilled或rejected
 * 2. fulfilled(已成功)：操作完成，不可再变
 * 3. rejected(已失败)：操作失败，不可再变
 *
 * 特点：
 * - 状态不可逆
 * - 回调函数异步执行
 * - 支持链式调用
 */

// 问题2：手写Promise核心实现（符合Promise/A+规范）
class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onFulfilledCallbacks.forEach(cb => cb());
      }
    };

    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(cb => cb());
      }
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    // 处理默认参数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
    onRejected = typeof onRejected === 'function' ? onRejected : e => { throw e };

    const promise2 = new MyPromise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }

      if (this.state === 'rejected') {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }

      if (this.state === 'pending') {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              this.resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              this.resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
    });

    return promise2;
  }

  resolvePromise(promise2, x, resolve, reject) {
    // 规范2.3.1：如果promise和x指向同一对象，以TypeError为据因拒绝执行promise
    if (promise2 === x) {
      return reject(new TypeError('Chaining cycle detected for promise'));
    }

    let called = false;
    // 规范2.3.2：如果x为Promise，则使promise接受x的状态
    if (x instanceof MyPromise) {
      if (x.state === 'pending') {
        x.then(y => {
          this.resolvePromise(promise2, y, resolve, reject);
        }, err => {
          reject(err);
        });
      } else {
        x.then(resolve, reject);
      }
    } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
      // 规范2.3.3：如果x为对象或函数
      try {
        const then = x.then;
        if (typeof then === 'function') {
          // 规范2.3.3.3：如果then是函数，将x作为函数的this调用
          then.call(x, y => {
            if (called) return;
            called = true;
            this.resolvePromise(promise2, y, resolve, reject);
          }, err => {
            if (called) return;
            called = true;
            reject(err);
          });
        } else {
          // 规范2.3.3.4：如果then不是函数，以x为参数执行promise
          resolve(x);
        }
      } catch (e) {
        if (called) return;
        called = true;
        reject(e);
      }
    } else {
      // 规范2.3.4：如果x不为对象或函数，以x为参数执行promise
      resolve(x);
    }
  }

  // 静态方法实现
  static resolve(value) {
    if (value instanceof MyPromise) return value;
    return new MyPromise(resolve => resolve(value));
  }

  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }

  static all(promises) {
    return new MyPromise((resolve, reject) => {
      if (!Array.isArray(promises)) return reject(new TypeError('参数必须是数组'));

      const results = [];
      let count = 0;

      if (promises.length === 0) return resolve(results);

      promises.forEach((p, index) => {
        MyPromise.resolve(p).then(
          value => {
            results[index] = value;
            count++;
            if (count === promises.length) resolve(results);
          },
          reason => reject(reason)
        );
      });
    });
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      if (!Array.isArray(promises)) return reject(new TypeError('参数必须是数组'));

      promises.forEach(p => {
        MyPromise.resolve(p).then(resolve, reject);
      });
    });
  }
}

// 问题5：Promise错误捕获的几种方式
/**
 * 1. catch()方法
 * 2. then()的第二个参数
 * 3. try/catch(仅对async/await有效)
 * 4. window.addEventListener('unhandledrejection')(全局捕获)
 */