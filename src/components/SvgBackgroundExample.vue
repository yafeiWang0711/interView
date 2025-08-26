<template>
  <div class="example-container">
    <h2>SVG背景图组件使用示例</h2>
    
    <!-- 基本用法 -->
    <div class="example-section">
      <h3>基本用法</h3>
      <SvgBackground
        title="欢迎使用"
        :width="400"
        :height="200"
        :title-height="50"
      />
    </div>
    
    <!-- 自定义样式 -->
    <div class="example-section">
      <h3>自定义样式</h3>
      <SvgBackground
        title="自定义标题"
        :width="500"
        :height="250"
        :title-height="80"
        :gradient-colors="['#ff6b6b', '#4ecdc4']"
        :title-style="{
          fontSize: '28px',
          fontWeight: 'bold',
          fill: '#ffffff',
          fontFamily: 'Georgia, serif'
        }"
      />
    </div>
    
    <!-- 不同尺寸 -->
    <div class="example-section">
      <h3>不同尺寸</h3>
      <div class="size-examples">
        <div class="size-item">
          <h4>小尺寸</h4>
          <SvgBackground
            title="小尺寸"
            :width="200"
            :height="100"
            :title-height="30"
          />
        </div>
        <div class="size-item">
          <h4>中尺寸</h4>
          <SvgBackground
            title="中尺寸"
            :width="300"
            :height="150"
            :title-height="40"
          />
        </div>
        <div class="size-item">
          <h4>大尺寸</h4>
          <SvgBackground
            title="大尺寸"
            :width="400"
            :height="200"
            :title-height="50"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SvgBackground from './SvgBackground.vue'

export default {
  name: 'SvgBackgroundExample',
  components: {
    SvgBackground
  }
}
</script>

<style scoped>
.example-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.example-section {
  margin-bottom: 40px;
}

.example-section h3 {
  color: #555;
  margin-bottom: 15px;
  border-bottom: 2px solid #007bff;
  padding-bottom: 5px;
}

.size-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.size-item {
  text-align: center;
}

.size-item h4 {
  color: #666;
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  .size-examples {
    grid-template-columns: 1fr;
  }
}
</style> 