<template>
  <div class="demo-container">
    <h1>SVG背景图组件演示</h1>
    
    <!-- 控制面板 -->
    <div class="control-panel">
      <div class="control-group">
        <label>标题：</label>
        <input v-model="title" type="text" placeholder="输入标题">
      </div>
      
      <div class="control-group">
        <label>宽度：</label>
        <input v-model.number="width" type="number" min="200" max="1200">
      </div>
      
      <div class="control-group">
        <label>高度：</label>
        <input v-model.number="height" type="number" min="100" max="800">
      </div>
      
      <div class="control-group">
        <label>标题高度：</label>
        <input v-model.number="titleHeight" type="number" min="20" max="200">
      </div>
      
      <div class="control-group">
        <label>渐变颜色1：</label>
        <input v-model="gradientColors[0]" type="color">
      </div>
      
      <div class="control-group">
        <label>渐变颜色2：</label>
        <input v-model="gradientColors[1]" type="color">
      </div>
      
      <div class="control-group">
        <label>
          <input v-model="showDecorations" type="checkbox">
          显示装饰元素
        </label>
      </div>
    </div>
    
    <!-- 演示区域 -->
    <div class="demo-area">
      <h2>自定义SVG背景图</h2>
      <SvgBackground
        :title="title"
        :width="width"
        :height="height"
        :title-height="titleHeight"
        :gradient-colors="gradientColors"
        :show-decorations="showDecorations"
        :title-style="titleStyle"
      />
    </div>
    
    <!-- 预设样式 -->
    <div class="preset-styles">
      <h2>预设样式</h2>
      <div class="preset-grid">
        <div class="preset-item">
          <h3>默认样式</h3>
          <SvgBackground
            title="默认样式"
            :width="300"
            :height="200"
            :title-height="50"
          />
        </div>
        
        <div class="preset-item">
          <h3>科技风格</h3>
          <SvgBackground
            title="科技风格"
            :width="300"
            :height="200"
            :title-height="50"
            :gradient-colors="['#00d4ff', '#090979']"
            :title-style="{
              fontSize: '20px',
              fontWeight: 'bold',
              fill: '#ffffff',
              fontFamily: 'Courier, monospace'
            }"
          />
        </div>
        
        <div class="preset-item">
          <h3>温暖风格</h3>
          <SvgBackground
            title="温暖风格"
            :width="300"
            :height="200"
            :title-height="50"
            :gradient-colors="['#ff9a9e', '#fecfef']"
            :title-style="{
              fontSize: '22px',
              fontWeight: 'bold',
              fill: '#ffffff',
              fontFamily: 'Georgia, serif'
            }"
          />
        </div>
        
        <div class="preset-item">
          <h3>自然风格</h3>
          <SvgBackground
            title="自然风格"
            :width="300"
            :height="200"
            :title-height="50"
            :gradient-colors="['#56ab2f', '#a8e6cf']"
            :title-style="{
              fontSize: '24px',
              fontWeight: 'bold',
              fill: '#ffffff',
              fontFamily: 'Arial, sans-serif'
            }"
          />
        </div>
      </div>
    </div>
    
    <!-- 代码示例 -->
    <div class="code-example">
      <h2>使用代码</h2>
      <pre><code>{{ codeExample }}</code></pre>
    </div>
  </div>
</template>

<script>
import SvgBackground from '@/components/SvgBackground.vue'

export default {
  name: 'SvgBackgroundDemo',
  components: {
    SvgBackground
  },
  data() {
    return {
      title: '自定义SVG背景图',
      width: 600,
      height: 300,
      titleHeight: 60,
      gradientColors: ['#667eea', '#764ba2'],
      showDecorations: true,
      titleStyle: {
        fontSize: '24px',
        fontWeight: 'bold',
        fill: '#ffffff',
        fontFamily: 'Arial, sans-serif'
      }
    }
  },
  computed: {
    codeExample() {
      return `// 基本用法
<SvgBackground
  title="${this.title}"
  :width="${this.width}"
  :height="${this.height}"
  :title-height="${this.titleHeight}"
  :gradient-colors="['${this.gradientColors[0]}', '${this.gradientColors[1]}']"
  :show-decorations="${this.showDecorations}"
/>

// 导入组件
import SvgBackground from '@/components/SvgBackground.vue'

// 注册组件
components: {
  SvgBackground
}`
    }
  }
}
</script>

<style scoped>
.demo-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.control-panel {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.control-group label {
  font-weight: bold;
  color: #555;
}

.control-group input[type="text"],
.control-group input[type="number"] {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.control-group input[type="color"] {
  width: 50px;
  height: 40px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.control-group input[type="checkbox"] {
  margin-right: 8px;
}

.demo-area {
  text-align: center;
  margin-bottom: 40px;
}

.demo-area h2 {
  color: #333;
  margin-bottom: 20px;
}

.preset-styles {
  margin-bottom: 40px;
}

.preset-styles h2 {
  color: #333;
  margin-bottom: 20px;
}

.preset-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.preset-item {
  text-align: center;
}

.preset-item h3 {
  color: #555;
  margin-bottom: 10px;
}

.code-example {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #007bff;
}

.code-example h2 {
  color: #333;
  margin-bottom: 15px;
}

.code-example pre {
  background: #2d3748;
  color: #e2e8f0;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .control-panel {
    grid-template-columns: 1fr;
  }
  
  .preset-grid {
    grid-template-columns: 1fr;
  }
}
</style> 