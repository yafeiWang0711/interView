<template>
  <div class="url-process-demo">
    <!-- 导航栏 -->
    <div class="nav-bar">
      <router-link to="/demos" class="back-link">← 返回演示导航</router-link>
      <h2>浏览器输入URL过程演示</h2>
    </div>
    
    <!-- URL输入区域 -->
    <div class="input-section">
      <h3>1. URL输入</h3>
      <input 
        v-model="url" 
        placeholder="请输入URL，如: https://www.example.com"
        @keyup.enter="startProcess"
      />
      <button @click="startProcess">开始演示</button>
    </div>

    <!-- 过程展示 -->
    <div class="process-section">
      <div 
        v-for="(step, index) in processSteps" 
        :key="index"
        :class="['step', { active: step.active, completed: step.completed }]"
      >
        <div class="step-header">
          <span class="step-number">{{ index + 1 }}</span>
          <span class="step-title">{{ step.title }}</span>
          <span class="step-status">{{ step.status }}</span>
        </div>
        <div class="step-content" v-if="step.active || step.completed">
          <p>{{ step.description }}</p>
          <div class="step-details" v-if="step.details">
            <pre>{{ step.details }}</pre>
          </div>
        </div>
      </div>
    </div>

    <!-- 时间统计 -->
    <div class="timing-section">
      <h3>时间统计</h3>
      <div class="timing-grid">
        <div class="timing-item">
          <span class="label">DNS解析:</span>
          <span class="value">{{ timing.dns }}ms</span>
        </div>
        <div class="timing-item">
          <span class="label">TCP连接:</span>
          <span class="value">{{ timing.tcp }}ms</span>
        </div>
        <div class="timing-item">
          <span class="label">SSL握手:</span>
          <span class="value">{{ timing.ssl }}ms</span>
        </div>
        <div class="timing-item">
          <span class="label">请求响应:</span>
          <span class="value">{{ timing.request }}ms</span>
        </div>
        <div class="timing-item">
          <span class="label">DOM解析:</span>
          <span class="value">{{ timing.dom }}ms</span>
        </div>
        <div class="timing-item">
          <span class="label">总时间:</span>
          <span class="value">{{ totalTime }}ms</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const url = ref('https://www.example.com')
const isProcessing = ref(false)

const timing = ref({
  dns: 0,
  tcp: 0,
  ssl: 0,
  request: 0,
  dom: 0
})

const processSteps = ref([
  {
    title: 'URL解析',
    description: '浏览器解析URL的各个部分：协议、域名、路径、参数等',
    status: '等待中',
    active: false,
    completed: false,
    details: null
  },
  {
    title: 'DNS解析',
    description: '将域名转换为IP地址，包括本地缓存、ISP DNS、根DNS等查询过程',
    status: '等待中',
    active: false,
    completed: false,
    details: '浏览器缓存 → 系统缓存 → 路由器缓存 → ISP DNS → 根DNS → 权威DNS'
  },
  {
    title: 'TCP连接',
    description: '与服务器建立TCP连接，进行三次握手',
    status: '等待中',
    active: false,
    completed: false,
    details: 'SYN → SYN+ACK → ACK'
  },
  {
    title: 'SSL/TLS握手',
    description: '如果是HTTPS，进行SSL/TLS握手建立加密通道',
    status: '等待中',
    active: false,
    completed: false,
    details: 'Client Hello → Server Hello → 证书验证 → 密钥交换'
  },
  {
    title: 'HTTP请求',
    description: '发送HTTP请求到服务器',
    status: '等待中',
    active: false,
    completed: false,
    details: 'GET / HTTP/1.1\nHost: www.example.com\nUser-Agent: ...'
  },
  {
    title: '服务器处理',
    description: '服务器处理请求并返回响应',
    status: '等待中',
    active: false,
    completed: false,
    details: '路由匹配 → 业务处理 → 数据库查询 → 生成响应'
  },
  {
    title: 'HTML解析',
    description: '浏览器解析HTML，构建DOM树',
    status: '等待中',
    active: false,
    completed: false,
    details: '解析HTML标签 → 构建DOM树 → 构建CSSOM树 → 合并渲染树'
  },
  {
    title: '资源加载',
    description: '加载CSS、JavaScript、图片等外部资源',
    status: '等待中',
    active: false,
    completed: false,
    details: '并行下载 → 优先级控制 → 缓存利用'
  },
  {
    title: '页面渲染',
    description: '计算布局，绘制页面，执行JavaScript',
    status: '等待中',
    active: false,
    completed: false,
    details: '布局计算 → 绘制页面 → JS执行 → 事件绑定'
  }
])

const totalTime = computed(() => {
  return Object.values(timing.value).reduce((sum, time) => sum + time, 0)
})

const startProcess = async () => {
  if (isProcessing.value) return
  isProcessing.value = true
  
  // 重置状态
  processSteps.value.forEach(step => {
    step.active = false
    step.completed = false
    step.status = '等待中'
  })
  
  Object.keys(timing.value).forEach(key => {
    timing.value[key] = 0
  })

  // 模拟每个步骤
  for (let i = 0; i < processSteps.value.length; i++) {
    const step = processSteps.value[i]
    
    // 激活当前步骤
    step.active = true
    step.status = '进行中'
    
    // 模拟处理时间
    const delay = Math.random() * 1000 + 500
    await new Promise(resolve => setTimeout(resolve, delay))
    
    // 完成当前步骤
    step.active = false
    step.completed = true
    step.status = '完成'
    
    // 更新时间统计
    if (i === 1) timing.value.dns = delay
    else if (i === 2) timing.value.tcp = delay
    else if (i === 3) timing.value.ssl = delay
    else if (i === 5) timing.value.request = delay
    else if (i === 7) timing.value.dom = delay
  }
  
  isProcessing.value = false
}
</script>

<style scoped>
.url-process-demo {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.nav-bar {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.back-link {
  color: #007bff;
  text-decoration: none;
  margin-right: 20px;
  font-weight: 500;
}

.back-link:hover {
  text-decoration: underline;
}

.nav-bar h2 {
  margin: 0;
  color: #333;
}

.input-section {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.input-section input {
  width: 400px;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.input-section button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.process-section {
  margin-bottom: 30px;
}

.step {
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.step.active {
  border-color: #007bff;
  background-color: #f0f8ff;
}

.step.completed {
  border-color: #28a745;
  background-color: #f8fff8;
}

.step-header {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #ddd;
}

.step-number {
  width: 30px;
  height: 30px;
  background-color: #007bff;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  font-weight: bold;
}

.step.completed .step-number {
  background-color: #28a745;
}

.step-title {
  flex: 1;
  font-weight: bold;
}

.step-status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  background-color: #6c757d;
  color: white;
}

.step.active .step-status {
  background-color: #007bff;
}

.step.completed .step-status {
  background-color: #28a745;
}

.step-content {
  padding: 15px;
}

.step-details {
  margin-top: 10px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.step-details pre {
  margin: 0;
  font-size: 12px;
  color: #666;
}

.timing-section {
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.timing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 15px;
}

.timing-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: white;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.timing-item .label {
  font-weight: bold;
}

.timing-item .value {
  color: #007bff;
  font-weight: bold;
}
</style> 