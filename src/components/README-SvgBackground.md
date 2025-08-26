# SVG背景图组件 (SvgBackground)

一个可自定义的SVG背景图组件，支持自定义标题、尺寸、颜色和样式。

## 功能特性

- ✅ 自定义标题文本
- ✅ 自定义SVG尺寸（宽度和高度）
- ✅ 固定标题高度
- ✅ 自定义渐变背景颜色
- ✅ 自定义标题样式（字体、大小、颜色等）
- ✅ 装饰性元素（几何图形、线条、点阵图案）
- ✅ 响应式设计
- ✅ 阴影效果
- ✅ 硬件加速优化

## 基本用法

```vue
<template>
  <SvgBackground
    title="我的标题"
    :width="800"
    :height="400"
    :title-height="60"
  />
</template>

<script>
import SvgBackground from '@/components/SvgBackground.vue'

export default {
  components: {
    SvgBackground
  }
}
</script>
```

## Props 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `title` | String | 'SVG背景图' | 标题文本 |
| `width` | Number/String | 800 | SVG宽度 |
| `height` | Number/String | 400 | SVG高度 |
| `titleHeight` | Number/String | 60 | 标题高度（固定） |
| `titleStyle` | Object | 见下方 | 标题样式对象 |
| `svgStyle` | Object | {} | SVG容器样式 |
| `gradientColors` | Array | ['#667eea', '#764ba2'] | 渐变背景颜色 |
| `showDecorations` | Boolean | true | 是否显示装饰元素 |

### titleStyle 默认值

```javascript
{
  fontSize: '24px',
  fontWeight: 'bold',
  fill: '#ffffff',
  fontFamily: 'Arial, sans-serif'
}
```

## 使用示例

### 1. 基本用法

```vue
<SvgBackground
  title="欢迎使用"
  :width="600"
  :height="300"
  :title-height="50"
/>
```

### 2. 自定义颜色

```vue
<SvgBackground
  title="科技风格"
  :width="500"
  :height="250"
  :gradient-colors="['#00d4ff', '#090979']"
/>
```

### 3. 自定义标题样式

```vue
<SvgBackground
  title="自定义标题"
  :width="400"
  :height="200"
  :title-style="{
    fontSize: '28px',
    fontWeight: 'bold',
    fill: '#ffffff',
    fontFamily: 'Georgia, serif'
  }"
/>
```

### 4. 不同尺寸示例

```vue
<!-- 小尺寸 -->
<SvgBackground
  title="小尺寸"
  :width="200"
  :height="100"
  :title-height="30"
/>

<!-- 中尺寸 -->
<SvgBackground
  title="中尺寸"
  :width="300"
  :height="150"
  :title-height="40"
/>

<!-- 大尺寸 -->
<SvgBackground
  title="大尺寸"
  :width="400"
  :height="200"
  :title-height="50"
/>
```

## 样式预设

### 科技风格
```vue
<SvgBackground
  title="科技风格"
  :gradient-colors="['#00d4ff', '#090979']"
  :title-style="{
    fontSize: '20px',
    fontWeight: 'bold',
    fill: '#ffffff',
    fontFamily: 'Courier, monospace'
  }"
/>
```

### 温暖风格
```vue
<SvgBackground
  title="温暖风格"
  :gradient-colors="['#ff9a9e', '#fecfef']"
  :title-style="{
    fontSize: '22px',
    fontWeight: 'bold',
    fill: '#ffffff',
    fontFamily: 'Georgia, serif'
  }"
/>
```

### 自然风格
```vue
<SvgBackground
  title="自然风格"
  :gradient-colors="['#56ab2f', '#a8e6cf']"
  :title-style="{
    fontSize: '24px',
    fontWeight: 'bold',
    fill: '#ffffff',
    fontFamily: 'Arial, sans-serif'
  }"
/>
```

## 组件特性

### 1. 渐变背景
- 支持自定义双色渐变
- 默认使用蓝紫色渐变
- 渐变方向：左上到右下

### 2. 装饰元素
- 点阵图案背景
- 几何圆形装饰
- 垂直装饰线条
- 标题阴影效果

### 3. 响应式设计
- 支持不同屏幕尺寸
- 字体大小自适应
- 容器圆角和阴影

### 4. 性能优化
- 使用CSS硬件加速
- 优化渲染性能
- 减少重排重绘

## 注意事项

1. **标题高度固定**：`titleHeight` 属性控制标题的垂直位置，不会影响标题的实际高度
2. **颜色格式**：渐变颜色支持十六进制、RGB、HSL等格式
3. **字体支持**：确保使用的字体在目标环境中可用
4. **浏览器兼容性**：支持现代浏览器，建议使用Chrome、Firefox、Safari、Edge

## 文件结构

```
src/components/
├── SvgBackground.vue          # 主组件
├── SvgBackgroundExample.vue   # 使用示例
└── README-SvgBackground.md    # 说明文档
```

## 更新日志

- v1.0.0: 初始版本，支持基本功能
- 支持自定义标题、尺寸、颜色
- 添加装饰元素和渐变背景
- 优化性能和响应式设计 