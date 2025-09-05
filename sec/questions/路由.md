### vue 路由
    路由是指根据 URL 地址来访问不同的页面。
    路由主要包括前端路由和后端路由。
    前端路由是指根据 URL 地址来访问不同的页面，而不需要刷新页面。
    后端路由是指根据 URL 地址来访问不同的页面，而需要刷新页面。
    
    hash 路由
        hash 路由是指根据 URL 地址的 hash 值来访问不同的页面。
        hash 路由主要包括以下几个步骤：
            1. 在 URL 地址中添加 hash 值。
            2. 监听 hashchange 事件。
            3. 根据 hash 值来访问不同的页面。
        hash 路由的优势是简单易用，不需要服务器的支持。
        hash 路由的劣势是 URL 地址中包含 hash 值，不美观。
        hash 路由的应用场景是单页面应用（SPA）。
    
    history 路由
        history 路由是指根据 URL 地址的路径来访问不同的页面。
        history 路由主要包括以下几个步骤：
            1. 在 URL 地址中添加路径。
            2. 监听 popstate 事件。
            3. 根据路径来访问不同的页面。
        history 路由的优势是 URL 地址中不包含路径，美观。
        history 路由的劣势是需要服务器的支持。
        history 路由的应用场景是单页面应用（SPA）。

    区别：
    hash 路由和 history 路由的区别在于 URL 地址的格式。
    hash 路由的 URL 地址格式是：http://localhost:8080/#/home
    history 路由的 URL 地址格式是：http://localhost:8080/home
    hash 路由不需要服务器的支持，而 history 路由需要服务器的支持。

    vue-router
    路由钩子函数
        路由钩子函数是指在路由切换时执行的函数。
        路由钩子函数主要包括以下几个类型：
            1. 全局钩子函数
            2. 路由独享钩子函数
            3. 组件内钩子函数
        全局钩子函数
            全局钩子函数是指在路由切换时执行的函数，对所有路由都生效。
            全局钩子函数主要包括以下几个类型：
                1. beforeEach
                2. afterEach
        路由独享钩子函数
            路由独享钩子函数是指在路由切换时执行的函数，只对当前路由生效。
            路由独享钩子函数主要包括以下几个类型：
                1. beforeEnter
                2. beforeRouteEnter
        组件内钩子函数
            组件内钩子函数是指在组件切换时执行的函数，只对当前组件生效。
            组件内钩子函数主要包括以下几个类型：
                1. beforeRouteEnter
                2. beforeRouteUpdate
                3. beforeRouteLeave
                4. afterRouteEnter
                5. afterRouteUpdate
                6. afterRouteLeave

        路由守卫
            路由守卫是指在路由切换时执行的函数，对所有路由都生效。
            路由守卫主要包括以下几个类型：
                1. beforeEach
                    beforeEach 是一个全局守卫，它在路由跳转之前执行。
                2. afterEach
                    afterEach 是一个全局守卫，它在路由跳转之后执行。
                3. beforeEnter
                    beforeEnter 是一个路由独享守卫，它在路由跳转之前执行。
                    在路由配置里面定义
                4. beforeRouteEnter
                    beforeRouteEnter 是一个组件内守卫，它在路由跳转之前执行。
                    beforeRouteEnter 守卫 不能 访问 this，因为守卫在导航确认前被调用，因此即将登场的新组件还没被创建。
                5. beforeRouteUpdate
                    beforeRouteUpdate 是一个组件内守卫，它在路由跳转之前执行。
                    beforeRouteUpdate 守卫 可以 访问 this，因为守卫在导航确认前被调用，因此即将登场的新组件还没被创建。
                6. beforeRouteLeave
                    beforeRouteLeave 是一个组件内守卫，它在路由跳转之前执行。
                    beforeRouteLeave 守卫 可以 访问 this，因为守卫在导航确认前被调用，因此即将登场的新组件还没被创建。
                7. afterRouteEnter
                    afterRouteEnter 是一个组件内守卫，它在路由跳转之后执行。
                    afterRouteEnter 守卫 可以 访问 this，因为守卫在导航确认前被调用，因此即将登场的新组件还没被创建。
                8. afterRouteUpdate
                    afterRouteUpdate 是一个组件内守卫，它在路由跳转之后执行。
                    afterRouteUpdate 守卫 可以 访问 this，因为守卫在导航确认前被调用，因此即将登场的新组件还没被创建。
                9. afterRouteLeave
                    afterRouteLeave 是一个组件内守卫，它在路由跳转之后执行。
                    afterRouteLeave 守卫 可以 访问 this，因为守卫在导航确认前被调用，因此即将登场的新组件还没被创建。
            
            路由守卫的参数
                路由守卫的参数主要包括以下几个参数：
                    1. to
                        to 是指目标路由对象，包含目标路由的信息，如路径、参数、查询参数等。
                    2. from
                        from 是指当前路由对象，包含当前路由的信息，如路径、参数、查询参数等。
                    3. next
                        next 是指路由守卫的回调函数，用于控制路由的切换。
                        next()：继续执行路由守卫
                        next(false)：中断路由守卫
                        next('/path')：跳转到指定的路由
                        next({ name: 'name' })：跳转到指定的路由名称
