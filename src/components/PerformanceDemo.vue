<template>
  <div class="performance-demo">
    <h2>前端性能优化演示</h2>
    
    <div class="demo-section">
      <h3>虚拟列表 vs 普通列表</h3>
      <div class="controls">
        <button @click="showVirtual = !showVirtual">
          {{ showVirtual ? '隐藏' : '显示' }}虚拟列表
        </button>
        <button @click="showNormal = !showNormal">
          {{ showNormal ? '隐藏' : '显示' }}普通列表
        </button>
      </div>
      
      <div class="lists-container">
        <VirtualList v-if="showVirtual" :items="largeList" />
        <NormalList v-if="showNormal" :items="largeList" />
      </div>
    </div>

    <div class="demo-section">
      <h3>性能指标</h3>
      <div>FPS: {{ fps }}</div>
      <div>内存占用: {{ memory }} MB</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import VirtualList from './VirtualList.vue'
import NormalList from './NormalList.vue'

const largeList = ref(Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`))
const showVirtual = ref(false)
const showNormal = ref(false)
const fps = ref(0)
const memory = ref(0)

let frameCount = 0
let lastTime = performance.now()
let timer

onMounted(() => {
  timer = setInterval(() => {
    const now = performance.now()
    frameCount++
    if (now - lastTime >= 1000) {
      fps.value = Math.round((frameCount * 1000) / (now - lastTime))
      frameCount = 0
      lastTime = now
      
      // 模拟内存监测
      memory.value = Math.round(performance.memory?.usedJSHeapSize / (1024 * 1024)) || 0
    }
  }, 100)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style scoped>
.performance-demo {
  padding: 20px;
}
.demo-section {
  margin: 20px 0;
  padding: 15px;
  border: 1px solid #eee;
}
.controls {
  margin-bottom: 10px;
}
button {
  margin-right: 10px;
  padding: 5px 10px;
}
.lists-container {
  display: flex;
  gap: 20px;
}
</style>