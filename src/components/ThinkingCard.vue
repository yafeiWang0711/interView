<template>
  <el-card class="thinking-card" shadow="never">
    <div class="card-title thinking-title">
      <slot name="title">
        <span class="iconfont">💡</span> 思考
      </slot>
    </div>
    <div class="thinking-content">
      <slot />
    </div>
  </el-card>
</template>

<script setup>
</script>

<style scoped>
.thinking-card {
  background: #eaf6ff;
  border-radius: 14px;
  box-shadow: 0 2px 8px #e3e3c7;
  position: relative;
  padding: 24px 24px 20px 24px;
  margin: 32px 0 24px 0;
  min-height: 60px;
}
.thinking-pin {
  position: absolute;
  left: 32px;
  top: 10px;
  width: 18px;
  height: 18px;
  background: #b3d8f7;
  border-radius: 50%;
  box-shadow: 0 2px 6px #b3d8f7aa;
  border: 2px solid #fff;
  z-index: 2;
}
.thinking-corner {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 0;
  height: 0;
  border-bottom: 32px solid #d2eafd;
  border-left: 32px solid transparent;
  border-radius: 0 0 14px 0;
}
.thinking-content {
  position: relative;
  z-index: 1;
  font-size: 17px;
  color: #2a3a4a;
  line-height: 1.9;
}
</style>