// Vue全局方法插件
import { globalMethods } from '@/utils/globalMethods'

// Vue2插件
const Vue2GlobalMethods = {
  install(Vue, options = {}) {
    // 注册全局方法
    Object.keys(globalMethods).forEach(key => {
      Vue.prototype[`$${key}`] = globalMethods[key]
    })
    
    // 注册全局属性
    Vue.prototype.$appName = options.appName || 'Vue App'
    Vue.prototype.$version = options.version || '1.0.0'
    
    // 注册全局指令
    Vue.directive('format-date', {
      bind(el, binding) {
        const date = new Date(binding.value)
        el.textContent = globalMethods.formatDate(date)
      },
      update(el, binding) {
        const date = new Date(binding.value)
        el.textContent = globalMethods.formatDate(date)
      }
    })
    
    Vue.directive('format-price', {
      bind(el, binding) {
        el.textContent = globalMethods.formatPrice(binding.value)
      },
      update(el, binding) {
        el.textContent = globalMethods.formatPrice(binding.value)
      }
    })
    
    // 注册全局过滤器
    Vue.filter('formatDate', function(value) {
      if (!value) return ''
      return globalMethods.formatDate(value)
    })
    
    Vue.filter('formatPrice', function(value) {
      if (!value) return ''
      return globalMethods.formatPrice(value)
    })
    
    Vue.filter('capitalize', function(value) {
      if (!value) return ''
      return globalMethods.capitalize(value)
    })
    
    // 注册全局mixin
    Vue.mixin({
      created() {
        // 可以在这里添加全局逻辑
        console.log('Global mixin created')
      },
      
      methods: {
        // 全局错误处理
        $handleError(error) {
          console.error('Global error:', error)
          this.$showMessage('操作失败，请重试', 'error')
        },
        
        // 全局成功处理
        $handleSuccess(message) {
          this.$showMessage(message, 'success')
        },
        
        // 全局确认对话框
        $confirm(message, title = '确认') {
          return new Promise((resolve) => {
            const result = confirm(`${title}: ${message}`)
            resolve(result)
          })
        }
      }
    })
  }
}

// Vue3插件
const Vue3GlobalMethods = {
  install(app, options = {}) {
    // 注册全局方法
    Object.keys(globalMethods).forEach(key => {
      app.config.globalProperties[`$${key}`] = globalMethods[key]
    })
    
    // 注册全局属性
    app.config.globalProperties.$appName = options.appName || 'Vue3 App'
    app.config.globalProperties.$version = options.version || '3.0.0'
    
    // 注册全局指令
    app.directive('format-date', {
      mounted(el, binding) {
        const date = new Date(binding.value)
        el.textContent = globalMethods.formatDate(date)
      },
      updated(el, binding) {
        const date = new Date(binding.value)
        el.textContent = globalMethods.formatDate(date)
      }
    })
    
    app.directive('format-price', {
      mounted(el, binding) {
        el.textContent = globalMethods.formatPrice(binding.value)
      },
      updated(el, binding) {
        el.textContent = globalMethods.formatPrice(binding.value)
      }
    })
    
    // 注册全局组件
    app.component('GlobalButton', {
      props: {
        type: {
          type: String,
          default: 'primary'
        },
        size: {
          type: String,
          default: 'medium'
        }
      },
      template: `
        <button 
          :class="['global-btn', 'global-btn-' + type, 'global-btn-' + size]"
          @click="$emit('click')"
        >
          <slot />
        </button>
      `,
      emits: ['click']
    })
    
    // 提供全局方法
    app.provide('globalMethods', globalMethods)
    
    // 提供全局配置
    app.provide('appConfig', {
      appName: options.appName || 'Vue3 App',
      version: options.version || '3.0.0',
      apiBaseUrl: options.apiBaseUrl || '/api'
    })
  }
}

// 导出插件
export { Vue2GlobalMethods, Vue3GlobalMethods }

// 默认导出Vue3插件（推荐）
export default Vue3GlobalMethods 