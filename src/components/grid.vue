<template>
  <div>
    <h1>grid布局</h1>
    <div class="grid-container">
      <div class="grid-item">1</div>
      <div class="grid-item">2</div>
      <div class="grid-item">3</div>
      <div class="grid-item">4</div>
      <div class="grid-item">5</div>
      <div class="grid-item">6</div>
      <div class="grid-item">7</div>
      <div class="grid-item">8</div>
      <div class="grid-item">9</div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.grid-container {
  display: grid;
//   grid-template-columns: 1fr 1fr 1fr;
  // grid-template-rows: 100px 200px; /* 定义两行，第一行高度100px，第二行高度200px */
  // grid-template-columns: 1fr 2fr; /* 定义两列，使用fr单位，第二列宽度是第一列的两倍 */
  grid-template-columns: repeat(4, 1fr);  /* 定义5列，每列宽度相等 */
  grid-template-rows: repeat(2, 1fr);  /* 定义2行，每行高度相等 */
//   grid-auto-flow: column; /* 默认值，按行排列 */
  gap: 10px;
  .grid-item {
    background-color: red;
    height: 100px;
    width: 100px;
  }
}
</style>
