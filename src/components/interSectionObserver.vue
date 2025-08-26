<template>
  <div>
    <h1>interSectionObserver</h1>
    <h1>interSectionObserver</h1>
    <h1>interSectionObserver</h1>

    <div class="box"></div>
    <div class="box" style="margin-top: 20px"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from "vue";
const observer = ref(null);
const el = ref(null);
onMounted(() => {
  var box = document.getElementsByClassName("box")[0];
  var box1 = document.getElementsByClassName("box")[1];

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log("元素进入视口", entry.target);
      }else {
        console.log("元素离开视口", entry.target);
      }
    });
  });
  observer.observe(box);
  observer.observe(box1);
  // box.addEventListener('click', () => {
  //     observer.unobserve(box)
  // })
});

onUnmounted(() => {
    if (observer) {
      // observer.unobserve(box)
      // observer.unobserve(box1)
      observer.disconnect();
    }
});
</script>

<style lang="scss" scoped>
.box {
  margin-top: 1200px;
  width: 100px;
  height: 100px;
  background-color: red;
}
</style>
