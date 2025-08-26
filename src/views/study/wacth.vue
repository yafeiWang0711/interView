<template>
  <div>
    <div @click="changeA">改变a</div>
    a:{{ a }}

    <div @click="changeObj">改变obj</div>
    obj:{{ obj }}
  </div>
</template>

<script setup>
import { ref ,watch,watchEffect} from "vue";
const a = ref("0");
const obj = ref({ objA: "1232", objB: "23" });

const changeA = () => {
  a.value = 0 + new Date();
};

const changeObj=()=>{
  obj.value.objA ='修改后的obi A'+ new Date()
}

watch(a,(newValue,oldValue)=>{
  console.log('a变化了',newValue,oldValue);
})

watch(obj,(newValue,oldValue)=>{
  console.log('obj变化了',newValue.objA,oldValue.objA);
},{deep:true})


watchEffect(() => {
  console.log(`a 变化了: ${a.value}`) //`
})
</script>

<style lang="scss" scoped></style>
