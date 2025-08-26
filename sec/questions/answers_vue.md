# Vue 面试题详细答案

## 1. Vue中如何定义全局方法

### Vue2 定义全局方法

#### 方法1：Vue.prototype（最常用）
```javascript
// main.js
import Vue from 'vue'
import App from './App.vue'

// 定义全局方法
Vue.prototype.$formatDate = function(date) {
  return new Date(date).toLocaleDateString()
}

Vue.prototype.$formatPrice = function(price) {
  return `¥${price.toFixed(2)}`
}

Vue.prototype.$showMessage = function(message, type = 'info') {
  console.log(`${type}: ${message}`)
}

new Vue({
  render: h => h(App)
}).$mount('#app')
```

**在组件中使用：**
```vue
<template>
  <div>
    <p>{{ $formatDate(new Date()) }}</p>
    <p>{{ $formatPrice(99.99) }}</p>
    <button @click="showMessage">显示消息</button>
  </div>
</template>

<script>
export default {
  methods: {
    showMessage() {
      this.$showMessage('这是一条消息', 'success')
    }
  }
}
</script>
```

#### 方法2：插件方式（推荐）
```javascript
// plugins/globalMethods.js
export default {
  install(Vue, options) {
    // 全局方法
    Vue.prototype.$formatDate = function(date) {
      return new Date(date).toLocaleDateString()
    }
    
    Vue.prototype.$formatPrice = function(price) {
      return `¥${price.toFixed(2)}`
    }
    
    // 全局属性
    Vue.prototype.$appName = 'My Vue App'
    
    // 全局指令
    Vue.directive('format-date', {
      bind(el, binding) {
        const date = new Date(binding.value)
        el.textContent = date.toLocaleDateString()
      }
    })
    
    // 全局过滤器
    Vue.filter('formatDate', function(value) {
      if (!value) return ''
      return new Date(value).toLocaleDateString()
    })
  }
}

// main.js
import Vue from 'vue'
import GlobalMethods from './plugins/globalMethods'

Vue.use(GlobalMethods)
```

#### 方法3：Vue.mixin
```javascript
// mixins/globalMethods.js
export const globalMethods = {
  methods: {
    $formatDate(date) {
      return new Date(date).toLocaleDateString()
    },
    
    $formatPrice(price) {
      return `¥${price.toFixed(2)}`
    }
  }
}

// main.js
import Vue from 'vue'
import { globalMethods } from './mixins/globalMethods'

Vue.mixin(globalMethods)
```

### Vue3 定义全局方法

#### 方法1：app.config.globalProperties（最常用）
```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// 定义全局方法
app.config.globalProperties.$formatDate = function(date) {
  return new Date(date).toLocaleDateString()
}

app.config.globalProperties.$formatPrice = function(price) {
  return `¥${price.toFixed(2)}`
}

app.config.globalProperties.$showMessage = function(message, type = 'info') {
  console.log(`${type}: ${message}`)
}

app.mount('#app')
```

#### 方法2：Composition API（推荐）
```javascript
// composables/useGlobalMethods.js
import { getCurrentInstance } from 'vue'

export function useGlobalMethods() {
  const { proxy } = getCurrentInstance()
  
  return {
    formatDate: proxy.$formatDate,
    formatPrice: proxy.$formatPrice,
    showMessage: proxy.$showMessage
  }
}

// 在组件中使用
<script>
import { useGlobalMethods } from '@/composables/useGlobalMethods'

export default {
  setup() {
    const { formatDate, formatPrice, showMessage } = useGlobalMethods()
    
    return {
      formatDate,
      formatPrice,
      showMessage
    }
  }
}
</script>
```

#### 方法3：provide/inject
```javascript
// main.js
app.provide('globalMethods', {
  formatDate(date) {
    return new Date(date).toLocaleDateString()
  },
  
  formatPrice(price) {
    return `¥${price.toFixed(2)}`
  }
})

// 在组件中使用
<script>
import { inject } from 'vue'

export default {
  setup() {
    const { formatDate, formatPrice } = inject('globalMethods')
    
    return {
      formatDate,
      formatPrice
    }
  }
}
</script>
```

## 2. Vue的MVVM模式

### MVVM模式详解

MVVM（Model-View-ViewModel）是一种软件架构模式，Vue.js就是基于MVVM模式设计的。

#### 核心概念

**Model（模型）**：
- 代表数据和业务逻辑
- 在Vue中通常是data、computed、methods等

**View（视图）**：
- 用户界面
- 在Vue中就是template模板

**ViewModel（视图模型）**：
- 连接Model和View的桥梁
- 在Vue中就是Vue实例

### Vue中的MVVM实现

```vue
<template>
  <!-- View层 -->
  <div>
    <input v-model="message" placeholder="输入消息">
    <p>{{ message }}</p>
    <button @click="reverseMessage">反转消息</button>
  </div>
</template>

<script>
export default {
  // ViewModel层
  data() {
    return {
      // Model层
      message: 'Hello Vue!'
    }
  },
  
  methods: {
    reverseMessage() {
      this.message = this.message.split('').reverse().join('')
    }
  }
}
</script>
```

### 数据绑定机制

#### 1. 单向数据绑定
```vue
<template>
  <div>
    <p>{{ message }}</p> <!-- Model -> View -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello Vue!'
    }
  }
}
</script>
```

#### 2. 双向数据绑定
```vue
<template>
  <div>
    <input v-model="message"> <!-- View <-> Model -->
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello Vue!'
    }
  }
}
</script>
```

### MVVM的优势

1. **数据驱动视图**：数据变化自动更新视图
2. **视图驱动数据**：用户操作自动更新数据
3. **关注点分离**：业务逻辑与视图分离
4. **可测试性**：ViewModel可以独立测试
5. **可维护性**：代码结构清晰，易于维护

## 3. Vue2和Vue3的核心区别

### 1. 性能提升

#### Vue3性能优化
```javascript
// Vue3 静态提升
const hoisted = createVNode('div', null, 'static content')

// Vue3 树摇优化
import { ref, computed } from 'vue' // 只打包使用的功能

// Vue3 更好的Tree-shaking
```

#### 对比示例
```javascript
// Vue2 - 所有功能都会被打包
import Vue from 'vue' // 整个Vue对象

// Vue3 - 按需导入
import { createApp, ref, computed } from 'vue' // 只导入需要的功能
```

### 2. Composition API vs Options API

#### Vue2 Options API
```vue
<template>
  <div>
    <p>{{ count }}</p>
    <button @click="increment">增加</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  
  computed: {
    doubleCount() {
      return this.count * 2
    }
  },
  
  methods: {
    increment() {
      this.count++
    }
  },
  
  mounted() {
    console.log('组件已挂载')
  }
}
</script>
```

#### Vue3 Composition API
```vue
<template>
  <div>
    <p>{{ count }}</p>
    <button @click="increment">增加</button>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'

export default {
  setup() {
    const count = ref(0)
    
    const doubleCount = computed(() => count.value * 2)
    
    const increment = () => {
      count.value++
    }
    
    onMounted(() => {
      console.log('组件已挂载')
    })
    
    return {
      count,
      doubleCount,
      increment
    }
  }
}
</script>
```

### 3. 响应式系统

#### Vue2响应式
```javascript
// Vue2 使用 Object.defineProperty
const data = { message: 'Hello' }

Object.defineProperty(data, 'message', {
  get() {
    return this._message
  },
  set(value) {
    this._message = value
    // 触发更新
  }
})
```

#### Vue3响应式
```javascript
// Vue3 使用 Proxy
const data = { message: 'Hello' }

const reactiveData = new Proxy(data, {
  get(target, key) {
    track(target, key) // 依赖收集
    return target[key]
  },
  set(target, key, value) {
    target[key] = value
    trigger(target, key) // 触发更新
    return true
  }
})
```

### 4. 新特性对比

#### Vue2特性
```javascript
// 过滤器
Vue.filter('formatDate', function(value) {
  return new Date(value).toLocaleDateString()
})

// 事件总线
Vue.prototype.$bus = new Vue()

// 全局混入
Vue.mixin({
  created() {
    console.log('全局混入')
  }
})
```

#### Vue3特性
```javascript
// 组合式函数
function useCounter() {
  const count = ref(0)
  const increment = () => count.value++
  return { count, increment }
}

// Teleport
<teleport to="body">
  <div>传送到body</div>
</teleport>

// Fragments
<template>
  <div>第一个根元素</div>
  <div>第二个根元素</div>
</template>
```

## 4. Vue2和Vue3的生命周期

### Vue2生命周期

```javascript
export default {
  // 创建阶段
  beforeCreate() {
    // 实例刚被创建，data和methods还未初始化
    console.log('beforeCreate')
  },
  
  created() {
    // 实例创建完成，data和methods已初始化
    console.log('created')
  },
  
  // 挂载阶段
  beforeMount() {
    // 模板编译完成，但还未挂载到DOM
    console.log('beforeMount')
  },
  
  mounted() {
    // 组件已挂载到DOM
    console.log('mounted')
  },
  
  // 更新阶段
  beforeUpdate() {
    // 数据更新时，DOM更新前调用
    console.log('beforeUpdate')
  },
  
  updated() {
    // DOM更新完成
    console.log('updated')
  },
  
  // 销毁阶段
  beforeDestroy() {
    // 组件销毁前调用
    console.log('beforeDestroy')
  },
  
  destroyed() {
    // 组件已销毁
    console.log('destroyed')
  }
}
```

### Vue3生命周期

```javascript
import { 
  onBeforeMount, 
  onMounted, 
  onBeforeUpdate, 
  onUpdated,
  onBeforeUnmount,
  onUnmounted 
} from 'vue'

export default {
  setup() {
    // 创建阶段（setup替代了beforeCreate和created）
    console.log('setup - 相当于beforeCreate + created')
    
    // 挂载阶段
    onBeforeMount(() => {
      console.log('onBeforeMount')
    })
    
    onMounted(() => {
      console.log('onMounted')
    })
    
    // 更新阶段
    onBeforeUpdate(() => {
      console.log('onBeforeUpdate')
    })
    
    onUpdated(() => {
      console.log('onUpdated')
    })
    
    // 销毁阶段
    onBeforeUnmount(() => {
      console.log('onBeforeUnmount')
    })
    
    onUnmounted(() => {
      console.log('onUnmounted')
    })
  }
}
```

### 生命周期对比

| Vue2 | Vue3 | 说明 |
|------|------|------|
| beforeCreate | setup() | 实例创建前 |
| created | setup() | 实例创建后 |
| beforeMount | onBeforeMount | 挂载前 |
| mounted | onMounted | 挂载后 |
| beforeUpdate | onBeforeUpdate | 更新前 |
| updated | onUpdated | 更新后 |
| beforeDestroy | onBeforeUnmount | 销毁前 |
| destroyed | onUnmounted | 销毁后 |

## 5. Vue3中的setup

### setup函数详解

#### 基本用法
```vue
<template>
  <div>
    <p>{{ count }}</p>
    <button @click="increment">增加</button>
    <p>{{ doubleCount }}</p>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'

export default {
  setup() {
    // 响应式数据
    const count = ref(0)
    
    // 计算属性
    const doubleCount = computed(() => count.value * 2)
    
    // 方法
    const increment = () => {
      count.value++
    }
    
    // 生命周期
    onMounted(() => {
      console.log('组件已挂载')
    })
    
    // 返回模板需要的数据和方法
    return {
      count,
      doubleCount,
      increment
    }
  }
}
</script>
```

#### 语法糖写法
```vue
<template>
  <div>
    <p>{{ count }}</p>
    <button @click="increment">增加</button>
    <p>{{ doubleCount }}</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// 响应式数据
const count = ref(0)

// 计算属性
const doubleCount = computed(() => count.value * 2)

// 方法
const increment = () => {
  count.value++
}

// 生命周期
onMounted(() => {
  console.log('组件已挂载')
})
</script>
```

### setup中的响应式API

#### ref和reactive
```javascript
import { ref, reactive } from 'vue'

export default {
  setup() {
    // ref用于基本类型
    const count = ref(0)
    const message = ref('Hello')
    
    // reactive用于对象
    const user = reactive({
      name: 'John',
      age: 30
    })
    
    // 访问和修改
    console.log(count.value) // 0
    count.value = 1
    
    console.log(user.name) // John
    user.name = 'Jane'
    
    return {
      count,
      message,
      user
    }
  }
}
```

#### computed和watch
```javascript
import { ref, computed, watch, watchEffect } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const name = ref('John')
    
    // 计算属性
    const doubleCount = computed(() => count.value * 2)
    
    // 监听器
    watch(count, (newValue, oldValue) => {
      console.log(`count从${oldValue}变为${newValue}`)
    })
    
    // 立即执行的监听器
    watchEffect(() => {
      console.log(`count: ${count.value}, name: ${name.value}`)
    })
    
    return {
      count,
      name,
      doubleCount
    }
  }
}
```

### setup中的生命周期

```javascript
import { 
  onBeforeMount, 
  onMounted, 
  onBeforeUpdate, 
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onErrorCaptured
} from 'vue'

export default {
  setup() {
    onBeforeMount(() => {
      console.log('挂载前')
    })
    
    onMounted(() => {
      console.log('挂载后')
    })
    
    onBeforeUpdate(() => {
      console.log('更新前')
    })
    
    onUpdated(() => {
      console.log('更新后')
    })
    
    onBeforeUnmount(() => {
      console.log('卸载前')
    })
    
    onUnmounted(() => {
      console.log('卸载后')
    })
    
    onErrorCaptured((error, instance, info) => {
      console.log('错误捕获:', error)
    })
  }
}
```

### setup中的依赖注入

```javascript
import { provide, inject } from 'vue'

// 父组件
export default {
  setup() {
    const theme = ref('dark')
    
    provide('theme', theme)
    provide('updateTheme', (newTheme) => {
      theme.value = newTheme
    })
  }
}

// 子组件
export default {
  setup() {
    const theme = inject('theme', 'light') // 默认值
    const updateTheme = inject('updateTheme')
    
    return {
      theme,
      updateTheme
    }
  }
}
```

## 6. Vue2和Vue3的响应式原理

### Vue2响应式原理

#### Object.defineProperty实现
```javascript
// Vue2响应式实现
function defineReactive(obj, key, val) {
  // 递归处理嵌套对象
  observe(val)
  
  Object.defineProperty(obj, key, {
    get() {
      console.log(`获取${key}: ${val}`)
      return val
    },
    set(newVal) {
      if (newVal === val) return
      console.log(`设置${key}: ${newVal}`)
      val = newVal
      // 触发更新
      notify()
    }
  })
}

function observe(obj) {
  if (typeof obj !== 'object' || obj === null) return
  
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
}

// 使用示例
const data = { message: 'Hello' }
observe(data)

console.log(data.message) // 获取message: Hello
data.message = 'World' // 设置message: World
```

#### Vue2响应式的局限性
```javascript
// 1. 无法监听数组索引和length变化
const arr = [1, 2, 3]
observe(arr)
arr[0] = 10 // 不会触发更新
arr.length = 0 // 不会触发更新

// 2. 无法监听对象属性的添加和删除
const obj = { name: 'John' }
observe(obj)
obj.age = 30 // 不会触发更新
delete obj.name // 不会触发更新

// 3. 需要递归遍历对象
const deepObj = {
  user: {
    profile: {
      name: 'John'
    }
  }
}
// 需要递归处理每一层
```

### Vue3响应式原理

#### Proxy实现
```javascript
// Vue3响应式实现
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      console.log(`获取${key}: ${target[key]}`)
      track(target, key) // 依赖收集
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      console.log(`设置${key}: ${value}`)
      const result = Reflect.set(target, key, value, receiver)
      trigger(target, key) // 触发更新
      return result
    },
    deleteProperty(target, key) {
      console.log(`删除${key}`)
      const result = Reflect.deleteProperty(target, key)
      trigger(target, key) // 触发更新
      return result
    }
  })
}

// 依赖收集和触发更新
const targetMap = new WeakMap()

function track(target, key) {
  // 收集依赖
  if (activeEffect) {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()))
    }
    let dep = depsMap.get(key)
    if (!dep) {
      depsMap.set(key, (dep = new Set()))
    }
    dep.add(activeEffect)
  }
}

function trigger(target, key) {
  // 触发更新
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  
  const dep = depsMap.get(key)
  if (dep) {
    dep.forEach(effect => effect())
  }
}

// 使用示例
const data = reactive({ message: 'Hello' })

console.log(data.message) // 获取message: Hello
data.message = 'World' // 设置message: World
data.newProp = 'New' // 设置newProp: New
delete data.message // 删除message
```

#### Vue3响应式的优势
```javascript
// 1. 可以监听数组索引变化
const arr = reactive([1, 2, 3])
arr[0] = 10 // 会触发更新
arr.length = 0 // 会触发更新

// 2. 可以监听对象属性的添加和删除
const obj = reactive({ name: 'John' })
obj.age = 30 // 会触发更新
delete obj.name // 会触发更新

// 3. 支持Map、Set等数据结构
const map = reactive(new Map())
map.set('key', 'value') // 会触发更新

const set = reactive(new Set())
set.add('item') // 会触发更新
```

### 响应式API对比

#### Vue2响应式API
```javascript
// Vue2
export default {
  data() {
    return {
      message: 'Hello',
      user: {
        name: 'John',
        age: 30
      }
    }
  },
  
  computed: {
    fullName() {
      return `${this.user.name} ${this.user.age}`
    }
  },
  
  watch: {
    message(newVal, oldVal) {
      console.log(`message从${oldVal}变为${newVal}`)
    }
  }
}
```

#### Vue3响应式API
```javascript
// Vue3
import { ref, reactive, computed, watch } from 'vue'

export default {
  setup() {
    // 基本类型使用ref
    const message = ref('Hello')
    
    // 对象使用reactive
    const user = reactive({
      name: 'John',
      age: 30
    })
    
    // 计算属性
    const fullName = computed(() => {
      return `${user.name} ${user.age}`
    })
    
    // 监听器
    watch(message, (newVal, oldVal) => {
      console.log(`message从${oldVal}变为${newVal}`)
    })
    
    return {
      message,
      user,
      fullName
    }
  }
}
```

### 性能对比

#### Vue2性能问题
```javascript
// 1. 需要递归遍历对象
const deepObj = {
  level1: {
    level2: {
      level3: {
        value: 'deep'
      }
    }
  }
}
// 需要递归处理每一层，性能较差

// 2. 无法监听数组索引变化
const arr = [1, 2, 3]
// 需要特殊处理数组方法

// 3. 需要Vue.set和Vue.delete
this.$set(this.user, 'age', 30)
this.$delete(this.user, 'name')
```

#### Vue3性能优势
```javascript
// 1. 懒代理，按需响应式
const obj = reactive({
  deep: {
    nested: {
      value: 'deep'
    }
  }
})
// 只有在访问时才会创建代理

// 2. 更好的Tree-shaking
import { ref, computed } from 'vue'
// 只打包使用的功能

// 3. 更精确的依赖收集
const count = ref(0)
const double = computed(() => count.value * 2)
// 只有count变化时才会重新计算
```

### 总结

#### Vue2响应式特点：
- ✅ 使用Object.defineProperty
- ❌ 无法监听数组索引变化
- ❌ 无法监听对象属性添加/删除
- ❌ 需要递归遍历对象
- ❌ 需要Vue.set和Vue.delete

#### Vue3响应式特点：
- ✅ 使用Proxy
- ✅ 可以监听数组索引变化
- ✅ 可以监听对象属性添加/删除
- ✅ 支持Map、Set等数据结构
- ✅ 懒代理，性能更好
- ✅ 更精确的依赖收集 