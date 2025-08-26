<template>
  <div class="performance-optimization-qa">
    <div class="qa-header">
      <h1>前端性能优化常见问题及解决方案</h1>
      <p>
        整理了前端开发中常见的性能优化问题及最佳实践，帮助提升应用加载速度和运行效率
      </p>
    </div>

    <div class="qa-container">
      <div v-for="(item, index) in qaItems" :key="index" class="qa-item">
        <div class="qa-question" @click="toggleAnswer(index)">
          <span class="question-number">{{ index + 1 }}.</span>
          <span class="question-text">{{ item.question }}</span>
          <span class="toggle-icon">{{ item.isOpen ? "−" : "+" }}</span>
        </div>

        <div class="qa-answer" v-if="item.isOpen">
          <!-- 问题1答案 -->
          <div v-if="index === 0">
            <p>
              关键渲染路径是浏览器将HTML、CSS和JavaScript转换为屏幕上像素的过程，优化它可以显著提升页面加载速度。主要优化策略包括：
            </p>
            <ul>
              <li>
                <strong>HTML优化</strong
                >：减少HTML文件大小，使用语义化标签，避免深层嵌套
              </li>
              <li>
                <strong>CSS优化</strong
                >：将CSS放在&lt;head&gt;中，避免CSS阻塞渲染，使用媒体查询实现条件加载
              </li>
              <li>
                <strong>JavaScript优化</strong
                >：将脚本放在&lt;body&gt;底部，使用async/defer属性，避免长时间运行的JavaScript阻塞渲染
              </li>
              <li>
                <strong>关键资源优先加载</strong
                >：识别并优先加载渲染首屏所需的关键资源
              </li>
            </ul>
            <div class="code-example">
              <pre><code>&lt;!-- 优化CSS加载 --&gt;
&lt;link rel="stylesheet" href="critical.css"&gt;
&lt;link rel="stylesheet" href="non-critical.css" media="print" onload="this.media='all'"&gt;

&lt;!-- 优化JavaScript加载 --&gt;
&lt;script src="app.js" defer&gt;&lt;/script&gt;</code></pre>
            </div>
          </div>

          <!-- 问题2答案 -->
          <div v-if="index === 1">
            <!-- 原有内容保持不变 -->
          </div>

          <!-- 问题3答案 -->
          <div v-if="index === 2">
            <p>前端代码分割(Code Splitting)是将代码拆分为多个小块并按需加载的技术，可显著减少初始加载时间。主要实现方式包括：</p>
            <ul>
              <li><strong>基于路由的代码分割</strong>：将不同路由对应的组件分割为独立文件</li>
              <li><strong>基于组件的代码分割</strong>：对大型组件进行单独分割</li>
              <li><strong>动态导入</strong>：使用ES6的import()语法实现按需加载</li>
              <li><strong>库分离</strong>：将第三方库与业务代码分离打包</li>
            </ul>

            <h4>Vue项目中的代码分割实践：</h4>
            <div class="code-example">
              <pre><code>// 1. 路由级代码分割 (router/index.js)
const Home = () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
const About = () => import(/* webpackChunkName: "about" */ '../views/About.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About }
]

// 2. 组件级代码分割
export default {
  components: {
    HeavyComponent: () => import(/* webpackChunkName: "heavy" */ './HeavyComponent.vue')
  }
}

// 3. 异步组件加载与Suspense结合 (Vue 3)
<template>
  <Suspense>
    <template #default>
      <HeavyComponent />
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>

<script>
export default {
  components: {
    HeavyComponent: () => import('./HeavyComponent.vue')
  }
}
</script></code></pre>
            </div>

            <h4>代码分割优化策略：</h4>
            <ul>
              <li>使用魔法注释(webpackChunkName)命名chunk，提高可读性</li>
              <li>结合预加载(preload/prefetch)优化加载时机
                <pre><code>&lt;link rel="preload" href="chunk-about.js" as="script"&gt;
&lt;link rel="prefetch" href="chunk-about.js"&gt;</code></pre>
              </li>
              <li>控制分割粒度，避免过多小文件导致的网络请求开销</li>
              <li>使用webpack的splitChunks配置优化公共代码提取</li>
            </ul>
          </div>

          <!-- 问题4答案 -->
          <div v-if="index === 3">
            <p>首屏加载速度直接影响用户体验和留存率，以下是关键优化策略和衡量方法：</p>

            <h4>核心优化策略：</h4>
            <ul>
              <li><strong>资源加载优化</strong>
                <ul>
                  <li>代码分割与懒加载（路由、组件、图片）</li>
                  <li>关键CSS内联，非关键CSS异步加载</li>
                  <li>图片优化：使用WebP格式、响应式图片、懒加载</li>
                  <li>字体优化：使用font-display策略，字体子集化</li>
                </ul>
              </li>
              <li><strong>网络传输优化</strong>
                <ul>
                  <li>启用HTTP/2或HTTP/3多路复用</li>
                  <li>使用CDN分发静态资源</li>
                  <li>实施Gzip/Brotli压缩</li>
                  <li>配置适当的缓存策略（强缓存+协商缓存）</li>
                </ul>
              </li>
              <li><strong>渲染优化</strong>
                <ul>
                  <li>服务端渲染(SSR)或静态站点生成(SSG)</li>
                  <li>预渲染关键页面</li>
                  <li>减少首屏JavaScript执行时间</li>
                </ul>
              </li>
            </ul>

            <h4>性能衡量指标：</h4>
            <div class="code-example">
              <pre><code>// 核心Web指标 (Core Web Vitals)
- LCP (最大内容绘制): 衡量加载性能，目标≤2.5秒
- FID (首次输入延迟): 衡量交互性，目标≤100毫秒
- CLS (累积布局偏移): 衡量视觉稳定性，目标≤0.1

// 其他关键指标
- TTI (交互时间): 应用完全可交互的时间
- FCP (首次内容绘制): 浏览器首次绘制内容的时间
- TBT (总阻塞时间): 主线程被阻塞的总时间

// 性能API获取指标
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const perfData = performance.getEntriesByType('navigation')[0];
    console.log('首次内容绘制:', perfData.responseStart);
  }, 0);
});</code></pre>
            </div>

            <h4>性能监控工具：</h4>
            <ul>
              <li>Chrome DevTools (Performance面板、Lighthouse)</li>
              <li>WebPageTest.org (详细性能分析)</li>
              <li>Google PageSpeed Insights</li>
              <li>第三方APM工具 (New Relic、Datadog、Sentry)</li>
              <li>自定义监控：使用Performance API收集并上报性能数据</li>
            </ul>
          </div>

          <!-- 问题5答案 -->
          <div v-if="index === 4">
            <p>前端内存泄漏是指不再需要的内存没有被正确释放，导致应用性能下降甚至崩溃。常见原因和解决方案如下：</p>

            <h4>常见内存泄漏原因：</h4>
            <ul>
              <li><strong>意外的全局变量</strong>
                <pre><code>// 错误示例
function createGlobalVar() {
  // 没有使用var/let/const声明，成为全局变量
  globalVar = '我会导致内存泄漏';
}

// 正确做法
function createLocalVar() {
  const localVar = '我是局部变量，函数执行完后会被回收';
}</code></pre>
              </li>
              <li><strong>忘记清除的定时器/事件监听器</strong>
                <pre><code>// 错误示例
mounted() {
  // 组件销毁后仍在运行的定时器
  this.timer = setInterval(() => {
    console.log('运行中...');
  }, 1000);
}

// 正确做法
mounted() {
  this.timer = setInterval(() => {
    console.log('运行中...');
  }, 1000);
},
beforeUnmount() {
  clearInterval(this.timer);
  this.timer = null;
}</code></pre>
              </li>
              <li><strong>闭包中引用DOM元素</strong>：闭包保留了对DOM的引用，即使DOM已被移除</li>
              <li><strong>未清理的DOM元素引用</strong>：保存了已从DOM中移除元素的引用</li>
              <li><strong>过度使用缓存</strong>：无限增大的缓存对象没有清理机制</li>
              <li><strong>第三方库使用不当</strong>：某些库需要显式调用销毁方法</li>
            </ul>

            <h4>内存泄漏检测方法：</h4>
            <ul>
              <li><strong>Chrome DevTools Memory面板</strong>
                <ul>
                  <li>使用堆快照(Heap Snapshot)识别分离DOM节点和大对象</li>
                  <li>使用时间线录制(Allocation Sampling)跟踪内存分配</li>
                  <li>使用分配时间线(Allocation Timeline)定位内存泄漏源</li>
                </ul>
              </li>
              <li><strong>性能监控</strong>：定期检查内存使用趋势，判断是否有泄漏</li>
              <li><strong>自动化测试</strong>：使用Jest配合jsdom进行内存泄漏测试</li>
            </ul>

            <h4>解决策略：</h4>
            <ul>
              <li>遵循最小权限原则，避免不必要的全局变量</li>
              <li>组件销毁时清理定时器、事件监听器和订阅</li>
              <li>使用WeakMap/WeakSet存储临时DOM引用，允许自动回收</li>
              <li>实现缓存淘汰机制(LRU等)限制缓存大小</li>
              <li>定期审计第三方库，确保正确使用和销毁</li>
            </ul>
          </div>

          <!-- 问题6答案 -->
          <div v-if="index === 5">
            <p>Vue应用性能优化可从渲染效率、资源加载和运行时优化三个维度入手，结合框架特性实现高效优化：</p>

            <h4>1. 渲染优化</h4>
            <ul>
              <li><strong>减少不必要的渲染</strong>
                <pre><code>// 使用v-memo缓存组件
&lt;component v-memo="[item.id, item.name]" :item="item" /&gt;

// 合理使用v-show和v-if
&lt;div v-show="isVisible"&gt;频繁切换用v-show&lt;/div&gt;
&lt;div v-if="isRarelyVisible"&gt;不常显示用v-if&lt;/div&gt;</code></pre>
              </li>
              <li><strong>优化列表渲染</strong>
                <ul>
                  <li>使用key的唯一性：避免使用索引作为key</li>
                  <li>虚拟滚动：vue-virtual-scroller处理大数据列表</li>
                  <li>列表分页或懒加载</li>
                </ul>
              </li>
              <li><strong>计算属性缓存</strong>：利用计算属性的缓存特性避免重复计算</li>
            </ul>

            <h4>2. 组件与DOM优化</h4>
            <ul>
              <li><strong>功能组件(Functional Components)</strong>：减少状态管理开销
                <pre><code>&lt;template functional&gt;
  &lt;div&gt;{{ props.message }}&lt;/div&gt;
&lt;/template&gt;</code></pre>
              </li>
              <li><strong>动态组件与异步组件</strong>：按需加载组件减少初始包体积</li>
              <li><strong>减少DOM层级</strong>：避免过度嵌套，优化渲染树构建</li>
              <li><strong>CSS优化</strong>：使用scoped样式，避免全局样式冲突和过度选择器</li>
            </ul>

            <h4>3. 响应式系统优化</h4>
            <ul>
              <li><strong>冻结不需要响应式的数据</strong>
                <pre><code>export default {
  data() {
    return {
      // 大型静态数据使用Object.freeze
      staticData: Object.freeze(largeStaticDataset)
    };
  }
};</code></pre>
              </li>
              <li><strong>合理使用$forceUpdate</strong>：避免滥用强制更新</li>
              <li><strong>Vue 3响应式优化</strong>：使用shallowRef/shallowReactive处理大型对象</li>
            </ul>

            <h4>4. 构建与资源优化</h4>
            <ul>
              <li>使用vue-cli或vite的生产构建模式</li>
              <li>启用tree-shaking移除未使用代码</li>
              <li>图片与静态资源优化</li>
              <li>路由懒加载与代码分割</li>
            </ul>
          </div>

          <!-- 问题6答案 -->
          <div v-if="index === 6">
            <p>重排(Reflow)和重绘(Repaint)是浏览器渲染过程中的两个关键阶段，优化它们可显著提升页面流畅度：</p>

            <h4>基本概念：</h4>
            <ul>
              <li><strong>重排(Reflow)</strong>：当DOM元素的几何属性(位置、大小)发生变化时，浏览器需要重新计算元素布局，称为重排。重排代价高昂，会触发整个渲染树的重新计算。</li>
              <li><strong>重绘(Repaint)</strong>：当元素的外观属性(颜色、背景)变化而不影响布局时，浏览器只需要重新绘制元素，称为重绘。重绘代价低于重排。</li>
              <li><strong>复合(Composite)</strong>：将页面的各个层合并为最终屏幕图像的过程，是渲染流水线的最后阶段。</li>
            </ul>

            <h4>常见触发重排的操作：</h4>
            <pre><code>// 读取布局属性后立即修改会导致强制同步布局
const box = document.getElementById('box');

// 错误示例：触发多次重排
box.style.width = '100px';
const height = box.offsetHeight; // 读取布局属性
box.style.height = height + 'px'; // 修改布局属性

// 正确做法：批量读取后批量修改
const height = box.offsetHeight; // 先读取所有必要属性
// 脱离文档流
box.style.display = 'none';
box.style.width = '100px';
box.style.height = height + 'px';
// 重新插入文档流
box.style.display = 'block';</code></pre>

            <h4>重排和重绘优化策略：</h4>
            <ul>
              <li><strong>减少布局抖动(Layout Thrashing)</strong>
                <ul>
                  <li>批量读写DOM属性</li>
                  <li>使用requestAnimationFrame合并布局操作</li>
                  <li>使用FastDOM等库优化DOM操作</li>
                </ul>
              </li>
              <li><strong>减少重排范围</strong>
                <ul>
                  <li>使用CSS containment隔离渲染：contain: layout paint size;</li>
                  <li>避免使用table布局，它会触发大面积重排</li>
                  <li>将频繁变化的元素设为position: absolute/fixed，脱离文档流</li>
                </ul>
              </li>
              <li><strong>优化重绘</strong>
                <ul>
                  <li>使用transform和opacity代替top/left等属性动画</li>
                  <li>避免使用box-shadow和gradients等昂贵属性</li>
                  <li>减少绘制区域：小面积频繁变化优于大面积变化</li>
                </ul>
              </li>
              <li><strong>利用CSS硬件加速</strong>：将元素提升为独立图层
                <pre><code>.animated-element {
  transform: translateZ(0); /* 触发GPU加速 */
  will-change: transform; /* 提示浏览器元素将要变化 */
}</code></pre>
              </li>
            </ul>
          </div>

          <!-- 问题7答案 -->
          <div v-if="index === 6">
            <p>API请求性能优化涉及减少延迟、降低带宽消耗和提升用户体验，有效的缓存策略是优化的核心：</p>

            <h4>API请求性能优化策略：</h4>
            <ul>
              <li><strong>请求优化</strong>
                <ul>
                  <li>接口合并：减少请求次数，合并多个小请求</li>
                  <li>数据压缩：使用gzip/Brotli压缩响应体</li>
                  <li>GraphQL：按需获取数据，减少过度获取</li>
                  <li>批量请求与分页：避免一次性请求大量数据</li>
                </ul>
              </li>
              <li><strong>连接优化</strong>
                <ul>
                  <li>HTTP/2多路复用：多个请求共享一个连接</li>
                  <li>域名分片：突破浏览器连接限制(谨慎使用，可能增加DNS开销)</li>
                  <li>预连接关键域名：&lt;link rel="preconnect" href="https://api.example.com"&gt;</li>
                </ul>
              </li>
              <li><strong>前端优化</strong>
                <ul>
                  <li>请求防抖节流：避免频繁触发API请求</li>
                  <li>乐观UI更新：先更新UI再等待API响应</li>
                  <li>请求优先级：关键数据优先请求</li>
                </ul>
              </li>
            </ul>

            <h4>有效的请求缓存策略：</h4>
            <div class="code-example">
              <pre><code>// 1. HTTP缓存策略
// 强缓存
res.setHeader('Cache-Control', 'max-age=3600'); // 1小时
res.setHeader('Expires', new Date(Date.now() + 3600000).toUTCString());

// 协商缓存
res.setHeader('Cache-Control', 'no-cache');
res.setHeader('ETag', '"unique-hash-of-content"');
res.setHeader('Last-Modified', new Date(file.mtime).toUTCString());

// 2. 前端缓存实现
// 内存缓存
const memoryCache = new Map();

// API请求函数带缓存
async function fetchWithCache(url, options = {}) {
  const cacheKey = `${url}-${JSON.stringify(options)}`;
  
  // 检查内存缓存
  if (memoryCache.has(cacheKey)) {
    return memoryCache.get(cacheKey);
  }

  // 检查localStorage缓存
  const localStorageKey = `api_cache_${cacheKey}`;
  const cachedItem = localStorage.getItem(localStorageKey);
  if (cachedItem) {
    const { data, timestamp, ttl } = JSON.parse(cachedItem);
    // 检查缓存是否过期
    if (Date.now() - timestamp &lt; ttl) {
      return data;
    }
  }

  // 发起请求
  const response = await fetch(url, options);
  const data = await response.json();

  // 设置缓存
  memoryCache.set(cacheKey, data);
  localStorage.setItem(localStorageKey, JSON.stringify({
    data,
    timestamp: Date.now(),
    ttl: options.ttl || 300000 // 默认5分钟过期
  }));

  return data;
}

// 3. 缓存失效策略
// 时间过期策略：设置TTL
// 主动更新策略：数据更新后主动更新缓存
// 版本化策略：为缓存添加版本号，版本更新时失效
// 部分更新策略：只缓存不常变化的数据

// 4. Service Worker缓存
// 使用Workbox或自定义Service Worker实现离线缓存
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // 返回缓存的同时更新缓存
        const fetchPromise = fetch(event.request).then(networkResponse => {
          caches.open('api-cache').then(cache => {
            cache.put(event.request, networkResponse.clone());
          });
          return networkResponse;
        });
        // 缓存优先，网络请求后台更新
        return cachedResponse || fetchPromise;
      })
  );
});</code></pre>
            </div>
          </div>

          <!-- 问题8答案 -->
          <div v-if="index === 7">
            <p>Core Web Vitals是Google提出的用户体验关键指标，衡量网页的加载性能、交互性和视觉稳定性：</p>

            <h4>Core Web Vitals三大核心指标：</h4>
            <table class="comparison-table">
              <tr>
                <th>指标</th>
                <th>描述</th>
                <th>良好标准</th>
                <th>优化策略</th>
              </tr>
              <tr>
                <td>LCP<br>( Largest Contentful Paint )</td>
                <td>最大内容绘制，衡量加载性能</td>
                <td>≤ 2.5秒</td>
                <td>优化关键资源加载、预加载关键内容、优化服务器响应时间</td>
              </tr>
              <tr>
                <td>FID<br>( First Input Delay )</td>
                <td>首次输入延迟，衡量交互性</td>
                <td>≤ 100毫秒</td>
                <td>减少主线程阻塞、代码分割、优化长任务</td>
              </tr>
              <tr>
                <td>CLS<br>( Cumulative Layout Shift )</td>
                <td>累积布局偏移，衡量视觉稳定性</td>
                <td>≤ 0.1</td>
                <td>为媒体元素设置尺寸、避免插入头部内容、使用骨架屏</td>
              </tr>
            </table>

            <h4>其他重要Web Vitals指标：</h4>
            <ul>
              <li><strong>FCP (First Contentful Paint)</strong>：首次内容绘制，衡量页面何时开始显示内容</li>
              <li><strong>TTI (Time to Interactive)</strong>：交互时间，衡量页面何时完全可交互</li>
              <li><strong>TBT (Total Blocking Time)</strong>：总阻塞时间，衡量主线程被阻塞的总时间</li>
              <li><strong>INP (Interaction to Next Paint)</strong>：下次绘制的交互延迟，未来可能替代FID</li>
            </ul>

            <h4>Core Web Vitals优化实践：</h4>
            <div class="code-example">
              <pre><code>// 1. LCP优化
// 预加载关键资源
&lt;link rel="preload" href="hero-image.jpg" as="image"&gt;

// 优化图像
&lt;img src="hero-image.webp" alt="Hero" width="1200" height="600" loading="eager"&gt;

// 2. CLS优化
// 为媒体元素设置尺寸
&lt;img src="ad.jpg" width="300" height="250" alt="Ad"&gt;

// 使用占位符
&lt;div class="ad-container" style="min-height: 250px; width: 300px;">
  &lt;img src="ad.jpg" alt="Ad"&gt;
&lt;/div&gt;

// 3. FID/TBT优化
// 代码分割
const HeavyComponent = () => import('./HeavyComponent.vue');

// 延迟加载非关键JavaScript
&lt;script src="non-critical.js" defer&gt;&lt;/script&gt;

// 使用Web Workers处理计算密集型任务
const worker = new Worker('data-processor.js');
worker.postMessage(largeDataset);
worker.onmessage = (e) => {
  console.log('处理结果:', e.data);
};

// 4. 监控Core Web Vitals
// 使用web-vitals库
import { getLCP, getFID, getCLS } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getLCP(console.log);

// 自定义监控
new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    console.log('LCP:', entry.startTime);
  }
}).observe({ type: 'largest-contentful-paint', buffered: true });</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PerformanceOptimizationQA",
  data() {
    return {
      qaItems: [
        {
          question:
            "什么是关键渲染路径？如何优化关键渲染路径以提升页面加载速度？",
          isOpen: false,
        },
        {
          question: "如何优化大型列表渲染性能？虚拟列表的实现原理是什么？",
          isOpen: false,
        },
        {
          question:
            "前端代码分割(Code Splitting)有哪些实现方式？如何在Vue项目中应用代码分割优化？",
          isOpen: false,
        },
        {
          question:
            "首屏加载速度优化有哪些关键策略？如何衡量和监控首屏加载性能？",
          isOpen: false,
        },
        {
          question:
            "前端内存泄漏的常见原因有哪些？如何检测和解决内存泄漏问题？",
          isOpen: false,
        },
        {
          question:
            "Vue应用有哪些性能优化技巧？如何结合Vue框架特性进行高效优化？",
          isOpen: false,
        },
        {
          question:
            "什么是重排(Reflow)和重绘(Repaint)？如何优化重排和重绘性能？",
          isOpen: false,
        },
        {
          question: "如何优化API请求性能？有哪些有效的请求缓存策略？",
          isOpen: false,
        },
        {
          question: "Core Web Vitals包含哪些指标？如何优化这些核心网页指标？",
          isOpen: false,
        },
      ],
    };
  },
  methods: {
    toggleAnswer(index) {
      this.qaItems[index].isOpen = !this.qaItems[index].isOpen;
      // 关闭其他打开的答案
      this.qaItems.forEach((item, i) => {
        if (i !== index && item.isOpen) {
          item.isOpen = false;
        }
      });
    },
  },
};
</script>

<style scoped>
.performance-optimization-qa {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.qa-header {
  text-align: center;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e5e7eb;
}

.qa-header h1 {
  font-size: 28px;
  color: #1e293b;
  margin-bottom: 10px;
}

.qa-header p {
  color: #64748b;
  font-size: 16px;
  max-width: 800px;
  margin: 0 auto;
}

.qa-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.qa-item {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.qa-item:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-color: #cbd5e1;
}

.qa-question {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  cursor: pointer;
  background-color: #f8fafc;
  transition: background-color 0.2s ease;
  font-weight: 500;
  color: #1e293b;
}

.qa-question:hover {
  background-color: #f1f5f9;
}

.question-number {
  color: #3b82f6;
  font-weight: bold;
  margin-right: 10px;
  width: 24px;
  text-align: right;
}

.question-text {
  flex: 1;
}

.toggle-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #e2e8f0;
  color: #64748b;
  font-size: 18px;
  transition: all 0.2s ease;
}

.qa-item.active .toggle-icon {
  background-color: #3b82f6;
  color: white;
}

.qa-answer {
  padding: 20px;
  background-color: white;
  border-top: 1px solid #e2e8f0;
  animation: fadeIn 0.3s ease;
  line-height: 1.6;
  color: #334155;
}

.qa-answer h4 {
  margin: 16px 0 8px;
  color: #1e293b;
  font-size: 16px;
}

.qa-answer h5 {
  margin: 12px 0 6px;
  color: #1e293b;
  font-size: 15px;
}

.qa-answer p {
  margin: 10px 0;
}
</style>
