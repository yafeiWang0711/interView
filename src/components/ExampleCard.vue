<template>
  <div class="example-card">
    <slot />
  </div>
</template>

<script setup>
// 无需特殊逻辑
</script>

<style scoped>
.example-card {
  margin: 2rem 0 1.5rem 0;
  background: #eaf6ff;
  border-radius: 12px;
  border: 1.5px solid #5cadff;
  box-shadow: 0 2px 8px #5cadff22;
  padding: 18px 24px 12px 24px;
}
.card-title {
  color: #0984e3;
  font-weight: bold;
  margin-bottom: 0.7rem;
  font-size: 1.18rem;
  display: flex;
  align-items: center;
  gap: 6px;
}
/* 让插槽内容样式生效 */
::v-deep .example-content {
  margin-bottom: 8px;
  font-size: 1.08rem;
}
::v-deep .example-answer {
  background: #fafdff;
  border-radius: 8px;
  padding: 10px 16px;
  color: #0984e3;
  font-size: 1.05rem;
  line-height: 1.8;
}
</style> 