<template>
    <div class="parent-child-example">
      <h2>Vue3 父子组件传值示例</h2>
      
      <!-- 父组件数据 -->
      <div class="parent-section">
        <h3>父组件数据</h3>
        <input v-model="parentMessage" placeholder="父组件消息" />
        <p>父组件消息: {{ parentMessage }}</p>
        <p>从子组件接收: {{ childMessage }}</p>
      </div>
  
      <!-- 子组件 -->
      <ChildComponent 
        :message="parentMessage"
        :user="userInfo"
        @child-message="handleChildMessage"
        @child-event="handleChildEvent"
        ref="childRef"
      />
  
      <!-- 父组件控制按钮 -->
      <div class="control-section">
        <h3>父组件控制</h3>
        <button @click="callChildMethod">调用子组件方法</button>
        <button @click="getChildData">获取子组件数据</button>
        <button @click="resetChild">重置子组件</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import ChildComponent from './ChildComponent.vue'
  
  // 父组件数据
  const parentMessage = ref('来自父组件的消息')
  const childMessage = ref('')
  const userInfo = ref({
    name: '张三',
    age: 25,
    email: 'zhangsan@example.com'
  })
  
  // 子组件引用
  const childRef = ref(null)
  
  // 处理子组件消息
  const handleChildMessage = (message) => {
    childMessage.value = message
    console.log('父组件接收到子组件消息:', message)
  }
  
  // 处理子组件事件
  const handleChildEvent = (eventData) => {
    console.log('父组件接收到子组件事件:', eventData)
  }
  
  // 调用子组件方法
  const callChildMethod = () => {
    childRef.value?.increment()
  }
  
  // 获取子组件数据
  const getChildData = () => {
    const childCount = childRef.value?.count
    console.log('子组件当前计数:', childCount)
  }
  
  // 重置子组件
  const resetChild = () => {
    childRef.value?.reset()
  }
  </script>
  
  <style scoped>
  .parent-child-example {
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin: 20px;
  }
  
  .parent-section, .control-section {
    margin: 20px 0;
    padding: 15px;
    background-color: #f5f5f5;
    border-radius: 5px;
  }
  
  button {
    margin: 5px;
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  input {
    padding: 8px;
    margin: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 200px;
  }
  </style>