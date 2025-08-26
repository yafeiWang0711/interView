### vue2和vue3的区别
    1. 响应式区别
        vue2的响应式是通过Object.defineProrerty来实现的,通过重写对象的 getter 和 setter 拦截属性的读写。
        局限：
            无法直接监听对象新增 / 删除的属性（需用 Vue.set/Vue.delete 手动处理）。
            无法监听数组通过索引修改的元素（如 arr[0] = 1）或直接 length 变化（需重写数组原型方法如 push/splice 实现）。
            初始化时会递归遍历对象所有属性，对深层嵌套对象性能消耗较大。
  
        vue3的响应式是通过Proxy来实现的，直接代理对象的代理直接拦截所有操作（包括属性新增、删除、数组索引修改等）。
        优势：
            直接代理对象，无需递归遍历所有属性，性能更优。
            支持监听数组通过索引修改的元素和直接 length 变化。
            无需手动处理新增 / 删除属性的情况。
            支持监听动态添加的属性。
            支持监听 Map、Set 等数据结构。
    
    2. 生命周期钩子
        vue2的生命周期钩子：
            beforeCreate 创建前 
            created 创建后
            beforeMount 挂载前
            mounted 挂载后
            beforeUpdate 更新前
            updated 更新后
            beforeDestroy 销毁前
            destroyed 销毁后
        vue3的生命周期钩子：
            onBeforeMount 挂载前
            onMounted 挂载后
            onBeforeUpdate 更新前
            onUpdated 更新后
            onBeforeUnmount 销毁前
            onUnmounted 销毁后
        vue3 setup执行时机：
            setup 函数在组件实例创建之前调用，此时组件的 props 还未初始化，不能访问 this。
            setup 函数返回的对象会与组件实例合并，成为组件的响应式数据。
            setup 函数可以返回一个渲染函数，用于渲染组件的模板。
    
    3. 组件写法
        vue2 组件写法：
            选项式 API （Options API）
            模板和逻辑写在同一个文件中
            模板中可以直接访问组件的 data、computed、methods 等属性。
            模板中需要通过 this 访问组件的实例。
        vue3 组件写法：
            组合式 API （Composition API）
            模板和逻辑写在同一个文件中
            模板中可以直接访问 setup 函数返回的响应式数据。
            模板中不需要通过 this 访问组件的实例。
            可以使用 ref、reactive、computed、watch 等函数来定义响应式数据和计算属性。
            可以使用 onMounted、onUpdated、onUnmounted 等函数来定义生命周期钩子。
        
        Vue3 新增特性：
            多根节点组件（Fragment）：Vue2 组件模板必须有唯一根节点，Vue3 支持多根节点，无需外层包裹 <div>：
            vue
            <!-- Vue3 合法 -->
            <template>
            <h1>标题</h1>
            <p>内容</p>
            </template>

            更灵活的指令用法：
            v-model 支持多个绑定（如 v-model:title、v-model:content），替代 Vue2 的 .sync 修饰符。
            v-if 与 v-for 优先级调整：v-if 现在可以正确访问 v-for 的变量（Vue2 中 v-for 优先级更高）。
            内置组件增强：
            <Suspense>：等待异步组件加载完成后渲染，配合 async setup 使用。
            <Teleport>：将组件内容 “传送” 到 DOM 树的其他位置（如模态框挂载到 <body> 下）。
    
    4. 性能优化
        vue3的性能优化主要体现在：
            响应式系统优化：
                基于 Proxy 的响应式系统，无需递归遍历所有属性，性能更优。
                支持监听动态添加的属性。
            编译优化：
                静态提升：静态节点在渲染函数中只创建一次，避免重复创建。
                事件监听缓存：事件监听函数只在组件实例创建时创建一次，避免重复创建。
            树摇优化：
                只打包使用到的代码，避免打包无用代码。
            虚拟 DOM 优化：
                基于树的虚拟 DOM  diff 算法，只更新有变化的节点，避免全量对比。
                支持静态节点标记，避免重复对比。

    diff算法：
        vue2的diff算法是基于双端比较的，时间复杂度为O(n)，n是节点的数量。
        vue3的diff算法是基于树的比较，时间复杂度为O(n)，n是节点的数量。


v-if和v-for的区别：
    v-if和v-for都可以用来条件渲染，但是它们的区别是：
        v-if是惰性的，只有当条件为真时才会渲染，否则不会渲染。
        v-for是迭代的，会根据数据的长度渲染多次，每次渲染都会创建一个新的组件实例。
        因此，v-if适合用来渲染一次的场景，而v-for适合用来渲染多次的场景。
        例如：
            <div v-if="isShow">
                这是一个div
            </div>
            <div v-for="item in list">
                {{ item }}
            </div>
            
    v-if和v-for的优先级：
    在Vue2中，v-for的优先级高于v-if。这意味着如果同时使用v-for和v-if，那么v-for会先执行，然后才会判断v-if的条件是否为真。
    例如：
        <div v-for="item in list" v-if="item.isShow">
            {{ item }}
        </div>
    上面的代码会先执行v-for，遍历list数组，然后判断每个item的isShow属性是否为真，如果为真，才会渲染该div。
    而在Vue3中，v-if的优先级高于v-for。这意味着如果同时使用v-for和v-if，那么v-if会先执行，然后才会遍历v-for。
    例如：
        <div v-if="isShow">
            <div v-for="item in list">
                {{ item }}
            </div>
        </div>
    上面的代码会先判断isShow是否为真，如果为真，才会遍历list数组，渲染每个div。

    v-if和v-for能一起使用吗？
    可以一起使用，但是需要注意的是，v-if和v-for不能同时作用于同一个元素上。
    例如：
        <div v-if="isShow">
            <div v-for="item in list">
                {{ item }}
            </div>
        </div>
    上面的代码是可以的，但是如果将v-if和v-for同时作用于div元素上，就会报错。
    例如：
        <div v-if="isShow" v-for="item in list">
            {{ item }}
        </div>
    上面的代码会报错，因为v-if和v-for不能同时作用于同一个元素上。
    解决方法是将v-if和v-for作用于不同的元素上，例如：
        <div v-if="isShow">
            <div v-for="item in list">
                {{ item }}
            </div>
        </div>
        <div v-else>
            暂无数据
        </div>