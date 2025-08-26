const arr = [1,22,33,44,55,66]

// 1.遍历数组

// forEach 纯遍历 没有返回值
// () 两个参数，第一个是数组的值，第二个为索引
arr.forEach((item,index)=>{
    console.log(item,index,"forEach");
})

// map 返回新数组，不改变原数组
const arr_map = arr.map((item)=>{
  return item*2
})
console.log(arr_map,'arr Map');

// filter 返回符合条件的元素组成新的数组
const arr_filter = arr.filter(item => item%2===0)
console.log(arr_filter,'arr filter');

// find 符合条件的第一个元素
// findIndex 符合条件的第一个元素索引
const arr_find = arr.find(item=>item>2)
const arr_findIndex = arr.findIndex(item=>item>2)
console.log(arr_find,'arr_find 符合条件的第一个元素');
console.log(arr_findIndex,'arr_findIndex 符合条件的第一个元素的索引');

// some 只要有符合条件的元素就返回true 
const arr_some = arr.some(item=>item>30)
console.log(arr_some,'arr_some');
// every 全部元素符合条件才返回true 
const arr_every = arr.every(item=>item>30)
console.log(arr_every,'arr_every');




