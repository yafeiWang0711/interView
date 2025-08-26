<template>
  <div style="padding: 20px">
    <router-link to="/demos" class="back-link">← 返回演示导航</router-link>
    <div>
      <h1>pinia 状态管理</h1>
      <h2>姓名：{{ name }}</h2>
      <button @click="setNameC('yfw11')">改名</button>
      <button @click="setNamez('yfw2')">改名 修改name</button>
      <h2>年龄：{{ age }}</h2>
      <button @click="addAgeC()">年龄+1</button>
    </div>
    <div>
      <h2>{{ infoStore.getInfo }}</h2>
      <button @click="infoStore.getInfo">获取信息</button>
    </div>

    <div >
        pinia storeToRefs 使用
        storeToRefs 可以将 pinia 中的状态转换为响应式的 ref 对象
        
    </div>
  </div>
</template>

<script setup>
import { useInfoStore } from "@/store";
import { storeToRefs } from "pinia";
const infoStore = useInfoStore();
const { name, age, getInfo } = storeToRefs(infoStore);
const { setName, setAge, reset, addAge, subAge } = infoStore;
const setNameC = (name1) => {
  setName(name1);
};
const addAgeC = () => {
  addAge(1);
};

const setNamez = (name1) => {
  name.value = 'zzz'+ new Date().getTime();
};

</script>

<style lang="scss" scoped></style>
