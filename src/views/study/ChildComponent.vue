<template>
    <div class="child-component">
      <h3>子组件</h3>
      
      <!-- 显示从父组件接收的数据 -->
      <div class="props-section">
        <h4>接收到的 Props</h4>
        <p>消息: {{ message }}</p>
        <p>用户信息: {{ user.name }} - {{ user.age }} - {{ user.email }}</p>
      </div>
  
      <!-- 子组件内部数据 -->
      <div class="internal-section">
        <h4>子组件内部数据</h4>
        <p>计数器: {{ count }}</p>
        <input v-model="childInput" placeholder="子组件输入" />
        <button @click="increment">增加计数</button>
        <button @click="sendToParent">发送给父组件</button>
      </div>
  
      <!-- 子组件事件 -->
      <div class="events-section">
        <h4>子组件事件</h4>
        <button @click="triggerEvent">触发事件</button>
        <button @click="sendComplexData">发送复杂数据</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  
  // 定义 props
  const props = defineProps({
    message: {
      type: String,
      default: '默认消息'
    },
    user: {
      type: Object,
      default: () => ({})
    }
  })
  
  // 定义 emits
  const emit = defineEmits(['child-message', 'child-event'])
  
  // 子组件内部数据
  const count = ref(0)
  const childInput = ref('')
  
  // 子组件方法
  const increment = () => {
    count.value++
    console.log('子组件计数增加到:', count.value)
  }
  
  const reset = () => {
    count.value = 0
    childInput.value = ''
    console.log('子组件已重置')
  }
  
  const sendToParent = () => {
    emit('child-message', childInput.value)
  }
  
  const triggerEvent = () => {
    emit('child-event', {
      type: 'simple-event',
      timestamp: Date.now(),
      count: count.value
    })
  }
  
  const sendComplexData = () => {
    emit('child-event', {
      type: 'complex-data',
      data: {
        count: count.value,
        input: childInput.value,
        user: props.user,
        timestamp: Date.now()
      }
    })
  }
  
  // 监听 props 变化
  watch(() => props.message, (newMessage) => {
    console.log('子组件接收到新的消息:', newMessage)
  })
  
  // 暴露方法给父组件
  defineExpose({
    increment,
    reset,
    count,
    childInput
  })
  </script>
  
  <style scoped>
  .child-component {
    padding: 15px;
    border: 2px solid #28a745;
    border-radius: 8px;
    margin: 15px 0;
    background-color: #f8fff8;
  }
  
  .props-section, .internal-section, .events-section {
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: white;
  }
  
  button {
    margin: 5px;
    padding: 6px 12px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #218838;
  }
  
  input {
    padding: 6px;
    margin: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 150px;
  }
  
  h4 {
    margin: 0 0 10px 0;
    color: #333;
  }
  </style>