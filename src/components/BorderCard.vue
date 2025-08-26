<template>
  <div class="border-card" :class="customClass" :style="customStyle">
    <div v-if="$slots.title" class="border-card-title">
      <div style="font-size:1.25rem;font-weight:bold;color:#0984e3;margin-bottom:10px;display:flex;align-items:center;">
        <span style="background:#0984e3;color:#fff;border-radius:8px;padding:2px 14px 2px 10px;margin-right:10px;">
          <slot name="title" />
        </span>
      </div>
    </div>
    <slot />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  customClass: { type: String, default: '' },
  customStyle: { type: [String, Object], default: '' }
})
</script>

<style scoped>
.border-card {
  background: #fafdff;
  border-radius: 14px;
  border: 1.5px solid #e3f2fd;
  box-shadow: 0 2px 8px #e3f2fd;
  padding: 24px 24px 18px 24px;
  margin: 32px 0 24px 0;
}

.border-card-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: #0984e3;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.border-card-title>span {
  background: #0984e3;
  color: #fff;
  border-radius: 8px;
  padding: 2px 14px 2px 10px;
  margin-right: 10px;
}
</style>