<template>
  <div class="advanced-virtual-list-container">
    <!-- 导航栏 -->
    <div class="nav-bar">
      <router-link to="/demos" class="back-link">← 返回演示导航</router-link>
      <h2>高级虚拟列表 - 支持动态高度</h2>
    </div>
    
    <!-- 控制面板 -->
    <div class="control-panel">
      <div class="control-item">
        <label>数据量:</label>
        <input v-model.number="totalCount" type="number" min="100" max="100000" />
      </div>
      <div class="control-item">
        <label>预估高度:</label>
        <input v-model.number="estimatedHeight" type="number" min="20" max="200" />
      </div>
      <div class="control-item">
        <label>缓冲区:</label>
        <input v-model.number="bufferSize" type="number" min="5" max="20" />
      </div>
      <button @click="generateData">生成数据</button>
      <button @click="scrollToRandom">随机滚动</button>
      <button @click="toggleDynamicHeight">切换动态高度</button>
    </div>

    <!-- 虚拟列表容器 -->
    <div 
      ref="containerRef"
      class="virtual-list"
      @scroll="handleScroll"
    >
      <!-- 占位元素 -->
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
          :ref="el => setItemRef(el, item.id)"
          :style="{ 
            height: useDynamicHeight ? 'auto' : estimatedHeight + 'px',
            minHeight: estimatedHeight + 'px'
          }"
        >
          <div class="item-content">
            <div class="item-header">
              <span class="item-index">#{{ item.id }}</span>
              <span class="item-type">{{ item.type }}</span>
            </div>
            <div class="item-text">{{ item.text }}</div>
            <div class="item-footer">
              <span class="item-height">高度: {{ getItemHeight(item.id) }}px</span>
              <span class="item-position">位置: {{ getItemPosition(item.id) }}px</span>
            </div>
          </div>
        </div>
      </div>
    </div>

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
          <span class="label">缓存项数:</span>
          <span class="value">{{ Object.keys(itemHeights).length }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue'

// 配置参数
const totalCount = ref(10000)
const estimatedHeight = ref(80)
const bufferSize = ref(10)
const useDynamicHeight = ref(false)

// 容器引用
const containerRef = ref(null)
const containerHeight = ref(400)
const scrollTop = ref(0)

// 存储每个项目的实际高度
const itemHeights = ref({})
const itemRefs = ref({})

// 计算总高度
const totalHeight = computed(() => {
  if (useDynamicHeight.value) {
    // 使用缓存的高度计算
    let height = 0
    for (let i = 0; i < totalCount.value; i++) {
      height += getItemHeight(i)
    }
    return height
  } else {
    // 使用预估高度
    return totalCount.value * estimatedHeight.value
  }
})

// 获取项目高度
const getItemHeight = (index) => {
  if (useDynamicHeight.value && itemHeights.value[index]) {
    return itemHeights.value[index]
  }
  return estimatedHeight.value
}

// 获取项目位置
const getItemPosition = (index) => {
  let position = 0
  for (let i = 0; i < index; i++) {
    position += getItemHeight(i)
  }
  return position
}

// 计算可视区域的起始和结束索引
const startIndex = computed(() => {
  if (useDynamicHeight.value) {
    // 二分查找起始索引
    let left = 0
    let right = totalCount.value - 1
    let target = scrollTop.value - bufferSize.value * estimatedHeight.value
    
    while (left <= right) {
      const mid = Math.floor((left + right) / 2)
      const position = getItemPosition(mid)
      
      if (position < target) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }
    
    return Math.max(0, left - bufferSize.value)
  } else {
    const start = Math.floor(scrollTop.value / estimatedHeight.value)
    return Math.max(0, start - bufferSize.value)
  }
})

const endIndex = computed(() => {
  if (useDynamicHeight.value) {
    // 二分查找结束索引
    let left = startIndex.value
    let right = totalCount.value - 1
    let target = scrollTop.value + containerHeight.value + bufferSize.value * estimatedHeight.value
    
    while (left <= right) {
      const mid = Math.floor((left + right) / 2)
      const position = getItemPosition(mid)
      
      if (position < target) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }
    
    return Math.min(totalCount.value - 1, left + bufferSize.value)
  } else {
    const end = Math.ceil((scrollTop.value + containerHeight.value) / estimatedHeight.value)
    return Math.min(totalCount.value - 1, end + bufferSize.value)
  }
})

// 计算偏移量
const offsetY = computed(() => getItemPosition(startIndex.value))

// 生成可见的数据项
const visibleItems = computed(() => {
  const items = []
  for (let i = startIndex.value; i <= endIndex.value; i++) {
    const type = ['短文本', '中等长度文本', '较长的文本内容', '非常长的文本内容用于测试动态高度效果'][i % 4]
    const textLength = [20, 50, 100, 200][i % 4]
    
    items.push({
      id: i,
      type,
      text: `这是第 ${i + 1} 项数据，${type}。`.repeat(Math.ceil(textLength / 20))
    })
  }
  return items
})

// 设置项目引用
const setItemRef = (el, id) => {
  if (el) {
    itemRefs.value[id] = el
  }
}

// 更新项目高度
const updateItemHeight = (id) => {
  if (itemRefs.value[id]) {
    const height = itemRefs.value[id].offsetHeight
    if (height !== itemHeights.value[id]) {
      itemHeights.value[id] = height
    }
  }
}

// 监听可见项目变化，更新高度
watch(visibleItems, async () => {
  if (useDynamicHeight.value) {
    await nextTick()
    visibleItems.value.forEach(item => {
      updateItemHeight(item.id)
    })
  }
}, { flush: 'post' })

// 生成测试数据
const generateData = () => {
  console.log(`生成 ${totalCount.value} 条数据`)
  itemHeights.value = {}
}

// 随机滚动
const scrollToRandom = () => {
  const randomIndex = Math.floor(Math.random() * totalCount.value)
  const targetScrollTop = getItemPosition(randomIndex)
  containerRef.value.scrollTop = targetScrollTop
}

// 切换动态高度
const toggleDynamicHeight = () => {
  useDynamicHeight.value = !useDynamicHeight.value
  itemHeights.value = {}
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
.advanced-virtual-list-container {
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
  margin-right: 10px;
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
  padding: 10px;
}

.virtual-list-item:hover {
  background-color: #f0f8ff;
}

.item-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-index {
  font-weight: bold;
  color: #007bff;
}

.item-type {
  background-color: #e3f2fd;
  color: #1976d2;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.item-text {
  color: #333;
  line-height: 1.4;
  word-break: break-word;
}

.item-footer {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #666;
}

.item-height, .item-position {
  background-color: #f8f9fa;
  padding: 2px 6px;
  border-radius: 4px;
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