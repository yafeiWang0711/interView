<template>
  <div class="reactivity-demo">
    <h2>Vue2/3响应式原理对比</h2>
    
    <div class="demo-section">
      <h3>Vue2响应式 (Object.defineProperty)</h3>
      <div>原始值: {{ vue2Data.msg }}</div>
      <button @click="mutateVue2">修改Vue2数据</button>
    </div>

    <div class="demo-section">
      <h3>Vue3响应式 (Proxy)</h3>
      <div>原始值: {{ vue3Data.msg }}</div>
      <button @click="mutateVue3">修改Vue3数据</button>
    </div>

    <div class="comparison">
      <h3>原理对比</h3>
      <pre>{{ comparisonText }}</pre>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

// Vue2风格响应式
const vue2Data = reactive({
  msg: 'Hello Vue2',
  _msg: 'Hello Vue2'
})

// Vue3风格响应式
const vue3Data = reactive({
  msg: 'Hello Vue3'
})

const comparisonText = ref(`Vue2使用Object.defineProperty实现响应式：
1. 只能监听已有属性
2. 需要递归遍历对象
3. 数组方法需要hack

Vue3使用Proxy实现响应式：
1. 可以监听动态添加的属性
2. 性能更好
3. 支持Map/Set等数据结构`)

function mutateVue2() {
  vue2Data.msg = '修改后的Vue2数据：' + Date.now()
}

function mutateVue3() {
  vue3Data.msg = '修改后的Vue3数据：' + Date.now()
}
</script>

<style scoped>
.reactivity-demo {
  padding: 20px;
}
.demo-section {
  margin: 20px 0;
  padding: 15px;
  border: 1px solid #eee;
}
button {
  margin-top: 10px;
  padding: 5px 10px;
}
</style>