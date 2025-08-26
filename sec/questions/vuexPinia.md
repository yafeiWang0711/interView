### vuex和pinia的区别
    vuex 是 vue 官方的状态管理库，而 pinia 是 vue 3 官方的状态管理库，两者都是用于管理 vue 应用中的状态。
    vuex 五个核心概念：
        state：状态，用于存储应用中的状态
        mutation：突变，用于修改状态
        action：动作，用于处理异步操作
        getter：获取器，用于获取状态
        module：模块，用于将状态分割成多个模块
        mutation是同步的，action是异步的

        核心概念	作用说明
        State	   存储全局共享的状态数据（唯一数据源，类似组件的 data）。
        Getter	   对 State 进行计算派生（类似组件的 computed），可缓存结果。
        Mutation   唯一修改 State 的方式（必须是同步操作），通过 commit 触发。
        Action	   处理异步操作（如 API 请求），通过 dispatch 触发，最终提交 Mutation。
            action 返回值可以是 Promise 或其他值，可通过回调函数处理结果。
        Module	   将复杂状态拆分为模块（每个模块可包含独立的 State、Mutation、Action 等）。

        状态只读：不能直接修改 state，必须通过 mutation 修改（确保状态变化可追踪）。
        ❌ 错误：this.$store.state.count = 10;
        ✅ 正确：this.$store.commit('increment', 10);
        Mutation 同步：mutation 必须是同步函数（否则 DevTools 无法记录状态变化），异步逻辑放在 action 中。
        单一状态树：所有状态集中在一个 store 中，便于调试和管理（通过模块拆分避免臃肿）。

    pinia 核心概念：
        State：存储全局共享的状态数据（唯一数据源，类似组件的 data）。
        Getter：对 State 进行计算派生（类似组件的 computed），可缓存结果。
        Action：处理异步操作（如 API 请求），通过 dispatch 触发，最终修改 State。
        Module：将复杂状态拆分为模块（每个模块可包含独立的 State、Action 等）。

        简洁的 API：去掉了 Vuex 中的 Mutation，直接通过 Action 处理同步和异步操作，减少了模板代码。
        原生 TypeScript 支持：无需额外类型声明，自动进行类型推断，开发体验更流畅。
        模块化设计：每个 Store 都是独立的模块，无需嵌套，天然隔离，避免了 Vuex 中模块嵌套的复杂性。
        轻量高效：体积更小（约 1KB），性能更优，且与 Vue DevTools 完美集成，支持时间旅行调试。
        跨版本兼容：同时支持 Vue 2 和 Vue 3，API 统一，迁移成本低。