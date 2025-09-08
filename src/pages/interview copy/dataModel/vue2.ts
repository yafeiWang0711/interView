const sort = {
    title: 'vue面试题',
    key: 'vue',
    children: [
        {
            title: 'vue2 响应式原理',
            key: 'vue2-object.defineProperty',
            content:[{
            describe: 'vue2 响应式原理',
            code: `
// vue2 响应式原理

Vue2 响应式系统的核心流程可分为三个步骤：
数据劫持：通过 Object.defineProperty() 重写对象的 getter 和 setter，监听数据的读取和修改
依赖收集：在 getter 中收集使用该数据的依赖（组件或 Watcher）
派发更新：在 setter 中通知所有依赖数据已更新，触发重新渲染


// vue2 响应式原理是通过 Object.defineProperty 来实现的
// 它的核心思想是通过定义对象的属性来监听属性的变化，当属性发生变化时，通知依赖该属性的地方进行更新
// 具体实现是在初始化数据时，通过 Object.defineProperty 来定义属性的 getter 和 setter
// 当属性被访问时，会触发 getter 方法，当属性被赋值时，会触发 setter 方法
// 在 setter 方法中，会通知依赖该属性的地方进行更新
// 依赖收集
// 当属性被访问时，会触发 getter 方法，在 getter 方法中，会将当前的 Dep.target 收集到属性的依赖列表中
// 当属性被赋值时，会触发 setter 方法，在 setter 方法中，会通知依赖该属性的地方进行更新
// 具体实现是在初始化数据时，通过 Object.defineProperty 来定义属性的 getter 和 setter
// 当属性被访问时，会触发 getter 方法，当属性被赋值时，会触发 setter 方法
// 在 setter 方法中，会通知依赖该属性的地方进行更新

// 优缺点
// 优点：
// 1. 简单易用：通过 Object.defineProperty 来定义属性的 getter 和 setter，非常简单易用
// 2. 性能好：只在初始化数据时进行一次监听，后续属性的访问和赋值都不会触发监听，性能好
// 3. 兼容性好：支持所有浏览器，包括 IE8 及以上版本
// 缺点：
// 1. 不能监听数组的变化：通过 Object.defineProperty 来定义属性的 getter 和 setter，不能监听数组的变化
// 2. 不能监听新增属性：通过 Object.defineProperty 来定义属性的 getter 和 setter，不能监听新增属性
// 3. 不能监听删除属性：通过 Object.defineProperty 来定义属性的 getter 和 setter，不能监听删除属性

Vue2 响应式的局限性
对象新增 / 删除属性无法检测：
解决方案：使用 Vue.set(obj, key, value) 或 this.$set
数组下标修改和长度修改无法检测：
解决方案：使用数组方法（push/pop 等）或 Vue.set(arr, index, value)
不支持 Map、Set 等数据结构：
需要手动处理更新
深度监听可能影响性能：
递归劫持所有属性，大型对象会有性能开销
                `
            }]
        },
    ]
}

export default sort;