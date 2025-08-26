<template>
  <div class="virtual-list-container">
    <!-- 导航栏 -->
    <div class="nav-bar">
      <router-link to="/demos" class="back-link">← 返回演示导航</router-link>
      <h2>虚拟列表实现</h2>
    </div>
    
    <!-- 控制面板 -->
    <div class="control-panel">
      <div class="control-item">
        <label>数据量:</label>
        <input v-model.number="totalCount" type="number" min="100" max="100000" />
      </div>
      <div class="control-item">
        <label>每项高度:</label>
        <input v-model.number="itemHeight" type="number" min="20" max="200" />
      </div>
      <div class="control-item">
        <label>缓冲区大小:</label>
        <input v-model.number="bufferSize" type="number" min="5" max="20" />
      </div>
      <button @click="generateData">生成数据</button>
      <button @click="scrollToRandom">随机滚动</button>
    </div>

    <!-- 虚拟列表容器 -->
    <div 
      ref="containerRef"
      class="virtual-list"
      @scroll="handleScroll"
    >
      <!-- 占位元素，撑开滚动条 -->
      <div 
        class="virtual-list-phantom"
        :style="{ height: totalHeight + 'px' }"
      ></div>
      
      <!-- 实际渲染的内容 -->
      <div 
        class="virtual-list-content"
        :style="{ transform: `translateY(${offsetY}px)` }"
      >
        <div
          v-for="item in visibleItems"
          :key="item.id"
          class="virtual-list-item"
          :style="{ height: itemHeight + 'px' }"
        >
          <div class="item-content">
            <span class="item-index">#{{ item.id }}</span>
            <span class="item-text">{{ item.text }}</span>
            <span class="item-info">
              位置: {{ item.id * itemHeight }}px
            </span>
          </div>
        </div>
      </div>
    </div>
{{ visibleItems }}
    <!-- 调试信息 -->
    <div class="debug-info">
      <h3>调试信息</h3>
      <div class="info-grid">
        <div class="info-item">
          <span class="label">总数据量:</span>
          <span class="value">{{ totalCount }}</span>
        </div>
        <div class="info-item">
          <span class="label">总高度:</span>
          <span class="value">{{ totalHeight }}px</span>
        </div>
        <div class="info-item">
          <span class="label">可视区域高度:</span>
          <span class="value">{{ containerHeight }}px</span>
        </div>
        <div class="info-item">
          <span class="label">起始索引:</span>
          <span class="value">{{ startIndex }}</span>
        </div>
        <div class="info-item">
          <span class="label">结束索引:</span>
          <span class="value">{{ endIndex }}</span>
        </div>
        <div class="info-item">
          <span class="label">渲染项数:</span>
          <span class="value">{{ visibleItems.length }}</span>
        </div>
        <div class="info-item">
          <span class="label">偏移量:</span>
          <span class="value">{{ offsetY }}px</span>
        </div>
        <div class="info-item">
          <span class="label">滚动位置:</span>
          <span class="value">{{ scrollTop }}px</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'

// 配置参数
const totalCount = ref(100)
const itemHeight = ref(60)
const bufferSize = ref(10)

// 容器引用
const containerRef = ref(null)
const containerHeight = ref(400)
const scrollTop = ref(0)

// 计算属性
const totalHeight = computed(() => totalCount.value * itemHeight.value)

// 计算可视区域的起始和结束索引
const startIndex = computed(() => {
  const start = Math.floor(scrollTop.value / itemHeight.value)
  return Math.max(0, start - bufferSize.value)
})

const endIndex = computed(() => {
  const end = Math.ceil((scrollTop.value + containerHeight.value) / itemHeight.value)
  return Math.min(totalCount.value - 1, end + bufferSize.value)
})

// 计算偏移量
const offsetY = computed(() => startIndex.value * itemHeight.value)

// 生成可见的数据项
const visibleItems = computed(() => {
  const items = []
  for (let i = startIndex.value; i <= endIndex.value; i++) {
    items.push({
      id: i,
      text: `这是第 ${i + 1} 项数据，包含一些示例内容用于展示虚拟列表的效果。`
    })
  }
  return items
})

// 生成测试数据
const generateData = () => {
  console.log(`生成 ${totalCount.value} 条数据`)
}

// 随机滚动
const scrollToRandom = () => {
  const randomIndex = Math.floor(Math.random() * totalCount.value)
  const targetScrollTop = randomIndex * itemHeight.value
  containerRef.value.scrollTop = targetScrollTop
}

// 处理滚动事件
const handleScroll = () => {
  if (containerRef.value) {
    scrollTop.value = containerRef.value.scrollTop
  }
}

// 组件挂载后初始化
onMounted(async () => {
  await nextTick()
  if (containerRef.value) {
    containerHeight.value = containerRef.value.clientHeight
  }
})
</script>

<style scoped>
.virtual-list-container {
  padding: 20px;
  max-width: 1000px;
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

.control-panel {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.control-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.control-item label {
  font-weight: bold;
  min-width: 80px;
}

.control-item input {
  width: 80px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

button:hover {
  background-color: #0056b3;
}

.virtual-list {
  position: relative;
  height: 400px;
  border: 2px solid #ddd;
  border-radius: 8px;
  overflow: auto;
  background-color: #fafafa;
}

.virtual-list-phantom {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;
}

.virtual-list-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.virtual-list-item {
  border-bottom: 1px solid #eee;
  background-color: white;
  transition: background-color 0.2s ease;
}

.virtual-list-item:hover {
  background-color: #f0f8ff;
}

.item-content {
  display: flex;
  align-items: center;
  padding: 0 15px;
  height: 100%;
  gap: 15px;
}

.item-index {
  font-weight: bold;
  color: #007bff;
  min-width: 60px;
}

.item-text {
  flex: 1;
  color: #333;
  line-height: 1.4;
}

.item-info {
  color: #666;
  font-size: 0.9rem;
  min-width: 120px;
  text-align: right;
}

.debug-info {
  margin-top: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.debug-info h3 {
  margin: 0 0 15px 0;
  color: #333;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  background-color: white;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.info-item .label {
  font-weight: bold;
  color: #666;
}

.info-item .value {
  color: #007bff;
  font-weight: bold;
}

/* 滚动条样式 */
.virtual-list::-webkit-scrollbar {
  width: 8px;
}

.virtual-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.virtual-list::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.virtual-list::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style> 