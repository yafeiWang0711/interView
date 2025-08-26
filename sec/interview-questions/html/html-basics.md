# HTML 基础面试题

## 1. HTML5 新特性

### 问题：HTML5 相比 HTML4 有哪些新特性？



**答案：**

**1. 语义化标签**
```html
<!-- 页面结构语义化 -->
<header>     <!-- 页头 -->
<nav>        <!-- 导航 -->
<main>       <!-- 主要内容 -->
<article>    <!-- 文章 -->
<section>    <!-- 区块 -->
<aside>      <!-- 侧边栏 -->
<footer>     <!-- 页脚 -->
<figure>     <!-- 图片容器 -->
<figcaption> <!-- 图片说明 -->
<time>       <!-- 时间 -->
<mark>       <!-- 高亮文本 -->
<progress>   <!-- 进度条 -->
<meter>      <!-- 度量 -->
```

**2. 表单增强**
```html
<!-- 新的 input 类型 -->
<input type="email" placeholder="请输入邮箱">
<input type="url" placeholder="请输入网址">
<input type="number" min="0" max="100" step="5">
<input type="range" min="0" max="100" value="50">
<input type="date" value="2024-01-01">
<input type="time" value="12:00">
<input type="datetime-local" value="2024-01-01T12:00">
<input type="color" value="#ff0000">
<input type="search" placeholder="搜索...">
<input type="tel" pattern="[0-9]{11}" placeholder="手机号">
<input type="file" accept="image/*" multiple>

<!-- 新的表单属性 -->
<input required>                    <!-- 必填 -->
<input placeholder="提示文本">      <!-- 占位符 -->
<input autofocus>                   <!-- 自动聚焦 -->
<input pattern="[A-Za-z]{3}">      <!-- 正则验证 -->
<input min="0" max="100">          <!-- 数值范围 -->
<input step="5">                   <!-- 步长 -->
<input list="browsers">            <!-- 数据列表 -->
<datalist id="browsers">
  <option value="Chrome">
  <option value="Firefox">
  <option value="Safari">
</datalist>
```

**3. 多媒体支持**
```html
<!-- 视频播放 -->
<video width="320" height="240" controls>
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.webm" type="video/webm">
  <source src="movie.ogg" type="video/ogg">
  您的浏览器不支持视频标签。
</video>

<!-- 音频播放 -->
<audio controls>
  <source src="audio.mp3" type="audio/mpeg">
  <source src="audio.ogg" type="audio/ogg">
  您的浏览器不支持音频标签。
</audio>

<!-- 视频属性 -->
<video 
  width="320" 
  height="240" 
  controls 
  autoplay 
  muted 
  loop 
  preload="auto"
  poster="poster.jpg">
  <track kind="subtitles" src="subtitles.vtt" srclang="zh" label="中文">
</video>
```

**4. Canvas 和 SVG**
```html
<!-- Canvas 绘图 -->
<canvas id="myCanvas" width="200" height="100"></canvas>
<script>
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'red';
ctx.fillRect(10, 10, 150, 80);
</script>

<!-- SVG 矢量图形 -->
<svg width="100" height="100">
  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red"/>
  <rect x="10" y="10" width="80" height="80" fill="blue" opacity="0.5"/>
</svg>
```

**5. Web Storage**
```javascript
// localStorage - 永久存储
localStorage.setItem('username', 'john');
localStorage.getItem('username'); // 'john'
localStorage.removeItem('username');
localStorage.clear();

// sessionStorage - 会话存储
sessionStorage.setItem('token', 'abc123');
sessionStorage.getItem('token'); // 'abc123'
sessionStorage.removeItem('token');
sessionStorage.clear();

// 存储事件监听
window.addEventListener('storage', (e) => {
  console.log('存储变化:', e.key, e.newValue, e.oldValue);
});
```

**6. Web Workers**
```javascript
// main.js
const worker = new Worker('worker.js');

worker.postMessage({
  type: 'calculate',
  data: [1, 2, 3, 4, 5]
});

worker.onmessage = function(event) {
  console.log('计算结果:', event.data);
};

worker.onerror = function(error) {
  console.error('Worker 错误:', error);
};

// worker.js
self.onmessage = function(event) {
  if (event.data.type === 'calculate') {
    const result = event.data.data.reduce((sum, num) => sum + num, 0);
    self.postMessage(result);
  }
};
```

**7. WebSocket**
```javascript
const socket = new WebSocket('ws://localhost:8080');

socket.onopen = function(event) {
  console.log('连接已建立');
  socket.send('Hello Server!');
};

socket.onmessage = function(event) {
  console.log('收到消息:', event.data);
};

socket.onclose = function(event) {
  console.log('连接已关闭');
};

socket.onerror = function(error) {
  console.error('WebSocket 错误:', error);
};
```

**8. 地理定位**
```javascript
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function(position) {
      console.log('纬度:', position.coords.latitude);
      console.log('经度:', position.coords.longitude);
    },
    function(error) {
      console.error('定位错误:', error.message);
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 60000
    }
  );
}
```

**9. 拖拽 API**
```html
<!-- 可拖拽元素 -->
<div draggable="true" ondragstart="drag(event)">拖拽我</div>

<!-- 放置区域 -->
<div ondrop="drop(event)" ondragover="allowDrop(event)">放置区域</div>

<script>
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}
</script>
```

## 2. 语义化标签

### 问题：什么是语义化标签？为什么要使用语义化标签？

**答案：**

**语义化标签定义：**
语义化标签是指具有明确含义的HTML标签，能够清楚地表达其包含内容的作用和结构。

**优势：**

1. **SEO 友好**
```html
<!-- 搜索引擎更容易理解页面结构 -->
<header>
  <h1>网站标题</h1>
  <nav>
    <ul>
      <li><a href="/">首页</a></li>
      <li><a href="/about">关于</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h2>文章标题</h2>
    <p>文章内容...</p>
  </article>
  
  <aside>
    <h3>相关链接</h3>
    <ul>
      <li><a href="#">链接1</a></li>
      <li><a href="#">链接2</a></li>
    </ul>
  </aside>
</main>

<footer>
  <p>&copy; 2024 版权所有</p>
</footer>
```

2. **可访问性**
```html
<!-- 屏幕阅读器能更好地理解内容 -->
<nav aria-label="主导航">
  <ul role="menubar">
    <li role="menuitem"><a href="/">首页</a></li>
    <li role="menuitem"><a href="/products">产品</a></li>
  </ul>
</nav>

<main role="main">
  <article>
    <header>
      <h1>文章标题</h1>
      <time datetime="2024-01-01">2024年1月1日</time>
    </header>
    <p>文章内容...</p>
  </article>
</main>
```

3. **代码可读性**
```html
<!-- 清晰的页面结构 -->
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>语义化页面</title>
</head>
<body>
  <!-- 页头 -->
  <header>
    <h1>网站名称</h1>
    <nav>
      <ul>
        <li><a href="#home">首页</a></li>
        <li><a href="#about">关于</a></li>
        <li><a href="#contact">联系</a></li>
      </ul>
    </nav>
  </header>

  <!-- 主要内容 -->
  <main>
    <!-- 文章区域 -->
    <section>
      <h2>最新文章</h2>
      <article>
        <h3>文章标题1</h3>
        <p>文章摘要...</p>
        <footer>
          <time datetime="2024-01-01">2024-01-01</time>
          <author>作者名</author>
        </footer>
      </article>
      
      <article>
        <h3>文章标题2</h3>
        <p>文章摘要...</p>
      </article>
    </section>

    <!-- 侧边栏 -->
    <aside>
      <h3>相关推荐</h3>
      <ul>
        <li><a href="#">推荐链接1</a></li>
        <li><a href="#">推荐链接2</a></li>
      </ul>
    </aside>
  </main>

  <!-- 页脚 -->
  <footer>
    <p>&copy; 2024 版权所有</p>
    <nav>
      <a href="/privacy">隐私政策</a>
      <a href="/terms">服务条款</a>
    </nav>
  </footer>
</body>
</html>
```

4. **维护性**
```html
<!-- 便于团队协作和维护 -->
<header class="site-header">
  <div class="container">
    <h1 class="site-title">网站名称</h1>
    <nav class="main-nav">
      <!-- 导航内容 -->
    </nav>
  </div>
</header>

<main class="site-main">
  <div class="container">
    <section class="content-area">
      <!-- 主要内容 -->
    </section>
    
    <aside class="sidebar">
      <!-- 侧边栏内容 -->
    </aside>
  </div>
</main>
```

## 3. DOCTYPE 声明

### 问题：DOCTYPE 的作用是什么？HTML5 的 DOCTYPE 怎么写？

**答案：**

**DOCTYPE 作用：**

1. **避免怪异模式**
```html
<!-- HTML5 DOCTYPE -->
<!DOCTYPE html>

<!-- 告诉浏览器使用标准模式渲染 -->
<!-- 避免进入怪异模式（Quirks Mode） -->
```

2. **确保标准模式**
```html
<!-- 标准模式 vs 怪异模式 -->
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>标准模式</title>
</head>
<body>
  <!-- 在标准模式下，盒模型、布局等行为符合标准 -->
</body>
</html>
```

3. **提高兼容性**
```html
<!-- 不同版本的 DOCTYPE -->
<!-- HTML 4.01 Strict -->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">

<!-- HTML 4.01 Transitional -->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<!-- XHTML 1.0 Strict -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<!-- HTML5 (推荐) -->
<!DOCTYPE html>
```

**检测渲染模式：**
```javascript
// 检测当前渲染模式
function getDocumentMode() {
  const mode = document.compatMode;
  
  if (mode === 'CSS1Compat') {
    return '标准模式';
  } else if (mode === 'BackCompat') {
    return '怪异模式';
  } else {
    return '未知模式';
  }
}

console.log('当前渲染模式:', getDocumentMode());
```

## 4. Meta 标签

### 问题：常用的 meta 标签有哪些？

**答案：**

**1. 字符编码**
```html
<!-- 设置字符编码 -->
<meta charset="UTF-8">

<!-- 兼容旧版本 -->
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
```

**2. 视口设置**
```html
<!-- 移动端视口设置 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

<!-- 详细参数说明 -->
<meta name="viewport" content="
  width=device-width,        <!-- 视口宽度等于设备宽度 -->
  initial-scale=1.0,        <!-- 初始缩放比例 -->
  maximum-scale=2.0,        <!-- 最大缩放比例 -->
  minimum-scale=0.5,        <!-- 最小缩放比例 -->
  user-scalable=yes,        <!-- 是否允许用户缩放 -->
  viewport-fit=cover        <!-- 视口适配方式 -->
">
```

**3. SEO 相关**
```html
<!-- 页面描述 -->
<meta name="description" content="这是一个关于前端开发的网站，提供HTML、CSS、JavaScript等教程">

<!-- 关键词 -->
<meta name="keywords" content="前端开发,HTML,CSS,JavaScript,Vue,React">

<!-- 作者信息 -->
<meta name="author" content="张三">

<!-- 版权信息 -->
<meta name="copyright" content="Copyright 2024">

<!-- 机器人指令 -->
<meta name="robots" content="index,follow">
<meta name="robots" content="noindex,nofollow">
<meta name="robots" content="index,nofollow">

<!-- 搜索引擎优化 -->
<meta name="googlebot" content="index,follow">
<meta name="baiduspider" content="index,follow">
```

**4. 移动端优化**
```html
<!-- 禁用电话号码自动识别 -->
<meta name="format-detection" content="telephone=no">

<!-- 禁用邮箱自动识别 -->
<meta name="format-detection" content="email=no">

<!-- 禁用地址自动识别 -->
<meta name="format-detection" content="address=no">

<!-- iOS 设备优化 -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="apple-mobile-web-app-title" content="应用名称">

<!-- iOS 图标 -->
<link rel="apple-touch-icon" href="icon-180x180.png">
<link rel="apple-touch-icon" sizes="152x152" href="icon-152x152.png">
<link rel="apple-touch-icon" sizes="180x180" href="icon-180x180.png">
<link rel="apple-touch-icon" sizes="167x167" href="icon-167x167.png">

<!-- Android 设备优化 -->
<meta name="mobile-web-app-capable" content="yes">
<meta name="theme-color" content="#ff0000">
```

**5. 缓存控制**
```html
<!-- 缓存控制 -->
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">

<!-- 页面刷新 -->
<meta http-equiv="refresh" content="30">
<meta http-equiv="refresh" content="5;url=https://example.com">

<!-- 页面重定向 -->
<meta http-equiv="refresh" content="0;url=https://example.com">
```

**6. 安全相关**
```html
<!-- XSS 防护 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="X-Content-Type-Options" content="nosniff">

<!-- CSP 内容安全策略 -->
<meta http-equiv="Content-Security-Policy" content="default-src 'self'">

<!-- 引用策略 -->
<meta name="referrer" content="no-referrer">
<meta name="referrer" content="origin">
<meta name="referrer" content="origin-when-cross-origin">
```

**7. 社交媒体优化**
```html
<!-- Open Graph (Facebook) -->
<meta property="og:title" content="页面标题">
<meta property="og:description" content="页面描述">
<meta property="og:image" content="https://example.com/image.jpg">
<meta property="og:url" content="https://example.com">
<meta property="og:type" content="website">
<meta property="og:site_name" content="网站名称">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="页面标题">
<meta name="twitter:description" content="页面描述">
<meta name="twitter:image" content="https://example.com/image.jpg">
<meta name="twitter:site" content="@username">
<meta name="twitter:creator" content="@username">
```

## 5. 表单元素

### 问题：HTML5 新增了哪些表单元素和属性？

**答案：**

**1. 新的 input 类型**
```html
<!-- 邮箱输入 -->
<input type="email" name="email" placeholder="请输入邮箱地址" required>

<!-- URL 输入 -->
<input type="url" name="website" placeholder="请输入网址" pattern="https?://.+">

<!-- 数字输入 -->
<input type="number" name="age" min="0" max="120" step="1" value="18">

<!-- 范围滑块 -->
<input type="range" name="volume" min="0" max="100" value="50" step="5">
<output for="volume">50</output>

<!-- 日期选择 -->
<input type="date" name="birthday" min="1900-01-01" max="2024-12-31">

<!-- 时间选择 -->
<input type="time" name="meeting-time" min="09:00" max="18:00">

<!-- 日期时间选择 -->
<input type="datetime-local" name="appointment">

<!-- 月份选择 -->
<input type="month" name="birth-month">

<!-- 周选择 -->
<input type="week" name="vacation-week">

<!-- 颜色选择 -->
<input type="color" name="theme-color" value="#ff0000">

<!-- 搜索框 -->
<input type="search" name="q" placeholder="搜索..." autocomplete="off">

<!-- 电话号码 -->
<input type="tel" name="phone" pattern="[0-9]{11}" placeholder="手机号码">
```

**2. 新的表单属性**
```html
<!-- 必填字段 -->
<input type="text" name="username" required>

<!-- 占位符文本 -->
<input type="text" name="search" placeholder="请输入搜索关键词">

<!-- 自动聚焦 -->
<input type="text" name="username" autofocus>

<!-- 正则验证 -->
<input type="text" name="username" pattern="[A-Za-z]{3,}" title="用户名至少3个字母">

<!-- 数值范围 -->
<input type="number" name="age" min="18" max="65">

<!-- 步长 -->
<input type="number" name="price" step="0.01" min="0">

<!-- 数据列表 -->
<input type="text" name="browser" list="browsers">
<datalist id="browsers">
  <option value="Chrome">
  <option value="Firefox">
  <option value="Safari">
  <option value="Edge">
</datalist>

<!-- 自动完成 -->
<input type="text" name="email" autocomplete="email">
<input type="password" name="password" autocomplete="current-password">

<!-- 只读 -->
<input type="text" name="user-id" value="12345" readonly>

<!-- 禁用 -->
<input type="text" name="disabled-field" disabled>

<!-- 表单验证 -->
<form novalidate>
  <input type="email" name="email" required>
  <button type="submit">提交</button>
</form>
```

**3. 表单验证**
```html
<!-- 客户端表单验证 -->
<form onsubmit="return validateForm()">
  <input type="email" name="email" required>
  <input type="password" name="password" minlength="8" required>
  <input type="tel" name="phone" pattern="[0-9]{11}" required>
  <button type="submit">提交</button>
</form>

<script>
function validateForm() {
  const form = document.querySelector('form');
  
  // 检查表单是否有效
  if (!form.checkValidity()) {
    // 显示验证消息
    form.reportValidity();
    return false;
  }
  
  return true;
}

// 自定义验证
const emailInput = document.querySelector('input[type="email"]');
emailInput.addEventListener('input', function() {
  if (this.validity.typeMismatch) {
    this.setCustomValidity('请输入有效的邮箱地址');
  } else {
    this.setCustomValidity('');
  }
});
</script>
```

**4. 表单增强**
```html
<!-- 进度条 -->
<progress value="70" max="100">70%</progress>

<!-- 度量 -->
<meter value="0.6" min="0" max="1" low="0.3" high="0.8" optimum="0.5">60%</meter>

<!-- 输出元素 -->
<form oninput="result.value = parseInt(a.value) + parseInt(b.value)">
  <input type="number" id="a" value="0"> +
  <input type="number" id="b" value="0"> =
  <output name="result" for="a b">0</output>
</form>

<!-- 字段集 -->
<fieldset>
  <legend>个人信息</legend>
  <label for="name">姓名：</label>
  <input type="text" id="name" name="name" required>
  
  <label for="email">邮箱：</label>
  <input type="email" id="email" name="email" required>
</fieldset>
```

## 6. 图片优化

### 问题：如何优化网页中的图片？

**答案：**

**1. 选择合适的格式**
```html
<!-- JPEG - 适合照片 -->
<img src="photo.jpg" alt="照片">

<!-- PNG - 适合透明图片 -->
<img src="logo.png" alt="Logo">

<!-- WebP - 现代浏览器支持的高效格式 -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="图片">
</picture>

<!-- SVG - 矢量图形 -->
<img src="icon.svg" alt="图标">
```

**2. 响应式图片**
```html
<!-- 使用 srcset 和 sizes -->
<img src="small.jpg" 
     srcset="small.jpg 300w, medium.jpg 600w, large.jpg 900w"
     sizes="(max-width: 600px) 300px, (max-width: 900px) 600px, 900px"
     alt="响应式图片">

<!-- 使用 picture 元素 -->
<picture>
  <source media="(max-width: 600px)" srcset="small.jpg">
  <source media="(max-width: 900px)" srcset="medium.jpg">
  <source media="(min-width: 901px)" srcset="large.jpg">
  <img src="fallback.jpg" alt="响应式图片">
</picture>

<!-- 高分辨率屏幕支持 -->
<img src="image.jpg" 
     srcset="image.jpg 1x, image@2x.jpg 2x, image@3x.jpg 3x"
     alt="高分辨率图片">
```

**3. 懒加载**
```html
<!-- 原生懒加载 -->
<img src="image.jpg" loading="lazy" alt="懒加载图片">

<!-- 自定义懒加载 -->
<img data-src="image.jpg" alt="懒加载图片" class="lazy">

<script>
// 懒加载实现
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      observer.unobserve(img);
    }
  });
});

lazyImages.forEach(img => imageObserver.observe(img));
</script>
```

**4. 图片压缩和优化**
```html
<!-- 使用适当的尺寸 -->
<img src="image-800x600.jpg" width="400" height="300" alt="图片">

<!-- 使用 CSS 控制尺寸 -->
<img src="image.jpg" style="max-width: 100%; height: auto;" alt="图片">

<!-- 使用 CSS 背景图片 -->
<div style="background-image: url('image.jpg'); background-size: cover;"></div>
```

**5. 图片预加载**
```html
<!-- 预加载关键图片 -->
<link rel="preload" as="image" href="hero-image.jpg">

<!-- 预加载多个图片 -->
<link rel="preload" as="image" href="image1.jpg">
<link rel="preload" as="image" href="image2.jpg">

<!-- 使用 JavaScript 预加载 -->
<script>
function preloadImage(src) {
  const img = new Image();
  img.src = src;
}

// 预加载图片
preloadImage('important-image.jpg');
</script>
```

**6. 图片格式检测**
```html
<!-- 检测 WebP 支持 -->
<script>
function checkWebPSupport() {
  const webP = new Image();
  webP.onload = webP.onerror = function() {
    const isSupported = webP.height === 2;
    if (isSupported) {
      // 使用 WebP 格式
      document.querySelectorAll('img[data-webp]').forEach(img => {
        img.src = img.dataset.webp;
      });
    }
  };
  webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
}

checkWebPSupport();
</script>
```

## 7. 无障碍访问

### 问题：如何提高网页的无障碍访问性？

**答案：**

**1. 语义化标签**
```html
<!-- 使用语义化标签 -->
<header>
  <h1>网站标题</h1>
  <nav aria-label="主导航">
    <ul>
      <li><a href="/">首页</a></li>
      <li><a href="/about">关于</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h2>文章标题</h2>
    <p>文章内容...</p>
  </article>
</main>

<footer>
  <p>&copy; 2024 版权所有</p>
</footer>
```

**2. ARIA 属性**
```html
<!-- 角色定义 -->
<div role="banner">页头</div>
<div role="navigation" aria-label="主导航">导航</div>
<div role="main">主要内容</div>
<div role="complementary" aria-label="侧边栏">侧边栏</div>
<div role="contentinfo">页脚</div>

<!-- 状态和属性 -->
<button aria-expanded="false" aria-controls="menu">
  展开菜单
</button>
<div id="menu" aria-hidden="true">
  菜单内容
</div>

<!-- 标签关联 -->
<label for="username">用户名：</label>
<input type="text" id="username" name="username" aria-describedby="username-help">
<div id="username-help">用户名至少3个字符</div>

<!-- 描述性文本 -->
<img src="chart.jpg" alt="销售数据图表，显示第一季度销售额增长15%" aria-describedby="chart-desc">
<div id="chart-desc">详细的数据分析说明...</div>
```

**3. 键盘导航**
```html
<!-- 可聚焦元素 -->
<button tabindex="0">可聚焦按钮</button>
<a href="#" tabindex="0">可聚焦链接</a>

<!-- 跳过导航链接 -->
<a href="#main-content" class="skip-link">跳到主要内容</a>

<header>
  <!-- 导航内容 -->
</header>

<main id="main-content">
  <!-- 主要内容 -->
</main>

<style>
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: #000;
  color: #fff;
  padding: 8px;
  text-decoration: none;
  z-index: 100;
}

.skip-link:focus {
  top: 6px;
}
</style>
```

**4. 颜色和对比度**
```html
<!-- 确保足够的颜色对比度 -->
<style>
/* 良好的对比度 */
.high-contrast {
  color: #000;
  background-color: #fff;
}

/* 避免仅使用颜色传达信息 */
.error {
  color: #ff0000;
  border: 2px solid #ff0000;
  font-weight: bold;
}

.success {
  color: #008000;
  border: 2px solid #008000;
  font-weight: bold;
}
</style>

<!-- 使用图标和文字 -->
<button aria-label="删除项目">
  <span class="icon">🗑️</span>
  <span class="text">删除</span>
</button>
```

**5. 表单无障碍**
```html
<!-- 标签关联 -->
<label for="email">邮箱地址：</label>
<input type="email" id="email" name="email" required aria-describedby="email-error">

<div id="email-error" role="alert" aria-live="polite"></div>

<!-- 字段组 -->
<fieldset>
  <legend>联系方式</legend>
  
  <label for="name">姓名：</label>
  <input type="text" id="name" name="name" required>
  
  <label for="phone">电话：</label>
  <input type="tel" id="phone" name="phone" pattern="[0-9]{11}">
</fieldset>

<!-- 错误处理 -->
<script>
const emailInput = document.querySelector('#email');
const emailError = document.querySelector('#email-error');

emailInput.addEventListener('blur', function() {
  if (!this.validity.valid) {
    emailError.textContent = '请输入有效的邮箱地址';
    emailError.style.display = 'block';
  } else {
    emailError.textContent = '';
    emailError.style.display = 'none';
  }
});
</script>
```

**6. 多媒体无障碍**
```html
<!-- 视频字幕 -->
<video controls>
  <source src="video.mp4" type="video/mp4">
  <track kind="subtitles" src="subtitles.vtt" srclang="zh" label="中文">
  <track kind="subtitles" src="subtitles-en.vtt" srclang="en" label="English">
</video>

<!-- 音频描述 -->
<audio controls>
  <source src="audio.mp3" type="audio/mpeg">
  <track kind="descriptions" src="audio-desc.vtt" srclang="zh" label="音频描述">
</audio>

<!-- 图片描述 -->
<img src="chart.jpg" alt="销售数据图表" longdesc="chart-description.html">

<!-- 替代文本 -->
<img src="logo.png" alt="公司Logo">
<img src="decorative.jpg" alt="" role="presentation">
```

**7. 动态内容无障碍**
```html
<!-- 实时区域 -->
<div aria-live="polite" aria-atomic="true">
  <span id="status">页面加载中...</span>
</div>

<script>
// 更新状态信息
function updateStatus(message) {
  document.getElementById('status').textContent = message;
}

// 通知屏幕阅读器
function announceToScreenReader(message) {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.textContent = message;
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}
</script>
```

**8. 测试工具**
```html
<!-- 无障碍测试 -->
<script>
// 检查图片是否有 alt 属性
function checkImageAccessibility() {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (!img.alt && !img.getAttribute('role') === 'presentation') {
      console.warn('图片缺少 alt 属性:', img);
    }
  });
}

// 检查表单标签
function checkFormAccessibility() {
  const inputs = document.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    if (!input.id || !document.querySelector(`label[for="${input.id}"]`)) {
      console.warn('表单元素缺少标签:', input);
    }
  });
}

// 页面加载时检查
document.addEventListener('DOMContentLoaded', function() {
  checkImageAccessibility();
  checkFormAccessibility();
});
</script>
```

这些HTML面试题涵盖了HTML5的所有重要特性，包括语义化标签、表单增强、多媒体支持、无障碍访问等。每个问题都有详细的答案和实际应用示例，非常适合准备前端面试使用。 