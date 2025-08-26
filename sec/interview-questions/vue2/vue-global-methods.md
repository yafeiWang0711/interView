# Vue2/Vue3 全局方法定义详解

## Vue2 全局方法定义

### 1. Vue.prototype 方式（最常用）

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
  // 实现消息提示逻辑
  console.log(`${type}: ${message}`)
}

// 全局工具方法
Vue.prototype.$utils = {
  debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  },
  
  throttle(func, limit) {
    let inThrottle
    return function() {
      const args = arguments
      const context = this
      if (!inThrottle) {
        func.apply(context, args)
        inThrottle = true
        setTimeout(() => inThrottle = false, limit)
      }
    }
  }
}

new Vue({
  render: h => h(App)
}).$mount('#app')
```

**在组件中使用：**
```vue
<template>
  <div>
    <p>格式化日期: {{ $formatDate(new Date()) }}</p>
    <p>格式化价格: {{ $formatPrice(99.99) }}</p>
    <button @click="showMessage">显示消息</button>
    <button @click="debouncedFunction">防抖函数</button>
  </div>
</template>

<script>
export default {
  name: 'MyComponent',
  methods: {
    showMessage() {
      this.$showMessage('这是一条消息', 'success')
    },
    
    debouncedFunction: this.$utils.debounce(function() {
      console.log('防抖函数执行')
    }, 300)
  }
}
</script>
```

### 2. Vue.mixin 方式

```javascript
// mixins/globalMethods.js
export const globalMethods = {
  methods: {
    $formatDate(date) {
      return new Date(date).toLocaleDateString()
    },
    
    $formatPrice(price) {
      return `¥${price.toFixed(2)}`
    },
    
    $showMessage(message, type = 'info') {
      console.log(`${type}: ${message}`)
    },
    
    $validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return re.test(email)
    }
  }
}

// main.js
import Vue from 'vue'
import { globalMethods } from './mixins/globalMethods'

Vue.mixin(globalMethods)
```

### 3. Vue.directive 方式（指令形式）

```javascript
// main.js
import Vue from 'vue'

// 定义全局指令
Vue.directive('format-date', {
  bind(el, binding) {
    const date = new Date(binding.value)
    el.textContent = date.toLocaleDateString()
  },
  update(el, binding) {
    const date = new Date(binding.value)
    el.textContent = date.toLocaleDateString()
  }
})

Vue.directive('format-price', {
  bind(el, binding) {
    el.textContent = `¥${binding.value.toFixed(2)}`
  },
  update(el, binding) {
    el.textContent = `¥${binding.value.toFixed(2)}`
  }
})
```

**在模板中使用：**
```vue
<template>
  <div>
    <p v-format-date="new Date()"></p>
    <p v-format-price="99.99"></p>
  </div>
</template>
```

### 4. Vue.filter 方式（过滤器）

```javascript
// main.js
import Vue from 'vue'

// 定义全局过滤器
Vue.filter('formatDate', function(value) {
  if (!value) return ''
  return new Date(value).toLocaleDateString()
})

Vue.filter('formatPrice', function(value) {
  if (!value) return ''
  return `¥${value.toFixed(2)}`
})

Vue.filter('capitalize', function(value) {
  if (!value) return ''
  return value.charAt(0).toUpperCase() + value.slice(1)
})
```

**在模板中使用：**
```vue
<template>
  <div>
    <p>{{ new Date() | formatDate }}</p>
    <p>{{ 99.99 | formatPrice }}</p>
    <p>{{ 'hello world' | capitalize }}</p>
  </div>
</template>
```

### 5. 插件方式（推荐）

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
    
    Vue.prototype.$showMessage = function(message, type = 'info') {
      console.log(`${type}: ${message}`)
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
    
    // 注入选项
    Vue.mixin({
      created() {
        console.log('全局mixin created')
      }
    })
  }
}

// main.js
import Vue from 'vue'
import GlobalMethods from './plugins/globalMethods'

Vue.use(GlobalMethods)
```

## Vue3 全局方法定义

### 1. app.config.globalProperties 方式（推荐）

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

// 全局工具对象
app.config.globalProperties.$utils = {
  debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  },
  
  throttle(func, limit) {
    let inThrottle
    return function() {
      const args = arguments
      const context = this
      if (!inThrottle) {
        func.apply(context, args)
        inThrottle = true
        setTimeout(() => inThrottle = false, limit)
      }
    }
  }
}

app.mount('#app')
```

**在组件中使用：**
```vue
<template>
  <div>
    <p>格式化日期: {{ $formatDate(new Date()) }}</p>
    <p>格式化价格: {{ $formatPrice(99.99) }}</p>
    <button @click="showMessage">显示消息</button>
  </div>
</template>

<script>
export default {
  name: 'MyComponent',
  methods: {
    showMessage() {
      this.$showMessage('这是一条消息', 'success')
    }
  }
}
</script>
```

### 2. Composition API 方式（推荐）

```javascript
// composables/useGlobalMethods.js
import { getCurrentInstance } from 'vue'

export function useGlobalMethods() {
  const { proxy } = getCurrentInstance()
  
  return {
    formatDate: proxy.$formatDate,
    formatPrice: proxy.$formatPrice,
    showMessage: proxy.$showMessage,
    utils: proxy.$utils
  }
}

// 或者直接定义全局方法
export const globalMethods = {
  formatDate(date) {
    return new Date(date).toLocaleDateString()
  },
  
  formatPrice(price) {
    return `¥${price.toFixed(2)}`
  },
  
  showMessage(message, type = 'info') {
    console.log(`${type}: ${message}`)
  },
  
  debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }
}
```

**在组件中使用：**
```vue
<template>
  <div>
    <p>格式化日期: {{ formatDate(new Date()) }}</p>
    <p>格式化价格: {{ formatPrice(99.99) }}</p>
    <button @click="showMessage">显示消息</button>
  </div>
</template>

<script>
import { useGlobalMethods } from '@/composables/useGlobalMethods'
// 或者
import { globalMethods } from '@/composables/useGlobalMethods'

export default {
  name: 'MyComponent',
  setup() {
    // 方式1：使用 useGlobalMethods
    const { formatDate, formatPrice, showMessage } = useGlobalMethods()
    
    // 方式2：直接使用 globalMethods
    const { formatDate, formatPrice, showMessage } = globalMethods
    
    return {
      formatDate,
      formatPrice,
      showMessage
    }
  }
}
</script>
```

### 3. 插件方式（Vue3）

```javascript
// plugins/globalMethods.js
export default {
  install(app, options) {
    // 全局方法
    app.config.globalProperties.$formatDate = function(date) {
      return new Date(date).toLocaleDateString()
    }
    
    app.config.globalProperties.$formatPrice = function(price) {
      return `¥${price.toFixed(2)}`
    }
    
    app.config.globalProperties.$showMessage = function(message, type = 'info') {
      console.log(`${type}: ${message}`)
    }
    
    // 全局属性
    app.config.globalProperties.$appName = 'My Vue3 App'
    
    // 全局指令
    app.directive('format-date', {
      mounted(el, binding) {
        const date = new Date(binding.value)
        el.textContent = date.toLocaleDateString()
      },
      updated(el, binding) {
        const date = new Date(binding.value)
        el.textContent = date.toLocaleDateString()
      }
    })
    
    // 全局组件
    app.component('GlobalButton', {
      template: '<button @click="$emit(\'click\')"><slot /></button>'
    })
    
    // 注入
    app.provide('globalMethods', {
      formatDate: function(date) {
        return new Date(date).toLocaleDateString()
      },
      formatPrice: function(price) {
        return `¥${price.toFixed(2)}`
      }
    })
  }
}

// main.js
import { createApp } from 'vue'
import App from './App.vue'
import GlobalMethods from './plugins/globalMethods'

const app = createApp(App)
app.use(GlobalMethods)
app.mount('#app')
```

### 4. provide/inject 方式（Vue3）

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// 提供全局方法
app.provide('globalMethods', {
  formatDate(date) {
    return new Date(date).toLocaleDateString()
  },
  
  formatPrice(price) {
    return `¥${price.toFixed(2)}`
  },
  
  showMessage(message, type = 'info') {
    console.log(`${type}: ${message}`)
  }
})

app.mount('#app')
```

**在组件中使用：**
```vue
<template>
  <div>
    <p>格式化日期: {{ formatDate(new Date()) }}</p>
    <p>格式化价格: {{ formatPrice(99.99) }}</p>
    <button @click="showMessage">显示消息</button>
  </div>
</template>

<script>
import { inject } from 'vue'

export default {
  name: 'MyComponent',
  setup() {
    const { formatDate, formatPrice, showMessage } = inject('globalMethods')
    
    return {
      formatDate,
      formatPrice,
      showMessage
    }
  }
}
</script>
```

## 最佳实践

### 1. 类型定义（TypeScript）

```typescript
// types/global.d.ts
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $formatDate: (date: Date | string) => string
    $formatPrice: (price: number) => string
    $showMessage: (message: string, type?: string) => void
    $utils: {
      debounce: (func: Function, wait: number) => Function
      throttle: (func: Function, limit: number) => Function
    }
  }
}

export {}
```

### 2. 模块化管理

```javascript
// utils/globalMethods.js
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

export const formatPrice = (price) => {
  return `¥${price.toFixed(2)}`
}

export const showMessage = (message, type = 'info') => {
  console.log(`${type}: ${message}`)
}

export const utils = {
  debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  },
  
  throttle(func, limit) {
    let inThrottle
    return function() {
      const args = arguments
      const context = this
      if (!inThrottle) {
        func.apply(context, args)
        inThrottle = true
        setTimeout(() => inThrottle = false, limit)
      }
    }
  }
}
```

### 3. 错误处理和日志

```javascript
// plugins/globalMethods.js
export default {
  install(app, options) {
    // 全局错误处理
    app.config.globalProperties.$handleError = function(error) {
      console.error('Global error:', error)
      // 可以发送到错误监控服务
    }
    
    // 全局日志
    app.config.globalProperties.$log = function(message, level = 'info') {
      const timestamp = new Date().toISOString()
      console.log(`[${timestamp}] [${level.toUpperCase()}] ${message}`)
    }
    
    // 全局方法包装
    app.config.globalProperties.$formatDate = function(date) {
      try {
        return new Date(date).toLocaleDateString()
      } catch (error) {
        this.$handleError(error)
        return 'Invalid Date'
      }
    }
  }
}
```

## 总结

### Vue2 方式：
- ✅ `Vue.prototype` - 最常用
- ✅ `Vue.mixin` - 适合复杂逻辑
- ✅ `Vue.directive` - 适合DOM操作
- ✅ `Vue.filter` - 适合数据格式化
- ✅ 插件方式 - 最推荐

### Vue3 方式：
- ✅ `app.config.globalProperties` - 最常用
- ✅ Composition API - 最推荐
- ✅ 插件方式 - 适合复杂应用
- ✅ provide/inject - 适合依赖注入

### 选择建议：
1. **简单项目**：使用 `Vue.prototype` 或 `app.config.globalProperties`
2. **复杂项目**：使用插件方式
3. **Vue3项目**：优先使用 Composition API
4. **TypeScript项目**：添加类型定义 