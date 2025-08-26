<template>
  <div class="divc">
    <h1>监听</h1>
    <wacthVue></wacthVue>
  </div>

  <div class="divc">
    <h1>计算属性</h1>
    <computedVue></computedVue>
  </div>

  <div class="divc">
    <h1>父子组件传值测试</h1>
    <parentsVue></parentsVue>
  </div>
</template>

<script setup>
import wacthVue from "./wacth.vue";
import computedVue from "./computed.vue";
import parentsVue from "./parents.vue";
</script>

<style lang="scss" scoped>
.divc{
  border: 1px solid #000;
  margin: 10px;
  padding: 10px;
}
</style>
