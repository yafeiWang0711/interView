<template>
  <div>
    <h4>a:{{ a }} <span @click="change('a')">改变a</span></h4>
    <h4>b:{{ b }} <span @click="change('b')">改变b</span></h4>
    <h4>c:{{ c }} <span @click="change('c')">改变c.c1</span></h4>
    <h4>cc:{{ cc }}</h4>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const a = ref(0);
const b = ref(0);
const c = ref({ c1: 34 });

const cc = computed(() => a.value + b.value + c.value.c1);

const change = (type) => {
  if (type == "a") {
    a.value++;
  }
  if (type == "b") {
    b.value++;
  }
  if (type == "c") {
    c.value.c1++;
  }
};
</script>

<style lang="scss" scoped></style>
