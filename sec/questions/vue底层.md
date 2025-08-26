### vue 底层原理
    vue2 底层原理：
        1. 响应式原理
            object.defineProperty 实现响应式
            通过getter 和 setter 实现依赖收集和派发更新
            依赖收集：在getter 中收集依赖，即当数据被访问时，将当前组件的 watcher 加入到依赖列表中。
            派发更新：在setter 中触发依赖列表中的 watcher 进行更新，即当数据发生变化时，通知所有依赖该数据的组件进行更新。
            例如：
            ```
            let data = {
                name: 'vue',
                age: 20
            }
            Object.keys(data).forEach(key => {
                let value = data[key]
                Object.defineProperty(data, key, {
                    get() {
                        console.log('get', key, value)
                        return value
                    },
                    set(newValue) {
                        console.log('set', key, newValue)
                        value = newValue
                        // 触发依赖列表中的 watcher 进行更新
                    }
                })
            })
            ```
        2. 组件化原理
            vue 通过组件化实现代码的复用和封装，每个组件都是一个独立的单元，有自己的模板、数据和方法。
            组件化的实现原理是：
                1. 组件化：将页面拆分成多个组件，每个组件都有自己的模板、数据和方法。
                2. 组件注册：将组件注册到 vue 实例中，使其他组件可以使用。
                3. 组件使用：在其他组件中使用注册的组件，通过标签的方式引入。
                4. 组件通信：组件之间可以通过 props 传递数据，也可以通过事件机制进行通信。
                5. 组件生命周期：每个组件都有自己的生命周期，如 created、mounted、updated、destroyed 等。
                6. 组件实例化：当组件被使用时，会实例化一个组件对象，组件对象会调用组件的构造函数，初始化组件的状态和行为。
                7. 组件渲染：组件实例化后，会调用组件的 render 方法，生成组件的虚拟 DOM 树。
                8. 组件更新：当组件的状态发生变化时，会调用组件的 render 方法，生成新的虚拟 DOM 树，然后对比新旧虚拟 DOM 树的差异，只更新有变化的部分，避免全量更新。
        3. 虚拟 DOM 原理
            虚拟 DOM 是一种在内存中表示真实 DOM 的轻量级 JavaScript 对象，它是对真实 DOM 的抽象。
            虚拟 DOM 的实现原理是：
                1. 组件渲染：组件实例化后，会调用组件的 render 方法，生成组件的虚拟 DOM 树。
                2. 虚拟 DOM 树的对比：当组件的状态发生变化时，会调用组件的 render 方法，生成新的虚拟 DOM 树，然后对比新旧虚拟 DOM 树的差异。
                3. 差异更新：对比新旧虚拟 DOM 树的差异，只更新有变化的部分，避免全量更新。
        4. 事件机制原理
            vue 中的事件机制是基于事件委托实现的，即事件会冒泡到父元素，父元素可以监听事件并处理。
            事件机制的实现原理是：
                1. 事件绑定：在组件的模板中使用 v-on 指令绑定事件，如 v-on:click="handleClick"。
                2. 事件委托：事件会冒泡到父元素，父元素可以监听事件并处理。
                3. 事件处理：当事件触发时，会调用组件的方法进行处理。
                4. 事件参数：事件处理方法可以接收事件参数，如事件对象、事件目标等。
                5. 事件修饰符：vue 提供了一些事件修饰符，如 .stop、.prevent、.capture 等，用于修改事件的行为。
        5. 依赖注入原理
            依赖注入是一种设计模式，用于在组件之间传递数据。
            依赖注入的实现原理是：
                1. 父组件使用 provide 选项提供数据。
                2. 子组件使用 inject 选项注入数据。
                3. 子组件可以直接使用注入的数据，而不需要通过 props 传递。
                4. 子组件可以使用注入的数据进行计算或渲染。

    vue3 底层原理：
        1. 响应式原理
            vue3 使用了 Proxy 来实现响应式，相比于 vue2 的 Object.defineProperty，Proxy 可以监听数组的变化。
            例如：
            ```
            let data = {
                name: 'vue',
                age: 20
            }
            let proxy = new Proxy(data, {
                get(target, key) {
                    console.log('get', key, target[key])
                    return target[key]
                },
                set(target, key, value) {
                    console.log('set', key, value)
                    target[key] = value
                    // 触发依赖列表中的 watcher 进行更新
                }
            })
            ```
        2. 组件化原理
        3. 虚拟 DOM 原理
        4. 事件机制原理
        5. 依赖注入原理