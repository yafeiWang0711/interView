### vue3 响应式原理
    1. 响应式数据：vue3 中使用 proxy 实现响应式数据，当数据发生变化时，会自动触发视图更新。
    2. 依赖收集：vue3 中使用依赖收集机制，当模板中使用到数据时，会自动收集依赖，当数据发生变化时，会自动触发依赖的更新。
    3. 渲染函数：vue3 中使用渲染函数实现视图的渲染，当数据发生变化时，会自动触发渲染函数的重新执行，从而实现视图的更新。
    4. 组件更新：vue3 中使用组件更新机制，当组件的 data 发生变化时，会自动触发组件的更新，从而实现视图的更新。

    proxy 实现响应式数据
    1. 使用 proxy 创建一个代理对象，将原始数据作为对象的属性。
    2. 当模板中使用到数据时，会自动触发依赖收集机制，将渲染函数作为依赖收集到数据的依赖列表中。
    3. 当数据发生变化时，会自动触发依赖列表中的渲染函数，从而实现视图的更新。
    4. 当组件被销毁时，会自动清除组件中的依赖，避免内存泄漏。

    例如：
    const data = {
        name: 'vue3',
        age: 18
    }
    const proxyData = new Proxy(data, {
        get(target, key) {
            console.log('get', key)
            return target[key]
        },
        set(target, key, value) {
            console.log('set', key, value)
            target[key] = value
            // 当数据发生变化时，自动触发依赖列表中的渲染函数
            render()
            // 触发组件更新
            componentUpdate()
            // 触发组件更新
            componentUpdate()
        }
    })

    const app = Vue.createApp({
        data() {
            return proxyData
        },
        template: `
            <div>
                <h1>{{ name }}</h1>
                <h2>{{ age }}</h2>
            </div>
        `
    })
    app.mount('#app')