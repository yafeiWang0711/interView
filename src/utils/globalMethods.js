// 全局方法工具库

// ==================== 基础工具方法 ====================

/**
 * 格式化日期
 * @param {Date|string} date - 日期对象或日期字符串
 * @param {string} format - 格式化模式
 * @returns {string} 格式化后的日期字符串
 */
export const formatDate = (date, format = 'YYYY-MM-DD') => {
  if (!date) return ''
  
  const d = new Date(date)
  if (isNaN(d.getTime())) return 'Invalid Date'
  
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  const seconds = String(d.getSeconds()).padStart(2, '0')
  
  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}

/**
 * 格式化价格
 * @param {number} price - 价格
 * @param {string} currency - 货币符号
 * @param {number} decimals - 小数位数
 * @returns {string} 格式化后的价格
 */
export const formatPrice = (price, currency = '¥', decimals = 2) => {
  if (typeof price !== 'number' || isNaN(price)) return `${currency}0.00`
  return `${currency}${price.toFixed(decimals)}`
}

/**
 * 显示消息提示
 * @param {string} message - 消息内容
 * @param {string} type - 消息类型 (success|error|warning|info)
 * @param {number} duration - 显示时长(ms)
 */
export const showMessage = (message, type = 'info', duration = 3000) => {
  // 这里可以集成具体的UI库，如Element UI、Ant Design等
  console.log(`[${type.toUpperCase()}] ${message}`)
  
  // 示例：创建消息元素
  const messageEl = document.createElement('div')
  messageEl.className = `message message-${type}`
  messageEl.textContent = message
  messageEl.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 10px 20px;
    border-radius: 4px;
    color: white;
    z-index: 9999;
    background-color: ${type === 'success' ? '#67c23a' : 
                      type === 'error' ? '#f56c6c' : 
                      type === 'warning' ? '#e6a23c' : '#909399'};
  `
  
  document.body.appendChild(messageEl)
  
  setTimeout(() => {
    if (messageEl.parentNode) {
      messageEl.parentNode.removeChild(messageEl)
    }
  }, duration)
}

// ==================== 验证方法 ====================

/**
 * 验证邮箱
 * @param {string} email - 邮箱地址
 * @returns {boolean} 是否有效
 */
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

/**
 * 验证手机号
 * @param {string} phone - 手机号
 * @returns {boolean} 是否有效
 */
export const validatePhone = (phone) => {
  const re = /^1[3-9]\d{9}$/
  return re.test(phone)
}

/**
 * 验证身份证号
 * @param {string} idCard - 身份证号
 * @returns {boolean} 是否有效
 */
export const validateIdCard = (idCard) => {
  const re = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return re.test(idCard)
}

// ==================== 工具函数 ====================

/**
 * 防抖函数
 * @param {Function} func - 要防抖的函数
 * @param {number} wait - 等待时间(ms)
 * @param {boolean} immediate - 是否立即执行
 * @returns {Function} 防抖后的函数
 */
export const debounce = (func, wait, immediate = false) => {
  let timeout
  
  return function executedFunction(...args) {
    const later = () => {
      timeout = null
      if (!immediate) func.apply(this, args)
    }
    
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    
    if (callNow) func.apply(this, args)
  }
}

/**
 * 节流函数
 * @param {Function} func - 要节流的函数
 * @param {number} limit - 限制时间(ms)
 * @returns {Function} 节流后的函数
 */
export const throttle = (func, limit) => {
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

/**
 * 深拷贝
 * @param {any} obj - 要拷贝的对象
 * @returns {any} 拷贝后的对象
 */
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime())
  if (obj instanceof Array) return obj.map(item => deepClone(item))
  if (typeof obj === 'object') {
    const clonedObj = {}
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key])
      }
    }
    return clonedObj
  }
}

/**
 * 生成唯一ID
 * @returns {string} 唯一ID
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// ==================== 数据处理方法 ====================

/**
 * 数组去重
 * @param {Array} array - 要去重的数组
 * @returns {Array} 去重后的数组
 */
export const uniqueArray = (array) => {
  return [...new Set(array)]
}

/**
 * 数组分组
 * @param {Array} array - 要分组的数组
 * @param {string|Function} key - 分组键或函数
 * @returns {Object} 分组后的对象
 */
export const groupBy = (array, key) => {
  return array.reduce((groups, item) => {
    const group = typeof key === 'function' ? key(item) : item[key]
    groups[group] = groups[group] || []
    groups[group].push(item)
    return groups
  }, {})
}

/**
 * 数组排序
 * @param {Array} array - 要排序的数组
 * @param {string} key - 排序键
 * @param {string} order - 排序方向 (asc|desc)
 * @returns {Array} 排序后的数组
 */
export const sortArray = (array, key, order = 'asc') => {
  return [...array].sort((a, b) => {
    const aVal = a[key]
    const bVal = b[key]
    
    if (order === 'desc') {
      return bVal > aVal ? 1 : -1
    }
    return aVal > bVal ? 1 : -1
  })
}

// ==================== 字符串处理方法 ====================

/**
 * 首字母大写
 * @param {string} str - 字符串
 * @returns {string} 首字母大写的字符串
 */
export const capitalize = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * 驼峰转下划线
 * @param {string} str - 驼峰字符串
 * @returns {string} 下划线字符串
 */
export const camelToSnake = (str) => {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
}

/**
 * 下划线转驼峰
 * @param {string} str - 下划线字符串
 * @returns {string} 驼峰字符串
 */
export const snakeToCamel = (str) => {
  return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase())
}

// ==================== 本地存储方法 ====================

/**
 * 设置本地存储
 * @param {string} key - 键名
 * @param {any} value - 值
 * @param {number} expire - 过期时间(ms)
 */
export const setStorage = (key, value, expire = null) => {
  const data = {
    value,
    timestamp: Date.now(),
    expire: expire ? Date.now() + expire : null
  }
  localStorage.setItem(key, JSON.stringify(data))
}

/**
 * 获取本地存储
 * @param {string} key - 键名
 * @returns {any} 存储的值
 */
export const getStorage = (key) => {
  const data = localStorage.getItem(key)
  if (!data) return null
  
  try {
    const parsed = JSON.parse(data)
    
    // 检查是否过期
    if (parsed.expire && Date.now() > parsed.expire) {
      localStorage.removeItem(key)
      return null
    }
    
    return parsed.value
  } catch (error) {
    console.error('Storage parse error:', error)
    return null
  }
}

/**
 * 删除本地存储
 * @param {string} key - 键名
 */
export const removeStorage = (key) => {
  localStorage.removeItem(key)
}

/**
 * 清空本地存储
 */
export const clearStorage = () => {
  localStorage.clear()
}

// ==================== 网络请求方法 ====================

/**
 * 简单的GET请求
 * @param {string} url - 请求URL
 * @param {Object} params - 请求参数
 * @returns {Promise} 请求结果
 */
export const httpGet = async (url, params = {}) => {
  const queryString = new URLSearchParams(params).toString()
  const fullUrl = queryString ? `${url}?${queryString}` : url
  
  try {
    const response = await fetch(fullUrl)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error('GET request failed:', error)
    throw error
  }
}

/**
 * 简单的POST请求
 * @param {string} url - 请求URL
 * @param {Object} data - 请求数据
 * @returns {Promise} 请求结果
 */
export const httpPost = async (url, data = {}) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('POST request failed:', error)
    throw error
  }
}

// ==================== 导出所有方法 ====================

export const globalMethods = {
  // 基础工具
  formatDate,
  formatPrice,
  showMessage,
  
  // 验证方法
  validateEmail,
  validatePhone,
  validateIdCard,
  
  // 工具函数
  debounce,
  throttle,
  deepClone,
  generateId,
  
  // 数据处理
  uniqueArray,
  groupBy,
  sortArray,
  
  // 字符串处理
  capitalize,
  camelToSnake,
  snakeToCamel,
  
  // 本地存储
  setStorage,
  getStorage,
  removeStorage,
  clearStorage,
  
  // 网络请求
  httpGet,
  httpPost
}

// 默认导出
export default globalMethods 