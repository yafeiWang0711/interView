<template>
  <div class="test-page">
    <h1>前端知识测试页面</h1>
    
    <!-- URL过程演示 -->
    <UrlProcessDemo />
    
    <!-- 其他测试内容 -->
    <div class="other-tests">
      <h2>其他测试</h2>
      <p>这里可以添加其他测试内容</p>
    </div>
  </div>
</template>

<script setup>
import UrlProcessDemo from '@/components/UrlProcessDemo.vue'
</script>

<style scoped>
.test-page {
  padding: 20px;
}

.other-tests {
  margin-top: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style> 