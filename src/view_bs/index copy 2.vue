<template>
  <div class="bs_main">
    <div class="bs_view" ref="bsViewRefs">
      <h1>123</h1>
      <h2>鼠标位置：{{ mouse.x }}, {{ mouse.y }}</h2>
      <h2>加法结果：{{ addSub.add(10, 5) }}</h2>
      <h2>减法结果：{{ addSub.sub(10, 5, 2) }}</h2>
      <h2>乘法结果：{{ addSub.mul(10, 5, 2) }}</h2>
      <h2>除法结果：{{ addSub.div(10, 5, 2) }}</h2>

      <div class="gifImg"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useMouse } from "@/utils/hooks/useMouse";
import { useAddSub } from "@/utils/hooks/useNumberFun";
const bsViewRefs = ref(null);

const mouse = useMouse()
const addSub = useAddSub()


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
.gifImg{
  background-image: url('@/assets/01.gif');
  background-size: 100% 100%;
  width: 300px;
  height: 300px;

}
</style>
