<template>
  <div class="normal-list" ref="listRef">
    <div 
      class="list-item" 
      v-for="item in items" 
      :key="item"
      :style="{ height: itemHeight + 'px', lineHeight: itemHeight + 'px' }"
    >
      {{ item }}
    </div>
  </div>  
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
  }
})

const itemHeight = 50
const listRef = ref(null)

onMounted(() => {
  // 模拟大数据量时的性能问题
  console.log('渲染了', props.items.length, '条数据')
})
</script>

<style scoped>
.normal-list {
  height: 500px;
  overflow-y: auto;
  border: 1px solid #ddd;
  width: 300px;
}
.list-item {
  padding: 0 10px;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
}
</style>