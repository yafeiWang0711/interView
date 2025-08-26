<template>
  <div class="bs_main">
    <div class="bs_view" ref="bsViewRefs">
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
const bsViewRefs = ref(null);



// 处理窗口大小变化
const handleResize = () => {
  if (!bsViewRefs.value) return;
  let viewWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  let viewHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;
  const scale =
    viewWidth / 1920 < viewHeight / 1080 ? viewWidth / 1920 : viewHeight / 1080;
  bsViewRefs.value.style.transform = `scale(${scale}) translate(-50%, -50%)`;
};

onMounted(() => {
  handleResize();
});

const debounce = (fn, delay) => {
  let timer = null;
  return function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn();
    }, delay);
  };
};

onMounted(() => {
  window.addEventListener("resize", debounce(handleResize, 500));
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
.bs_main {
  width: 100%;
  height: 100vh;
  background-color: rgb(135, 135, 135);
}
.bs_view {
  width: 1920px;
  height: 1080px;
  background-color: bisque;
  transform: scale(0.2) translate(-50%, -50%);
  transform-origin: 0 0;
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>
