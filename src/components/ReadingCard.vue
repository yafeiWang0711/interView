<template>
  <div class="reading-section">
    <div class="reading-title">
      <slot name="title">阅读与思考</slot>
    </div>
    <div class="reading-subtitle">
      <slot name="subtitle" />
    </div>
    <div class="reading-content">
      <slot />
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.reading-section {
  background: #f8f6fc;
  border-radius: 18px;
  box-shadow: 0 4px 18px #d1cbe7;
  padding: 32px 32px 24px 32px;
  margin: 48px auto 32px auto;
  max-width: 900px;
  font-size: 1.08rem;
  color: #444;
  border: 1.5px solid #d1cbe7;
}
.reading-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: #6d4fb2;
  background: #e7e2f7;
  display: inline-block;
  padding: 4px 18px 4px 32px;
  border-radius: 12px 12px 0 0;
  margin-bottom: 12px;
  position: relative;
  left: -32px;
}
.reading-subtitle {
  color: #7c3aed;
  font-size: 1.18rem;
  font-weight: bold;
  margin-bottom: 18px;
  margin-top: 6px;
  text-align: center;
}
.reading-content p {
  margin-bottom: 14px;
  text-indent: 2em;
}
.reading-flex {
  display: flex;
  gap: 32px;
  align-items: flex-start;
  margin-top: 18px;
}
.reading-img-box {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 8px #e3e3c7;
  padding: 18px 18px 10px 18px;
  min-width: 200px;
  text-align: center;
}
.reading-img-caption {
  color: #888;
  font-size: 0.98rem;
  margin: 8px 0 10px 0;
}
.reading-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 8px;
  font-size: 0.98rem;
}
.reading-table th, .reading-table td {
  border: 1px solid #d1cbe7;
  padding: 4px 8px;
}
.reading-table th {
  background: #f8f6fc;
  color: #6d4fb2;
}
</style> 