# 前端性能优化面试题

## 1. 网络性能优化

### 问题：如何优化网页加载速度？

**答案：**

**1. 减少 HTTP 请求**
```javascript
// 合并 CSS 和 JS 文件
// 使用 CSS Sprites 合并小图片
// 使用 Base64 编码小图片
const spriteImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
```

**2. 启用 Gzip 压缩**
```nginx
# Nginx 配置
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
gzip_min_length 1000;
```

**3. 使用 CDN**
```html
<!-- 使用 CDN 加载第三方库 -->
<script src="https://cdn.jsdelivr.net/npm/vue@3.2.31/dist/vue.global.js"></script>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
```

**4. 图片优化**
```html
<!-- 使用 WebP 格式 -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="图片">
</picture>

<!-- 响应式图片 -->
<img src="small.jpg" 
     srcset="small.jpg 300w, medium.jpg 600w, large.jpg 900w"
     sizes="(max-width: 600px) 300px, (max-width: 900px) 600px, 900px"
     alt="响应式图片">

<!-- 懒加载 -->
<img src="placeholder.jpg" data-src="actual-image.jpg" loading="lazy" alt="懒加载图片">
```

**5. 资源预加载**
```html
<!-- DNS 预解析 -->
<link rel="dns-prefetch" href="//cdn.example.com">

<!-- 预连接 -->
<link rel="preconnect" href="https://fonts.googleapis.com">

<!-- 预加载关键资源 -->
<link rel="preload" href="critical.css" as="style">
<link rel="preload" href="critical.js" as="script">

<!-- 预获取非关键资源 -->
<link rel="prefetch" href="non-critical.js">
```

### 问题：如何实现资源懒加载？

**答案：**

```javascript
// 图片懒加载实现
class LazyLoader {
  constructor(selector) {
    this.images = document.querySelectorAll(selector);
    this.init();
  }
  
  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadImage(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '50px' // 提前50px开始加载
    });
    
    this.images.forEach(img => {
      observer.observe(img);
    });
  }
  
  loadImage(img) {
    const src = img.dataset.src;
    if (src) {
      img.src = src;
      img.classList.remove('lazy');
      img.classList.add('loaded');
    }
  }
}

// 组件懒加载
const LazyComponent = {
  template: '<div>懒加载组件</div>',
  mounted() {
    console.log('组件已加载');
  }
};

// 路由懒加载
const routes = [
  {
    path: '/user',
    component: () => import('./views/User.vue')
  },
  {
    path: '/admin',
    component: () => import(/* webpackChunkName: "admin" */ './views/Admin.vue')
  }
];

// 使用示例
new LazyLoader('img[data-src]');
```

## 2. 渲染性能优化

### 问题：如何优化 DOM 操作性能？

**答案：**

**1. 使用 DocumentFragment**
```javascript
// 批量操作 DOM
function createList(items) {
  const fragment = document.createDocumentFragment();
  
  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    fragment.appendChild(li);
  });
  
  document.getElementById('list').appendChild(fragment);
}

// 使用示例
createList(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']);
```

**2. 使用虚拟 DOM**
```javascript
// 简单的虚拟 DOM 实现
class VirtualDOM {
  constructor(tag, props, children) {
    this.tag = tag;
    this.props = props || {};
    this.children = children || [];
  }
  
  render() {
    const element = document.createElement(this.tag);
    
    // 设置属性
    Object.keys(this.props).forEach(key => {
      if (key.startsWith('on')) {
        element.addEventListener(key.slice(2).toLowerCase(), this.props[key]);
      } else {
        element.setAttribute(key, this.props[key]);
      }
    });
    
    // 渲染子元素
    this.children.forEach(child => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else {
        element.appendChild(child.render());
      }
    });
    
    return element;
  }
}

// 使用示例
const vdom = new VirtualDOM('div', { class: 'container' }, [
  new VirtualDOM('h1', {}, ['Hello World']),
  new VirtualDOM('p', {}, ['This is a paragraph'])
]);

document.body.appendChild(vdom.render());
```

**3. 事件委托**
```javascript
// 使用事件委托优化事件监听
document.getElementById('list').addEventListener('click', (e) => {
  if (e.target.matches('.item')) {
    console.log('点击了:', e.target.textContent);
  }
});

// 避免为每个元素添加事件监听
// 不好的做法
document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', handleClick);
});
```

**4. 防抖和节流**
```javascript
// 防抖 - 延迟执行
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 节流 - 限制执行频率
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// 使用示例
const handleScroll = throttle(() => {
  console.log('滚动事件');
}, 100);

window.addEventListener('scroll', handleScroll);
```

### 问题：如何优化 CSS 性能？

**答案：**

**1. 避免重排和重绘**
```css
/* 不好的做法 - 会触发重排 */
.element {
  width: 100px;
  height: 100px;
  margin: 10px;
  padding: 10px;
}

/* 好的做法 - 使用 transform 和 opacity */
.element {
  transform: translateX(100px);
  opacity: 0.8;
}

/* 批量修改样式 */
.element {
  transform: translateX(100px) scale(1.2) rotate(45deg);
}
```

**2. 使用 will-change 提示浏览器**
```css
.element {
  will-change: transform, opacity;
}

/* 使用完毕后移除 */
.element.animated {
  will-change: auto;
}
```

**3. 优化选择器**
```css
/* 避免过度嵌套 */
.nav ul li a { } /* 不好 */

.nav-link { } /* 好 */

/* 避免使用通配符 */
* { margin: 0; } /* 避免 */

/* 使用类选择器 */
.container { } /* 好 */
```

**4. 使用 CSS 硬件加速**
```css
.element {
  transform: translateZ(0); /* 启用硬件加速 */
  backface-visibility: hidden; /* 隐藏背面 */
  perspective: 1000px; /* 设置透视 */
}
```

## 3. JavaScript 性能优化

### 问题：如何优化 JavaScript 执行性能？

**答案：**

**1. 避免全局查找**
```javascript
// 不好的做法
function bad() {
  for (let i = 0; i < 1000; i++) {
    document.getElementById('myElement').innerHTML = i;
  }
}

// 好的做法
function good() {
  const element = document.getElementById('myElement');
  for (let i = 0; i < 1000; i++) {
    element.innerHTML = i;
  }
}
```

**2. 使用 Web Workers**
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

// worker.js
self.onmessage = function(event) {
  if (event.data.type === 'calculate') {
    const result = event.data.data.reduce((sum, num) => sum + num, 0);
    self.postMessage(result);
  }
};
```

**3. 使用 requestAnimationFrame**
```javascript
// 优化动画性能
function animate() {
  // 执行动画逻辑
  element.style.left = (parseInt(element.style.left) + 1) + 'px';
  
  if (parseInt(element.style.left) < 500) {
    requestAnimationFrame(animate);
  }
}

requestAnimationFrame(animate);
```

**4. 内存管理**
```javascript
// 避免内存泄漏
class Component {
  constructor() {
    this.handler = this.handleClick.bind(this);
    this.element.addEventListener('click', this.handler);
  }
  
  destroy() {
    this.element.removeEventListener('click', this.handler);
    this.handler = null;
  }
}

// 使用 WeakMap 避免内存泄漏
const cache = new WeakMap();

function getData(obj) {
  if (cache.has(obj)) {
    return cache.get(obj);
  }
  
  const data = expensiveCalculation(obj);
  cache.set(obj, data);
  return data;
}
```

**5. 优化循环**
```javascript
// 缓存数组长度
const arr = [1, 2, 3, 4, 5];
for (let i = 0, len = arr.length; i < len; i++) {
  console.log(arr[i]);
}

// 使用 for...of 遍历
for (const item of arr) {
  console.log(item);
}

// 使用 forEach 处理数组
arr.forEach(item => console.log(item));
```

## 4. 代码分割和打包优化

### 问题：如何实现代码分割？

**答案：**

**1. 动态导入**
```javascript
// 路由级别的代码分割
const routes = [
  {
    path: '/user',
    component: () => import('./views/User.vue')
  },
  {
    path: '/admin',
    component: () => import('./views/Admin.vue')
  }
];

// 组件级别的代码分割
const HeavyComponent = () => import('./components/HeavyComponent.vue');

// 条件加载
const DevTools = () => {
  if (process.env.NODE_ENV === 'development') {
    return import('./components/DevTools.vue');
  }
  return Promise.resolve(null);
};
```

**2. Webpack 配置优化**
```javascript
// webpack.config.js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].chunk.js'
  }
};
```

**3. 预加载和预获取**
```javascript
// 预加载关键资源
import(/* webpackPreload: true */ './critical-module.js');

// 预获取非关键资源
import(/* webpackPrefetch: true */ './non-critical-module.js');

// 预加载特定块
import(/* webpackPreload: true, webpackChunkName: "admin" */ './admin-module.js');
```

## 5. 缓存策略

### 问题：如何实现有效的缓存策略？

**答案：**

**1. 浏览器缓存**
```javascript
// 设置缓存头
app.use((req, res, next) => {
  // 静态资源缓存
  if (req.url.match(/\.(css|js|png|jpg|jpeg|gif|ico)$/)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000');
  }
  
  // HTML 文件缓存
  if (req.url.endsWith('.html')) {
    res.setHeader('Cache-Control', 'no-cache');
  }
  
  next();
});
```

**2. Service Worker 缓存**
```javascript
// service-worker.js
const CACHE_NAME = 'my-app-v1';
const urlsToCache = [
  '/',
  '/styles/main.css',
  '/scripts/main.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
```

**3. 应用级缓存**
```javascript
class CacheManager {
  constructor() {
    this.cache = new Map();
    this.maxSize = 100;
  }
  
  set(key, value, ttl = 60000) {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    
    this.cache.set(key, {
      value,
      timestamp: Date.now(),
      ttl
    });
  }
  
  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value;
  }
}

// 使用示例
const cache = new CacheManager();
cache.set('user:1', { id: 1, name: 'John' });
console.log(cache.get('user:1'));
```

## 6. 监控和分析

### 问题：如何监控前端性能？

**答案：**

**1. 使用 Performance API**
```javascript
// 监控页面加载性能
window.addEventListener('load', () => {
  const perfData = performance.getEntriesByType('navigation')[0];
  
  console.log('DNS 查询时间:', perfData.domainLookupEnd - perfData.domainLookupStart);
  console.log('TCP 连接时间:', perfData.connectEnd - perfData.connectStart);
  console.log('请求响应时间:', perfData.responseEnd - perfData.requestStart);
  console.log('DOM 解析时间:', perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart);
  console.log('页面完全加载时间:', perfData.loadEventEnd - perfData.loadEventStart);
});

// 监控资源加载
performance.getEntriesByType('resource').forEach(resource => {
  console.log(`${resource.name}: ${resource.duration}ms`);
});
```

**2. 监控用户交互性能**
```javascript
// 监控点击响应时间
let clickStartTime;

document.addEventListener('click', () => {
  clickStartTime = performance.now();
});

// 在点击处理函数中
function handleClick() {
  const clickDuration = performance.now() - clickStartTime;
  console.log('点击响应时间:', clickDuration);
  
  // 发送到分析服务
  analytics.track('click_performance', { duration: clickDuration });
}
```

**3. 监控内存使用**
```javascript
// 监控内存泄漏
function checkMemoryUsage() {
  if (performance.memory) {
    const { usedJSHeapSize, totalJSHeapSize, jsHeapSizeLimit } = performance.memory;
    
    console.log('已使用内存:', usedJSHeapSize / 1024 / 1024, 'MB');
    console.log('总内存:', totalJSHeapSize / 1024 / 1024, 'MB');
    console.log('内存限制:', jsHeapSizeLimit / 1024 / 1024, 'MB');
    
    // 检查内存使用率
    const usageRatio = usedJSHeapSize / jsHeapSizeLimit;
    if (usageRatio > 0.8) {
      console.warn('内存使用率过高:', usageRatio * 100, '%');
    }
  }
}

setInterval(checkMemoryUsage, 5000);
```

**4. 错误监控**
```javascript
// 全局错误监控
window.addEventListener('error', (event) => {
  console.error('JavaScript 错误:', event.error);
  
  // 发送错误到监控服务
  errorReporter.captureException(event.error, {
    url: event.filename,
    line: event.lineno,
    column: event.colno
  });
});

// Promise 错误监控
window.addEventListener('unhandledrejection', (event) => {
  console.error('未处理的 Promise 错误:', event.reason);
  
  errorReporter.captureException(event.reason);
});
```

## 7. 实际应用场景

### 问题：如何优化大型列表的渲染性能？

**答案：**

```javascript
class VirtualList {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      itemHeight: 50,
      buffer: 5,
      ...options
    };
    
    this.items = [];
    this.scrollTop = 0;
    this.visibleCount = 0;
    this.startIndex = 0;
    this.endIndex = 0;
    
    this.init();
  }
  
  init() {
    this.setupContainer();
    this.calculateVisibleCount();
    this.render();
    
    this.container.addEventListener('scroll', this.handleScroll.bind(this));
    window.addEventListener('resize', this.handleResize.bind(this));
  }
  
  setupContainer() {
    this.container.style.position = 'relative';
    this.container.style.overflow = 'auto';
    
    this.content = document.createElement('div');
    this.content.style.position = 'relative';
    this.container.appendChild(this.content);
  }
  
  calculateVisibleCount() {
    const containerHeight = this.container.clientHeight;
    this.visibleCount = Math.ceil(containerHeight / this.options.itemHeight);
  }
  
  handleScroll() {
    this.scrollTop = this.container.scrollTop;
    this.updateVisibleRange();
    this.render();
  }
  
  updateVisibleRange() {
    this.startIndex = Math.floor(this.scrollTop / this.options.itemHeight);
    this.startIndex = Math.max(0, this.startIndex - this.options.buffer);
    
    this.endIndex = this.startIndex + this.visibleCount + this.options.buffer * 2;
    this.endIndex = Math.min(this.items.length, this.endIndex);
  }
  
  render() {
    this.content.style.height = `${this.items.length * this.options.itemHeight}px`;
    
    // 清除现有内容
    this.content.innerHTML = '';
    
    // 只渲染可见项
    for (let i = this.startIndex; i < this.endIndex; i++) {
      const item = this.createItem(this.items[i], i);
      item.style.position = 'absolute';
      item.style.top = `${i * this.options.itemHeight}px`;
      item.style.height = `${this.options.itemHeight}px`;
      this.content.appendChild(item);
    }
  }
  
  createItem(data, index) {
    const item = document.createElement('div');
    item.className = 'virtual-item';
    item.textContent = data.title || `Item ${index + 1}`;
    return item;
  }
  
  setItems(items) {
    this.items = items;
    this.updateVisibleRange();
    this.render();
  }
}

// 使用示例
const container = document.getElementById('list-container');
const virtualList = new VirtualList(container, {
  itemHeight: 60,
  buffer: 3
});

// 设置大量数据
const items = Array.from({ length: 10000 }, (_, i) => ({
  id: i + 1,
  title: `Item ${i + 1}`
}));

virtualList.setItems(items);
```

### 问题：如何优化图片加载性能？

**答案：**

```javascript
class ImageOptimizer {
  constructor() {
    this.observer = new IntersectionObserver(this.handleIntersection.bind(this));
    this.imageCache = new Map();
  }
  
  optimizeImages() {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => this.observer.observe(img));
  }
  
  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.loadImage(entry.target);
        this.observer.unobserve(entry.target);
      }
    });
  }
  
  async loadImage(img) {
    const src = img.dataset.src;
    if (!src) return;
    
    try {
      // 检查缓存
      if (this.imageCache.has(src)) {
        img.src = this.imageCache.get(src);
        return;
      }
      
      // 预加载图片
      const image = new Image();
      image.onload = () => {
        img.src = src;
        img.classList.remove('lazy');
        img.classList.add('loaded');
        this.imageCache.set(src, src);
      };
      
      image.onerror = () => {
        img.src = 'placeholder.jpg';
        img.classList.add('error');
      };
      
      image.src = src;
    } catch (error) {
      console.error('图片加载失败:', error);
    }
  }
  
  // 图片压缩
  async compressImage(file, quality = 0.8) {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob(resolve, 'image/jpeg', quality);
      };
      
      img.src = URL.createObjectURL(file);
    });
  }
  
  // 生成缩略图
  async generateThumbnail(file, maxWidth = 200, maxHeight = 200) {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        const { width, height } = this.calculateDimensions(
          img.width, img.height, maxWidth, maxHeight
        );
        
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(resolve, 'image/jpeg', 0.8);
      };
      
      img.src = URL.createObjectURL(file);
    });
  }
  
  calculateDimensions(width, height, maxWidth, maxHeight) {
    const ratio = Math.min(maxWidth / width, maxHeight / height);
    return {
      width: width * ratio,
      height: height * ratio
    };
  }
}

// 使用示例
const optimizer = new ImageOptimizer();
optimizer.optimizeImages();

// 压缩上传的图片
const fileInput = document.getElementById('file-input');
fileInput.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (file) {
    const compressed = await optimizer.compressImage(file, 0.7);
    const thumbnail = await optimizer.generateThumbnail(file);
    
    console.log('压缩后大小:', compressed.size);
    console.log('缩略图大小:', thumbnail.size);
  }
});
```

这些性能优化面试题涵盖了前端开发中最重要的性能优化策略，包括网络优化、渲染优化、JavaScript 优化、缓存策略、监控分析等。掌握这些知识对于提升应用性能和通过技术面试都非常重要。 