import { ref, onMounted, onUnmounted } from 'vue'

// 获取鼠标位置
export const useMouse = () => {
  const mouse = ref({
    x: 0,
    y: 0
  })

  const handleMouseMove = (e) => {
    mouse.value = {
      x: e.clientX,
      y: e.clientY
    }
  }

  onMounted(() => {
    window.addEventListener('mousemove', handleMouseMove)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove)
  })

  return mouse
}
