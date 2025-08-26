# Vue2 基础面试题

## 1. Vue2 核心概念

### 问题：Vue2 的生命周期有哪些？各阶段的作用是什么？

**答案：**

**Vue2 生命周期钩子：**

```javascript
export default {
  // 1. 创建阶段
  beforeCreate() {
    // 实例刚被创建，data、methods 还未初始化
    console.log('beforeCreate');
  },
  
  created() {
    // 实例创建完成，data、methods 已初始化，可以访问
    console.log('created');
    // 可以在这里发起异步请求
    this.fetchData();
  },
  
  // 2. 挂载阶段
  beforeMount() {
    // 模板编译完成，但还未挂载到 DOM
    console.log('beforeMount');
  },
  
  mounted() {
    // 实例挂载到 DOM 完成，可以访问 DOM 元素
    console.log('mounted');
    // 可以在这里操作 DOM
    this.$refs.myElement.focus();
  },
  
  // 3. 更新阶段
  beforeUpdate() {
    // 数据更新时，DOM 更新之前调用
    console.log('beforeUpdate');
  },
  
  updated() {
    // DOM 更新完成
    console.log('updated');
    // 避免在这里修改数据，可能导致无限循环
  },
  
  // 4. 销毁阶段
  beforeDestroy() {
    // 实例销毁之前，可以清理定时器、事件监听等
    console.log('beforeDestroy');
    clearInterval(this.timer);
    window.removeEventListener('resize', this.handleResize);
  },
  
  destroyed() {
    // 实例销毁完成
    console.log('destroyed');
  }
};
```
 
**生命周期图示：**
```
new Vue()
    ↓
beforeCreate
    ↓
created
    ↓
beforeMount
    ↓
mounted
    ↓
beforeUpdate ←→ updated (数据变化时循环)
    ↓
beforeDestroy
    ↓
destroyed
```

### 问题：Vue2 的响应式原理是什么？

**答案：**

**Vue2 响应式原理：**
Vue2 使用 `Object.defineProperty` 来实现响应式，通过 getter/setter 来监听数据变化。

```javascript
// Vue2 响应式实现原理
function defineReactive(obj, key, val) {
  // 递归处理嵌套对象
  observe(val);
  
  Object.defineProperty(obj, key, {
    get() {
      console.log(`获取 ${key}: ${val}`);
      return val;
    },
    set(newVal) {
      if (newVal === val) return;
      console.log(`设置 ${key}: ${val} -> ${newVal}`);
      val = newVal;
      // 触发更新
      updateView();
    }
  });
}

function observe(obj) {
  if (typeof obj !== 'object' || obj === null) return;
  
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key]);
  });
}

// 使用示例
const data = {
  name: 'Vue',
  age: 3,
  info: {
    version: '2.6.14'
  }
};

observe(data);

// 测试响应式
data.name = 'Vue3'; // 触发 setter
console.log(data.name); // 触发 getter
```

**Vue2 响应式的局限性：**

1. **无法监听数组索引和长度变化**
```javascript
// Vue2 无法监听到这些变化
this.list[0] = 'new item';
this.list.length = 0;
```

2. **无法监听对象属性的添加和删除**
```javascript
// Vue2 无法监听到这些变化
this.obj.newProp = 'value';
delete this.obj.prop;
```

**解决方案：**

```javascript
// 1. 使用 Vue.set 或 this.$set
this.$set(this.list, 0, 'new item');
this.$set(this.obj, 'newProp', 'value');

// 2. 使用数组方法
this.list.splice(0, 1, 'new item');
this.list.push('new item');

// 3. 使用 Object.assign 或展开运算符
this.obj = { ...this.obj, newProp: 'value' };
```

## 2. 组件通信

### 问题：Vue2 中有哪些组件通信方式？

**答案：**

**1. Props / Events（父子通信）**
```javascript
// 父组件
<template>
  <div>
    <child-component 
      :message="parentMessage"
      @child-event="handleChildEvent"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      parentMessage: 'Hello from parent'
    };
  },
  methods: {
    handleChildEvent(data) {
      console.log('收到子组件事件:', data);
    }
  }
};
</script>

// 子组件
<template>
  <div>
    <p>{{ message }}</p>
    <button @click="sendToParent">发送给父组件</button>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true
    }
  },
  methods: {
    sendToParent() {
      this.$emit('child-event', 'Hello from child');
    }
  }
};
</script>
```

**2. 事件总线（跨级通信）**
```javascript
// 创建事件总线
// eventBus.js
import Vue from 'vue';
export const eventBus = new Vue();

// 组件A
<script>
import { eventBus } from './eventBus';

export default {
  methods: {
    sendMessage() {
      eventBus.$emit('custom-event', 'Hello from A');
    }
  }
};
</script>

// 组件B
<script>
import { eventBus } from './eventBus';

export default {
  mounted() {
    eventBus.$on('custom-event', (data) => {
      console.log('收到事件:', data);
    });
  },
  beforeDestroy() {
    // 记得移除事件监听
    eventBus.$off('custom-event');
  }
};
</script>
```

**3. Vuex（状态管理）**
```javascript
// store/index.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    user: null
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    async fetchUser({ commit }) {
      const user = await api.getUser();
      commit('setUser', user);
    }
  },
  getters: {
    doubleCount: state => state.count * 2,
    isLoggedIn: state => !!state.user
  }
});

// 组件中使用
<script>
export default {
  computed: {
    count() {
      return this.$store.state.count;
    },
    doubleCount() {
      return this.$store.getters.doubleCount;
    }
  },
  methods: {
    increment() {
      this.$store.commit('increment');
    },
    async fetchUser() {
      await this.$store.dispatch('fetchUser');
    }
  }
};
</script>
```

**4. provide/inject（依赖注入）**
```javascript
// 祖先组件
<script>
export default {
  provide() {
    return {
      theme: this.theme,
      updateTheme: this.updateTheme
    };
  },
  data() {
    return {
      theme: 'light'
    };
  },
  methods: {
    updateTheme(newTheme) {
      this.theme = newTheme;
    }
  }
};
</script>

// 后代组件
<script>
export default {
  inject: ['theme', 'updateTheme'],
  methods: {
    toggleTheme() {
      this.updateTheme(this.theme === 'light' ? 'dark' : 'light');
    }
  }
};
</script>
```

**5. $refs（直接访问）**
```javascript
// 父组件
<template>
  <div>
    <child-component ref="childRef" />
    <button @click="callChildMethod">调用子组件方法</button>
  </div>
</template>

<script>
export default {
  methods: {
    callChildMethod() {
      this.$refs.childRef.childMethod();
    }
  }
};
</script>

// 子组件
<script>
export default {
  methods: {
    childMethod() {
      console.log('子组件方法被调用');
    }
  }
};
</script>
```

## 3. 指令系统

### 问题：Vue2 中有哪些常用指令？如何自定义指令？

**答案：**

**内置指令：**

1. **v-bind / :**
```html
<!-- 绑定属性 -->
<img :src="imageSrc" :alt="imageAlt">
<div :class="{ active: isActive, 'text-danger': hasError }"></div>
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

2. **v-on / @**
```html
<!-- 事件绑定 -->
<button @click="handleClick">点击</button>
<input @input="handleInput" @keyup.enter="handleEnter">
<form @submit.prevent="handleSubmit">
```

3. **v-if / v-else / v-else-if**
```html
<!-- 条件渲染 -->
<div v-if="type === 'A'">A</div>
<div v-else-if="type === 'B'">B</div>
<div v-else>C</div>
```

4. **v-show**
```html
<!-- 条件显示 -->
<div v-show="isVisible">显示内容</div>
```

5. **v-for**
```html
<!-- 列表渲染 -->
<ul>
  <li v-for="(item, index) in items" :key="item.id">
    {{ index }} - {{ item.name }}
  </li>
</ul>

<!-- 遍历对象 -->
<div v-for="(value, key, index) in object" :key="key">
  {{ index }}. {{ key }}: {{ value }}
</div>
```

6. **v-model**
```html
<!-- 双向绑定 -->
<input v-model="message" placeholder="请输入">
<textarea v-model="description"></textarea>
<select v-model="selected">
  <option value="">请选择</option>
  <option value="A">选项A</option>
  <option value="B">选项B</option>
</select>

<!-- 自定义组件双向绑定 -->
<custom-input v-model="searchText"></custom-input>
```

**自定义指令：**

```javascript
// 全局注册
Vue.directive('focus', {
  // 指令定义对象
  bind(el, binding, vnode) {
    // 只调用一次，指令第一次绑定到元素时调用
    console.log('bind');
  },
  inserted(el, binding, vnode) {
    // 被绑定元素插入父节点时调用
    el.focus();
  },
  update(el, binding, vnode, oldVnode) {
    // 所在组件的 VNode 更新时调用
    console.log('update');
  },
  componentUpdated(el, binding, vnode, oldVnode) {
    // 所在组件的 VNode 及其子 VNode 全部更新后调用
    console.log('componentUpdated');
  },
  unbind(el, binding, vnode) {
    // 只调用一次，指令与元素解绑时调用
    console.log('unbind');
  }
});

// 局部注册
export default {
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      }
    },
    color: {
      bind(el, binding) {
        el.style.color = binding.value;
      },
      update(el, binding) {
        el.style.color = binding.value;
      }
    }
  }
};
```

**指令钩子函数参数：**
- `el`：指令所绑定的元素
- `binding`：一个对象，包含以下属性：
  - `name`：指令名
  - `value`：指令的绑定值
  - `oldValue`：指令绑定的前一个值
  - `expression`：字符串形式的指令表达式
  - `arg`：传给指令的参数
  - `modifiers`：一个包含修饰符的对象
- `vnode`：Vue 编译生成的虚拟节点
- `oldVnode`：上一个虚拟节点

**实际应用示例：**

```javascript
// 权限指令
Vue.directive('permission', {
  inserted(el, binding) {
    const { value } = binding;
    const permissions = store.state.user.permissions;
    
    if (!permissions.includes(value)) {
      el.parentNode.removeChild(el);
    }
  }
});

// 防抖指令
Vue.directive('debounce', {
  bind(el, binding) {
    const { value, arg = 300 } = binding;
    let timer = null;
    
    el.addEventListener('click', () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        value();
      }, arg);
    });
  }
});

// 使用
<button v-permission="'user:edit'">编辑</button>
<button v-debounce="handleClick" v-debounce:500>点击</button>
```

## 4. 计算属性与侦听器

### 问题：computed 和 watch 有什么区别？什么时候使用？

**答案：**

**computed（计算属性）：**

```javascript
export default {
  data() {
    return {
      firstName: 'John',
      lastName: 'Doe',
      items: [
        { id: 1, name: 'Apple', price: 10 },
        { id: 2, name: 'Banana', price: 5 },
        { id: 3, name: 'Orange', price: 8 }
      ]
    };
  },
  computed: {
    // 基本计算属性
    fullName() {
      return this.firstName + ' ' + this.lastName;
    },
    
    // 带缓存的复杂计算
    totalPrice() {
      return this.items.reduce((sum, item) => sum + item.price, 0);
    },
    
    // 计算属性也可以有 getter 和 setter
    fullNameWithSetter: {
      get() {
        return this.firstName + ' ' + this.lastName;
      },
      set(value) {
        const names = value.split(' ');
        this.firstName = names[0];
        this.lastName = names[1];
      }
    }
  }
};
```

**watch（侦听器）：**

```javascript
export default {
  data() {
    return {
      searchQuery: '',
      searchResults: [],
      user: {
        name: 'John',
        age: 25
      }
    };
  },
  watch: {
    // 基本侦听
    searchQuery(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.search();
      }
    },
    
    // 深度侦听对象
    user: {
      handler(newVal, oldVal) {
        console.log('用户信息变化:', newVal);
        this.saveUser();
      },
      deep: true,
      immediate: true
    },
    
    // 侦听特定属性
    'user.name'(newVal, oldVal) {
      console.log('用户名变化:', newVal);
    }
  },
  methods: {
    search() {
      // 执行搜索逻辑
      this.searchResults = this.performSearch(this.searchQuery);
    },
    saveUser() {
      // 保存用户信息
      api.saveUser(this.user);
    }
  }
};
```

**区别总结：**

| 特性 | computed | watch |
|------|----------|-------|
| 缓存 | ✅ 有缓存 | ❌ 无缓存 |
| 异步 | ❌ 不支持 | ✅ 支持 |
| 性能 | 更好 | 较差 |
| 使用场景 | 数据依赖计算 | 数据变化响应 |

**使用建议：**

1. **使用 computed 的场景：**
   - 需要基于其他数据计算新值
   - 需要缓存计算结果
   - 计算逻辑相对简单

```javascript
// 推荐使用 computed
computed: {
  fullName() {
    return this.firstName + ' ' + this.lastName;
  },
  filteredItems() {
    return this.items.filter(item => item.price > 5);
  }
}
```

2. **使用 watch 的场景：**
   - 需要在数据变化时执行异步操作
   - 需要执行副作用（如 API 调用、DOM 操作）
   - 需要监听路由变化

```javascript
// 推荐使用 watch
watch: {
  searchQuery: {
    handler(newVal) {
      this.debouncedSearch(newVal);
    },
    immediate: true
  },
  '$route'(to, from) {
    this.handleRouteChange(to, from);
  }
}
```

## 5. 路由管理

### 问题：Vue Router 的基本用法和高级特性有哪些？

**答案：**

**基本配置：**

```javascript
// router/index.js
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页',
      requiresAuth: false
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: '关于',
      requiresAuth: false
    }
  },
  {
    path: '/user/:id',
    name: 'User',
    component: () => import('@/views/User.vue'), // 懒加载
    props: true, // 将路由参数作为 props 传递
    meta: {
      title: '用户详情',
      requiresAuth: true
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/Admin.vue'),
    meta: {
      title: '管理后台',
      requiresAuth: true,
      roles: ['admin']
    },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/admin/Dashboard.vue')
      },
      {
        path: 'users',
        name: 'UserManagement',
        component: () => import('@/views/admin/UserManagement.vue')
      }
    ]
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  },
  {
    path: '*',
    redirect: '/404'
  }
];

const router = new VueRouter({
  mode: 'history', // 使用 history 模式
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title || 'Vue App';
  
  // 检查是否需要认证
  if (to.meta.requiresAuth && !store.state.isAuthenticated) {
    next('/login');
    return;
  }
  
  // 检查角色权限
  if (to.meta.roles && !to.meta.roles.includes(store.state.userRole)) {
    next('/403');
    return;
  }
  
  next();
});

// 全局后置钩子
router.afterEach((to, from) => {
  // 页面访问统计
  analytics.trackPageView(to.path);
});

export default router;
```

**路由导航：**

```javascript
// 编程式导航
export default {
  methods: {
    goToHome() {
      this.$router.push('/');
    },
    goToUser(id) {
      this.$router.push({
        name: 'User',
        params: { id }
      });
    },
    goToAbout() {
      this.$router.push({
        name: 'About',
        query: { tab: 'info' }
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    replaceCurrent() {
      this.$router.replace('/new-path');
    }
  }
};
```

**路由参数获取：**

```javascript
export default {
  // 通过 props 接收参数
  props: {
    id: {
      type: String,
      required: true
    }
  },
  
  // 或者通过 this.$route 获取
  mounted() {
    console.log(this.$route.params.id);
    console.log(this.$route.query.tab);
  },
  
  // 监听路由变化
  watch: {
    '$route'(to, from) {
      console.log('路由从', from.path, '变化到', to.path);
      this.loadUserData(to.params.id);
    }
  }
};
```

**路由懒加载和代码分割：**

```javascript
// 基本懒加载
const User = () => import('@/views/User.vue');

// 带注释的懒加载（用于 webpack 代码分割）
const Admin = () => import(/* webpackChunkName: "admin" */ '@/views/Admin.vue');

// 预加载
const About = () => import(/* webpackPrefetch: true */ '@/views/About.vue');

// 条件加载
const ConditionalComponent = () => {
  if (process.env.NODE_ENV === 'development') {
    return import('@/views/DevTools.vue');
  }
  return Promise.resolve(null);
};
```

## 6. 状态管理

### 问题：Vuex 的核心概念和使用方法是什么？

**答案：**

**Vuex 核心概念：**

```javascript
// store/index.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  // 状态
  state: {
    count: 0,
    user: null,
    todos: [],
    loading: false
  },
  
  // 计算属性
  getters: {
    doubleCount: state => state.count * 2,
    isLoggedIn: state => !!state.user,
    completedTodos: state => state.todos.filter(todo => todo.completed),
    todoCount: (state, getters) => getters.completedTodos.length
  },
  
  // 同步修改
  mutations: {
    increment(state) {
      state.count++;
    },
    setUser(state, user) {
      state.user = user;
    },
    addTodo(state, todo) {
      state.todos.push(todo);
    },
    toggleTodo(state, id) {
      const todo = state.todos.find(t => t.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    setLoading(state, loading) {
      state.loading = loading;
    }
  },
  
  // 异步操作
  actions: {
    async login({ commit }, credentials) {
      commit('setLoading', true);
      try {
        const user = await api.login(credentials);
        commit('setUser', user);
        return user;
      } catch (error) {
        throw error;
      } finally {
        commit('setLoading', false);
      }
    },
    
    async fetchTodos({ commit }) {
      commit('setLoading', true);
      try {
        const todos = await api.getTodos();
        todos.forEach(todo => commit('addTodo', todo));
      } catch (error) {
        console.error('获取待办事项失败:', error);
      } finally {
        commit('setLoading', false);
      }
    },
    
    // 组合多个 actions
    async initializeApp({ dispatch }) {
      await Promise.all([
        dispatch('fetchTodos'),
        dispatch('fetchUserInfo')
      ]);
    }
  },
  
  // 模块化
  modules: {
    cart: {
      namespaced: true,
      state: {
        items: []
      },
      getters: {
        totalItems: state => state.items.length,
        totalPrice: state => state.items.reduce((sum, item) => sum + item.price, 0)
      },
      mutations: {
        addItem(state, item) {
          state.items.push(item);
        },
        removeItem(state, id) {
          const index = state.items.findIndex(item => item.id === id);
          if (index > -1) {
            state.items.splice(index, 1);
          }
        }
      },
      actions: {
        async checkout({ commit, state }) {
          await api.checkout(state.items);
          commit('clearCart');
        }
      }
    }
  }
});
```

**在组件中使用：**

```javascript
// 组件中使用 Vuex
export default {
  computed: {
    // 映射 state
    ...mapState(['count', 'user', 'loading']),
    
    // 映射 getters
    ...mapGetters(['doubleCount', 'isLoggedIn']),
    
    // 自定义计算属性
    userDisplayName() {
      return this.user ? this.user.name : 'Guest';
    }
  },
  
  methods: {
    // 映射 mutations
    ...mapMutations(['increment', 'setUser']),
    
    // 映射 actions
    ...mapActions(['login', 'fetchTodos']),
    
    // 自定义方法
    async handleLogin() {
      try {
        await this.login({ username: 'admin', password: '123456' });
        this.$router.push('/dashboard');
      } catch (error) {
        this.$message.error('登录失败');
      }
    },
    
    // 模块化访问
    addToCart(item) {
      this.$store.commit('cart/addItem', item);
    }
  }
};
```

**Vuex 插件：**

```javascript
// 持久化插件
const persistPlugin = store => {
  // 初始化时从 localStorage 恢复状态
  const savedState = localStorage.getItem('vuex-state');
  if (savedState) {
    store.replaceState(JSON.parse(savedState));
  }
  
  // 状态变化时保存到 localStorage
  store.subscribe((mutation, state) => {
    localStorage.setItem('vuex-state', JSON.stringify(state));
  });
};

// 日志插件
const loggerPlugin = store => {
  store.subscribe((mutation, state) => {
    console.log('Mutation:', mutation.type, mutation.payload);
    console.log('New State:', state);
  });
};

// 使用插件
const store = new Vuex.Store({
  // ... store 配置
  plugins: [persistPlugin, loggerPlugin]
});
```

## 7. 性能优化

### 问题：Vue2 中有哪些性能优化技巧？

**答案：**

**1. 组件懒加载**

```javascript
// 路由懒加载
const User = () => import('@/views/User.vue');

// 组件懒加载
export default {
  components: {
    HeavyComponent: () => import('@/components/HeavyComponent.vue')
  }
};
```

**2. 使用 v-show 代替 v-if**

```html
<!-- 频繁切换使用 v-show -->
<div v-show="isVisible">内容</div>

<!-- 条件渲染使用 v-if -->
<div v-if="shouldRender">内容</div>
```

**3. 使用 key 优化列表渲染**

```html
<!-- 使用唯一 key -->
<ul>
  <li v-for="item in items" :key="item.id">
    {{ item.name }}
  </li>
</ul>

<!-- 避免使用 index 作为 key -->
<ul>
  <li v-for="(item, index) in items" :key="index">
    {{ item.name }}
  </li>
</ul>
```

**4. 计算属性缓存**

```javascript
export default {
  data() {
    return {
      items: [/* 大量数据 */]
    };
  },
  computed: {
    // 使用计算属性缓存结果
    filteredItems() {
      return this.items.filter(item => item.active);
    },
    expensiveCalculation() {
      return this.items.reduce((sum, item) => {
        // 复杂计算
        return sum + this.heavyCalculation(item);
      }, 0);
    }
  }
};
```

**5. 使用 Object.freeze 冻结大数据**

```javascript
export default {
  data() {
    return {
      // 冻结不会变化的大数据
      staticData: Object.freeze([
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' }
      ])
    };
  }
};
```

**6. 防抖和节流**

```javascript
// 防抖
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 节流
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

export default {
  methods: {
    handleSearch: debounce(function(query) {
      this.search(query);
    }, 300),
    
    handleScroll: throttle(function() {
      this.updateScrollPosition();
    }, 100)
  }
};
```

**7. 使用 keep-alive 缓存组件**

```html
<template>
  <div>
    <keep-alive :include="['UserList', 'UserDetail']">
      <router-view />
    </keep-alive>
  </div>
</template>
```

**8. 合理使用 v-once**

```html
<!-- 静态内容使用 v-once -->
<div v-once>
  <h1>{{ title }}</h1>
  <p>{{ staticContent }}</p>
</div>
```

**9. 避免在模板中使用复杂表达式**

```html
<!-- 不好 -->
<div>{{ items.filter(item => item.active).length }}</div>

<!-- 好 -->
<div>{{ activeItemsCount }}</div>
```

```javascript
export default {
  computed: {
    activeItemsCount() {
      return this.items.filter(item => item.active).length;
    }
  }
};
```

**10. 使用 Vue.set 处理响应式数据**

```javascript
export default {
  data() {
    return {
      user: {
        name: 'John',
        age: 25
      }
    };
  },
  methods: {
    updateUser() {
      // 添加新属性
      this.$set(this.user, 'email', 'john@example.com');
      
      // 更新数组
      this.$set(this.items, 0, { id: 1, name: 'Updated Item' });
    }
  }
};
```

## 8. 错误处理

### 问题：Vue2 中如何优雅地处理错误？

**答案：**

**1. 全局错误处理**

```javascript
// main.js
Vue.config.errorHandler = function(err, vm, info) {
  console.error('Vue 错误:', err);
  console.error('错误信息:', info);
  
  // 发送错误到服务器
  errorReporter.captureException(err, {
    component: vm.$options.name,
    info: info
  });
};

// 处理异步错误
Vue.config.warnHandler = function(msg, vm, trace) {
  console.warn('Vue 警告:', msg);
  console.warn('组件栈:', trace);
};
```

**2. 组件错误边界**

```javascript
// ErrorBoundary.vue
<template>
  <div>
    <div v-if="error" class="error-boundary">
      <h2>出错了！</h2>
      <p>{{ error.message }}</p>
      <button @click="resetError">重试</button>
    </div>
    <slot v-else />
  </div>
</template>

<script>
export default {
  name: 'ErrorBoundary',
  data() {
    return {
      error: null
    };
  },
  errorCaptured(err, vm, info) {
    this.error = err;
    console.error('组件错误:', err);
    return false; // 阻止错误继续传播
  },
  methods: {
    resetError() {
      this.error = null;
    }
  }
};
</script>

// 使用
<template>
  <div>
    <error-boundary>
      <problematic-component />
    </error-boundary>
  </div>
</template>
```

**3. 异步错误处理**

```javascript
export default {
  async mounted() {
    try {
      await this.fetchData();
    } catch (error) {
      this.handleError(error);
    }
  },
  methods: {
    async fetchData() {
      try {
        const response = await api.getData();
        this.data = response.data;
      } catch (error) {
        if (error.response) {
          // 服务器错误
          this.$message.error(`服务器错误: ${error.response.status}`);
        } else if (error.request) {
          // 网络错误
          this.$message.error('网络连接失败');
        } else {
          // 其他错误
          this.$message.error('未知错误');
        }
        throw error; // 重新抛出错误
      }
    },
    
    handleError(error) {
      console.error('处理错误:', error);
      this.$notify({
        type: 'error',
        title: '错误',
        message: '数据加载失败，请重试'
      });
    }
  }
};
```

**4. 路由错误处理**

```javascript
// router/index.js
const router = new VueRouter({
  routes: [
    // ... 路由配置
  ]
});

router.onError((error) => {
  console.error('路由错误:', error);
  
  if (error.name === 'ChunkLoadError') {
    // 代码分割加载失败
    window.location.reload();
  }
});

// 404 处理
router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    next('/404');
  } else {
    next();
  }
});
```

**5. 自定义错误类**

```javascript
// utils/errors.js
export class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

export class NetworkError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'NetworkError';
    this.statusCode = statusCode;
  }
}

// 在组件中使用
import { ValidationError, NetworkError } from '@/utils/errors';

export default {
  methods: {
    validateForm() {
      if (!this.form.name) {
        throw new ValidationError('姓名不能为空', 'name');
      }
      if (!this.form.email) {
        throw new ValidationError('邮箱不能为空', 'email');
      }
    },
    
    async submitForm() {
      try {
        this.validateForm();
        await api.submitForm(this.form);
        this.$message.success('提交成功');
      } catch (error) {
        if (error instanceof ValidationError) {
          this.$message.error(`${error.field}: ${error.message}`);
        } else if (error instanceof NetworkError) {
          this.$message.error('网络错误，请重试');
        } else {
          this.$message.error('提交失败');
        }
      }
    }
  }
};
```
