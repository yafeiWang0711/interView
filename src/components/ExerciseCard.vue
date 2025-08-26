<template>
  <el-card class="exercise-card" shadow="never">
    <div class="card-title exercise-title">
      <slot name="title">
        <el-icon style="color:#0984e3;"><Edit /></el-icon> 练习
      </slot>
    </div>
    <div class="exercise-group">
      <slot />
    </div>
    <slot name="footer" />
  </el-card>
</template>

<script setup>
import { Edit } from '@element-plus/icons-vue'
</script>

<style scoped>
.exercise-card {
  margin: 2rem 0 1.5rem 0;
  background: #2d8bf077;
  border-radius: 16px;
  border: 1.5px solid #2d8cf0;
  box-shadow: 0 4px 18px #2d8cf022;
  padding: 24px 24px 18px 24px;
}
.exercise-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: #2d8cf0;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 1.2rem;
}
.exercise-group {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 1.2rem;
}
/* 让插槽内容样式生效 */
::v-deep .exercise-item {
  display: flex;
  align-items: flex-start;
  background: #fafdff;
  border-radius: 12px;
  box-shadow: 0 2px 8px #e3f2fd;
  padding: 18px 18px 12px 0;
  gap: 18px;
  border: 1.5px solid #e3f2fd;
  transition: box-shadow 0.2s, border 0.2s;
}
::v-deep .exercise-item:hover {
  box-shadow: 0 4px 16px #e3f2fd;
  border: 1.5px solid #2d8cf0;
}
::v-deep .ex-num-circle {
  width: 32px;
  height: 32px;
  background: #2d8cf0;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.15rem;
  margin-top: 2px;
  box-shadow: 0 2px 8px #e3f2fd;
}
::v-deep .ex-body {
  flex: 1;
}
::v-deep .ex-q {
  font-size: 1.08rem;
  margin-bottom: 6px;
  color: #333;
}
::v-deep .ex-math-list {
  margin-bottom: 8px;
  font-size: 1.08rem;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}
::v-deep .ex-input-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
  flex-wrap: wrap;
}
::v-deep .ex-input {
  border-radius: 6px;
  font-size: 1rem;
  margin: 0 4px;
  background: #fafdff;
  border: 1.5px solid #e3f2fd;
  transition: border 0.2s;
}
::v-deep .ex-input:focus {
  border: 1.5px solid #2d8cf0;
}
::v-deep .ex-input.short {
  width: 80px !important;
}
::v-deep .ex-btn {
  background: #2d8cf0;
  color: #fff;
  border-radius: 6px;
  font-size: 0.98rem;
  border: none;
  margin-left: 4px;
  transition: background 0.2s;
}
::v-deep .ex-btn:hover {
  background: #3498db;
}
::v-deep .answer-btn {
  margin-top: 10px;
  margin-bottom: 0.5rem;
  border-radius: 6px;
  font-size: 0.98rem;
}
::v-deep .answer-collapse {
  background: #fafdff;
  border-radius: 8px;
  margin-top: 0.5rem;
}
::v-deep .answer-content {
  background: #fafdff;
  border-radius: 8px;
  padding: 10px 16px;
  color: #2d8cf0;
  font-size: 1.05rem;
  line-height: 1.8;
}
::v-deep .correct {
  color: #2ecc40;
  font-weight: bold;
  margin-left: 8px;
}
::v-deep .wrong {
  color: #e74c3c;
  font-weight: bold;
  margin-left: 8px;
}
::v-deep .blank {
  display: inline-block;
  border-bottom: 1.5px solid #bbb;
  width: 60px;
  height: 1.2em;
  vertical-align: middle;
  margin: 0 4px;
}
</style> 