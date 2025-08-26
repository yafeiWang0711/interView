class MyPromise {
    constructor(callback) {
        // 初始化状态 pending
        this.status = 'pending'
        // 初始化成功状态的值
        this.value = ''
        // 初始化失败状态的值
        this.reason = ''
        // 存储成功状态的回掉函数数组
        this.onResloveCallbacks = []
        // 存储失败状态的回掉函数数组
        this.onRejectCallbacks = []

        // 定义resolve函数  成功
        const reslove = value => {
            if (this.status == 'pending') {
                // 更改状态为 reslove
                this.status = 'reslove'
                // 存储成功状态的值
                this.value = value
                // 执行所有成功状态的回掉函数
                this.onResloveCallbacks.forEach((fn) => fn())
            }
        }

        // 定义reject函数  失败
        const reject = reason => {
            if (this.status == 'pending') {
                // 更改状态为 reslove
                this.status = 'reject'
                // 存储成功状态的值
                this.reason = reason

                this.onRejectCallbacks.forEach((fn) => fn())
            }
        }

        // 调用回掉函数，向resolve和reject 传递给他
        callback(reslove, reject)
    }
}