<template>
  <div class="svg-background-container">
    <svg 
      :width="width" 
      :height="height" 
      class="svg-background"
      :style="svgStyle"
    >
      <!-- 背景渐变 -->
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
        </linearGradient>
        
        <!-- 装饰性图案 -->
        <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="1" fill="rgba(255,255,255,0.1)"/>
        </pattern>
        
        <!-- 标题阴影滤镜 -->
        <filter id="titleShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="rgba(0,0,0,0.3)"/>
        </filter>
      </defs>
      
      <!-- 背景矩形 -->
      <rect 
        width="100%" 
        height="100%" 
        fill="url(#bgGradient)"
      />
      
      <!-- 装饰性图案 -->
      <rect 
        width="100%" 
        height="100%" 
        fill="url(#dots)"
      />
      
      <!-- 装饰性几何图形 -->
      <circle 
        cx="50" 
        cy="50" 
        r="30" 
        fill="rgba(255,255,255,0.1)" 
        opacity="0.6"
      />
      <circle 
        :cx="width - 80" 
        :cy="height - 80" 
        r="40" 
        fill="rgba(255,255,255,0.08)" 
        opacity="0.4"
      />
      
      <!-- 标题 -->
      <text
        :x="width / 2"
        :y="titleHeight"
        text-anchor="middle"
        class="title-text"
        :style="titleStyle"
        filter="url(#titleShadow)"
      >
        {{ title }}
      </text>
      
      <!-- 装饰性线条 -->
      <line 
        x1="20%" 
        y1="0" 
        x2="20%" 
        :y2="height" 
        stroke="rgba(255,255,255,0.2)" 
        stroke-width="1"
      />
      <line 
        x1="80%" 
        y1="0" 
        x2="80%" 
        :y2="height" 
        stroke="rgba(255,255,255,0.2)" 
        stroke-width="1"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'SvgBackground',
  props: {
    // 标题
    title: {
      type: String,
      default: 'SVG背景图'
    },
    // SVG宽度
    width: {
      type: [Number, String],
      default: 800
    },
    // SVG高度
    height: {
      type: [Number, String],
      default: 400
    },
    // 标题高度（固定）
    titleHeight: {
      type: [Number, String],
      default: 60
    },
    // 标题样式
    titleStyle: {
      type: Object,
      default: () => ({
        fontSize: '24px',
        fontWeight: 'bold',
        fill: '#ffffff',
        fontFamily: 'Arial, sans-serif'
      })
    },
    // SVG样式
    svgStyle: {
      type: Object,
      default: () => ({})
    },
    // 背景渐变颜色
    gradientColors: {
      type: Array,
      default: () => ['#667eea', '#764ba2']
    },
    // 是否显示装饰元素
    showDecorations: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    // 计算渐变ID
    gradientId() {
      return `gradient-${this._uid}`
    }
  },
  methods: {
    // 更新渐变颜色
    updateGradient() {
      const gradient = document.querySelector(`#${this.gradientId}`);
      if (gradient && this.gradientColors.length >= 2) {
        const stops = gradient.querySelectorAll('stop');
        stops[0].setAttribute('stop-color', this.gradientColors[0]);
        stops[1].setAttribute('stop-color', this.gradientColors[1]);
      }
    }
  },
  mounted() {
    this.updateGradient();
  },
  watch: {
    gradientColors: {
      handler() {
        this.$nextTick(() => {
          this.updateGradient();
        });
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.svg-background-container {
  display: inline-block;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.svg-background {
  display: block;
  max-width: 100%;
  height: auto;
}

.title-text {
  font-size: 24px;
  font-weight: bold;
  fill: #ffffff;
  font-family: 'Arial', sans-serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .title-text {
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .title-text {
    font-size: 18px;
  }
}
</style> 