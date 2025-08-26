# CSS 基础面试题

## 1. CSS 盒模型

### 问题：什么是盒模型？标准盒模型和IE盒模型有什么区别？

**答案：**
盒模型描述了HTML元素在页面中占用的空间，包括内容、内边距、边框和外边距。

**标准盒模型（W3C）：**
- `width` 和 `height` 只包含内容区域
- 总宽度 = width + padding + border + margin

**IE盒模型：**
- `width` 和 `height` 包含内容、内边距和边框
- 总宽度 = width + margin

```css
/* 标准盒模型 */
.box {
  box-sizing: content-box; /* 默认值 */
  width: 200px;
  padding: 20px;
  border: 5px solid #000;
  margin: 10px;
  /* 总宽度 = 200 + 40 + 10 + 20 = 270px */
}

/* IE盒模型 */
.box {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  border: 5px solid #000;
  margin: 10px;
  /* 总宽度 = 200 + 20 = 220px */
}
```

## 2. CSS 选择器

### 问题：CSS选择器的优先级是什么？如何计算？

**答案：**
选择器优先级从高到低：
1. **!important**（最高优先级）
2. **内联样式**（style属性）
3. **ID选择器**（#id）
4. **类选择器**（.class）、属性选择器、伪类
5. **元素选择器**（div）、伪元素
6. **通配符选择器**（*）

**计算方法：**
- ID选择器：100分
- 类选择器、属性选择器、伪类：10分
- 元素选择器、伪元素：1分
- 通配符、继承：0分

```css
#header .nav li { }     /* 100 + 10 + 1 = 111分 */
.nav li { }             /* 10 + 1 = 11分 */
li { }                  /* 1分 */
```

### 问题：CSS选择器有哪些类型？各有什么特点？

**答案：**

#### 1. 基础选择器
```css
/* 元素选择器 */
div { color: red; }

/* 类选择器 */
.class-name { color: blue; }

/* ID选择器 */
#unique-id { color: green; }

/* 通配符选择器 */
* { margin: 0; }
```

#### 2. 属性选择器
```css
/* 存在属性 */
[title] { }

/* 属性值等于 */
[title="hello"] { }

/* 属性值包含 */
[title*="hello"] { }

/* 属性值以...开始 */
[title^="hello"] { }

/* 属性值以...结束 */
[title$="hello"] { }
```

#### 3. 伪类选择器
```css
/* 状态伪类 */
a:hover { }
input:focus { }
input:checked { }

/* 结构伪类 */
li:first-child { }
li:last-child { }
li:nth-child(2n) { }
li:nth-child(odd) { }
```

#### 4. 伪元素选择器
```css
/* 首字母 */
p::first-letter { }

/* 首行 */
p::first-line { }

/* 前后内容 */
p::before { content: "前缀"; }
p::after { content: "后缀"; }
```

## 3. 居中布局

### 问题：如何实现元素居中？有哪些方法？

**答案：**

#### 1. 水平居中

**行内元素：**
```css
.text {
  text-align: center;
}
```

**块级元素：**
```css
/* 方法1：margin auto */
.block {
  width: 200px;
  margin: 0 auto;
}

/* 方法2：绝对定位 */
.block {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

/* 方法3：Flexbox */
.parent {
  display: flex;
  justify-content: center;
}
```

#### 2. 垂直居中

**行内元素：**
```css
.parent {
  line-height: 100px; /* 等于容器高度 */
}
```

**块级元素：**
```css
/* 方法1：绝对定位 */
.block {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

/* 方法2：Flexbox */
.parent {
  display: flex;
  align-items: center;
}

/* 方法3：Grid */
.parent {
  display: grid;
  place-items: center;
}
```

#### 3. 水平垂直居中

```css
/* 方法1：绝对定位 */
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* 方法2：Flexbox */
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 方法3：Grid */
.parent {
  display: grid;
  place-items: center;
}
```

## 4. 布局方式

### 问题：CSS中有哪些布局方式？各有什么特点？

**答案：**

#### 1. 传统布局
```css
/* 浮动布局 */
.container {
  overflow: hidden; /* 清除浮动 */
}
.left {
  float: left;
  width: 200px;
}
.right {
  margin-left: 200px;
}
```

#### 2. Flexbox布局
```css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.item {
  flex: 1;
}
```

#### 3. Grid布局
```css
.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-gap: 20px;
}
```

#### 4. 定位布局
```css
.absolute {
  position: absolute;
  top: 0;
  left: 0;
}
```

### 问题：Flexbox布局有哪些重要属性？

**答案：**

#### 容器属性
```css
.container {
  display: flex; /* 或 inline-flex */
  
  /* 主轴方向 */
  flex-direction: row | row-reverse | column | column-reverse;
  
  /* 是否换行 */
  flex-wrap: nowrap | wrap | wrap-reverse;
  
  /* 主轴对齐 */
  justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;
  
  /* 交叉轴对齐 */
  align-items: stretch | flex-start | flex-end | center | baseline;
  
  /* 多行对齐 */
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```

#### 项目属性
```css
.item {
  /* 排序 */
  order: 0;
  
  /* 放大比例 */
  flex-grow: 0;
  
  /* 缩小比例 */
  flex-shrink: 1;
  
  /* 基准大小 */
  flex-basis: auto;
  
  /* 简写 */
  flex: 0 1 auto; /* grow shrink basis */
  
  /* 自身对齐 */
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

### 问题：Grid布局有哪些重要概念和属性？

**答案：**

#### 基本概念
- **Grid Container**: 设置 `display: grid` 的元素
- **Grid Item**: Grid Container 的直接子元素
- **Grid Line**: 构成网格结构的分界线
- **Grid Track**: 两条相邻网格线之间的空间
- **Grid Cell**: 网格中的单元格
- **Grid Area**: 任意数量的网格单元格

#### 容器属性
```css
.container {
  display: grid;
  
  /* 定义列 */
  grid-template-columns: 100px 1fr 2fr;
  grid-template-columns: repeat(3, 1fr);
  grid-template-columns: minmax(100px, 1fr) 2fr 1fr;
  
  /* 定义行 */
  grid-template-rows: 100px 200px;
  
  /* 定义区域 */
  grid-template-areas: 
    "header header header"
    "sidebar main main"
    "footer footer footer";
  
  /* 间距 */
  grid-gap: 20px;
  grid-column-gap: 10px;
  grid-row-gap: 20px;
  
  /* 对齐 */
  justify-items: start | end | center | stretch;
  align-items: start | end | center | stretch;
  justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
  align-content: start | end | center | stretch | space-around | space-between | space-evenly;
}
```

#### 项目属性
```css
.item {
  /* 指定位置 */
  grid-column: 1 / 3; /* 从第1条线到第3条线 */
  grid-row: 2 / 4;
  
  /* 指定区域 */
  grid-area: header;
  
  /* 自身对齐 */
  justify-self: start | end | center | stretch;
  align-self: start | end | center | stretch;
}
```

## 5. 清除浮动

### 问题：什么是浮动？如何清除浮动？

**答案：**

#### 浮动的影响
- 父元素高度塌陷
- 影响后续元素布局

#### 清除浮动的方法

**方法1：clear属性**
```css
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
```

**方法2：BFC**
```css
.container {
  overflow: hidden; /* 或 auto */
}
```

**方法3：Flexbox**
```css
.container {
  display: flex;
  flex-wrap: wrap;
}
```

**方法4：Grid**
```css
.container {
  display: grid;
}
```

## 6. BFC（块级格式化上下文）

### 问题：什么是BFC？如何触发BFC？

**答案：**

BFC是CSS中的一个概念，它是一个独立的渲染区域，具有以下特性：
- 内部的Box会在垂直方向上一个接一个放置
- 同一个BFC的两个相邻Box的margin会发生重叠
- BFC的区域不会与float的元素区域重叠
- BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素

#### 触发BFC的方法
```css
/* 1. 根元素 */
html { }

/* 2. float不为none */
.float {
  float: left;
}

/* 3. position为absolute或fixed */
.absolute {
  position: absolute;
}

/* 4. display为inline-block、table-cell、table-caption、flex、inline-flex */
.inline-block {
  display: inline-block;
}

/* 5. overflow不为visible */
.overflow {
  overflow: hidden;
}
```

#### BFC的应用
```css
/* 防止margin重叠 */
.container {
  overflow: hidden;
}

/* 清除浮动 */
.container {
  overflow: hidden;
}

/* 防止文字环绕 */
.text {
  overflow: hidden;
}
```

## 7. CSS变量（自定义属性）

### 问题：CSS变量如何使用？有什么优势？

**答案：**

#### 基本用法
```css
:root {
  --primary-color: #007bff;
  --font-size: 16px;
  --spacing: 20px;
}

.button {
  background-color: var(--primary-color);
  font-size: var(--font-size);
  padding: var(--spacing);
}

/* 默认值 */
.text {
  color: var(--text-color, #333);
}
```

#### 动态修改
```javascript
// JavaScript修改CSS变量
document.documentElement.style.setProperty('--primary-color', '#ff0000');
```

#### 优势
- 统一管理样式
- 支持动态修改
- 减少重复代码
- 提高维护性

## 8. 响应式设计

### 问题：如何实现响应式设计？

**答案：**

#### 1. 媒体查询
```css
/* 移动端 */
@media (max-width: 768px) {
  .container {
    width: 100%;
    padding: 10px;
  }
}

/* 平板 */
@media (min-width: 769px) and (max-width: 1024px) {
  .container {
    width: 90%;
  }
}

/* 桌面端 */
@media (min-width: 1025px) {
  .container {
    width: 1200px;
  }
}
```

#### 2. 弹性单位
```css
.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
}

.text {
  font-size: clamp(16px, 4vw, 24px);
}
```

#### 3. 图片响应式
```css
img {
  max-width: 100%;
  height: auto;
}
```

#### 4. 视口单位
```css
.full-height {
  height: 100vh;
}

.full-width {
  width: 100vw;
}
```

## 9. CSS 动画

### 问题：CSS动画有哪些方式？各有什么特点？

**答案：**

#### 1. Transition（过渡）
```css
.button {
  transition: all 0.3s ease;
}
.button:hover {
  transform: scale(1.1);
}
```

#### 2. Animation（动画）
```css
@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.element {
  animation: slideIn 0.5s ease-out;
}
```

#### 3. Transform（变换）
```css
.element {
  transform: translate(50px, 50px) rotate(45deg) scale(1.2);
}
```

### 问题：CSS动画的性能优化有哪些？

**答案：**

#### 1. 使用transform和opacity
```css
/* 好：只触发合成层 */
.element {
  transform: translateX(100px);
  opacity: 0.5;
}

/* 避免：触发重排重绘 */
.element {
  left: 100px;
  background-color: red;
}
```

#### 2. 使用will-change
```css
.element {
  will-change: transform;
}
```

#### 3. 使用硬件加速
```css
.element {
  transform: translateZ(0);
}
```

## 10. CSS 预处理器

### 问题：Sass/Less 相比原生CSS有什么优势？

**答案：**

#### 1. 变量
```scss
$primary-color: #007bff;
$font-size: 16px;

.button {
  background-color: $primary-color;
  font-size: $font-size;
}
```

#### 2. 嵌套
```scss
.nav {
  background: #fff;
  
  ul {
    list-style: none;
    
    li {
      display: inline-block;
      
      a {
        color: #333;
        
        &:hover {
          color: $primary-color;
        }
      }
    }
  }
}
```

#### 3. 混合器
```scss
@mixin button($bg-color, $text-color) {
  padding: 10px 20px;
  background-color: $bg-color;
  color: $text-color;
  border: none;
  border-radius: 4px;
}

.primary-btn {
  @include button(#007bff, #fff);
}
```

#### 4. 函数
```scss
@function calculate-width($n) {
  @return $n * 100px;
}

.element {
  width: calculate-width(5);
}
```

## 11. CSS 性能优化

### 问题：如何优化CSS性能？

**答案：**

#### 1. 选择器优化
```css
/* 避免过度嵌套 */
.nav ul li a { } /* 不好 */
.nav-link { }    /* 好 */

/* 避免使用通配符 */
* { margin: 0; } /* 避免 */
```

#### 2. 减少重排重绘
```css
/* 使用 transform 代替改变位置 */
.element {
  transform: translateX(100px); /* 好 */
}
.element {
  left: 100px; /* 可能触发重排 */
}
```

#### 3. 使用硬件加速
```css
.element {
  transform: translateZ(0); /* 启用硬件加速 */
  will-change: transform;   /* 提示浏览器 */
}
```

#### 4. 压缩CSS
- 移除注释和空白
- 合并相同规则
- 使用工具压缩

#### 5. 避免@import
```css
/* 避免使用@import，会阻塞渲染 */
@import url('style.css');

/* 使用link标签 */
<link rel="stylesheet" href="style.css">
```

## 12. CSS 模块化

### 问题：如何实现CSS模块化？

**答案：**

#### 1. BEM命名规范
```css
.block { }
.block__element { }
.block--modifier { }

/* 示例 */
.card { }
.card__title { }
.card__content { }
.card--featured { }
```

#### 2. CSS Modules
```css
/* styles.module.css */
.title {
  color: #333;
  font-size: 24px;
}
```

```javascript
import styles from './styles.module.css';

function Component() {
  return <h1 className={styles.title}>标题</h1>;
}
```

#### 3. CSS-in-JS
```javascript
const Button = styled.button`
  background-color: ${props => props.primary ? '#007bff' : '#6c757d'};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
`;
```

## 13. 常见布局实现

### 问题：如何实现圣杯布局和双飞翼布局？

**答案：**

#### 圣杯布局
```html
<div class="container">
  <div class="main">主要内容</div>
  <div class="left">左侧边栏</div>
  <div class="right">右侧边栏</div>
</div>
```

```css
.container {
  padding: 0 200px;
}

.main {
  float: left;
  width: 100%;
  background: #f0f0f0;
}

.left {
  float: left;
  width: 200px;
  margin-left: -100%;
  position: relative;
  left: -200px;
  background: #e0e0e0;
}

.right {
  float: left;
  width: 200px;
  margin-left: -200px;
  position: relative;
  right: -200px;
  background: #d0d0d0;
}
```

#### 双飞翼布局
```html
<div class="container">
  <div class="main">
    <div class="main-content">主要内容</div>
  </div>
  <div class="left">左侧边栏</div>
  <div class="right">右侧边栏</div>
</div>
```

```css
.container {
  overflow: hidden;
}

.main {
  float: left;
  width: 100%;
}

.main-content {
  margin: 0 200px;
  background: #f0f0f0;
}

.left {
  float: left;
  width: 200px;
  margin-left: -100%;
  background: #e0e0e0;
}

.right {
  float: left;
  width: 200px;
  margin-left: -200px;
  background: #d0d0d0;
}
```

## 14. CSS 新特性

### 问题：CSS有哪些新特性？

**答案：**

#### 1. CSS Grid
```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}
```

#### 2. CSS变量
```css
:root {
  --primary-color: #007bff;
}

.button {
  background-color: var(--primary-color);
}
```

#### 3. CSS函数
```css
.element {
  width: calc(100% - 20px);
  height: min(100px, 50vh);
  font-size: clamp(16px, 4vw, 24px);
}
```

#### 4. CSS逻辑属性
```css
.element {
  margin-block: 20px;
  padding-inline: 10px;
  border-block-end: 1px solid #ccc;
}
```

#### 5. CSS容器查询
```css
@container (min-width: 400px) {
  .card {
    grid-template-columns: 1fr 1fr;
  }
}
```

## 15. 浏览器兼容性

### 问题：如何处理CSS浏览器兼容性问题？

**答案：**

#### 1. 使用CSS前缀
```css
.element {
  -webkit-transform: translateX(100px);
  -moz-transform: translateX(100px);
  -ms-transform: translateX(100px);
  transform: translateX(100px);
}
```

#### 2. 使用@supports
```css
@supports (display: grid) {
  .container {
    display: grid;
  }
}

@supports not (display: grid) {
  .container {
    display: flex;
  }
}
```

#### 3. 使用PostCSS
```javascript
// postcss.config.js
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-preset-env')
  ]
}
```

#### 4. 渐进增强
```css
/* 基础样式 */
.button {
  background: #ccc;
}

/* 增强样式 */
@supports (background: linear-gradient(red, blue)) {
  .button {
    background: linear-gradient(red, blue);
  }
}
``` 