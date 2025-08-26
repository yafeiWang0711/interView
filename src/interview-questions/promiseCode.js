// promise 
// promise js的一个对象 管理异步操作的对象
// 三个状态 pending 等待 fulfilled 成功（已实现） rejected 失败（已拒绝）
// 链式调用  回掉地狱 
// promise.all 传递数组 全部都成功之后进行then 否者进入catch 
// promise.race 传递数组 那个先成功使用那个的返回结果 


new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('异步操作成功')
        // reject('异步操作失败')
    }, 1000)
}).then((res) => {
    console.log(res);
}).catch((error) => {
    console.log(error);
})

