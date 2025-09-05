<template>
  <div class="virtual-list" @scroll="handleScroll" ref="listRef">
    <div class="list-phantom" :style="{ height: totalHeight + 'px' }"></div>
    <div class="list-content" :style="{ transform: `translateY(${offset}px)` }">
      <div 
        class="list-item" 
        v-for="item in visibleData" 
        :key="item"
        :style="{ height: itemHeight + 'px', lineHeight: itemHeight + 'px' }"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
  }
})

const itemHeight = 50
const visibleCount = ref(0)
const startIndex = ref(0)
const offset = ref(0)
const listRef = ref(null)

const totalHeight = computed(() => props.items.length * itemHeight)
const endIndex = computed(() => Math.min(startIndex.value + visibleCount.value, props.items.length - 1))
const visibleData = computed(() => props.items.slice(startIndex.value, endIndex.value + 1))

onMounted(() => {
  visibleCount.value = Math.ceil(listRef.value.clientHeight / itemHeight)
})

function handleScroll() {
  const scrollTop = listRef.value.scrollTop
  startIndex.value = Math.floor(scrollTop / itemHeight)
  offset.value = scrollTop - (scrollTop % itemHeight)
}
</script>

<style scoped>
.virtual-list {
  height: 500px;
  overflow-y: auto;
  position: relative;
  border: 1px solid #ddd;
  width: 300px;
}
.list-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}
.list-content {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
}
.list-item {
  padding: 0 10px;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
}
</style>
