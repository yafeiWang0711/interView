// 性能优化




const performanceOptimization = {
    title: '性能优化',
    key: 'performanceOptimization',
    children: [
        {
            title: '懒加载',
            key: 'lazyLoading',
            content: [
                {
                    describe: '懒加载的核心原理',
                    key: 1,
                    code: `
// 懒加载的核心原理
// 利用浏览器的异步加载机制，将组件的加载延迟到需要使用时再进行加载，从而减少页面的加载时间。
// 可视区域检测：判断元素是否进入或即将进入用户可视区域
// 延迟加载：仅当元素需要被显示时才加载其资源
// 默认占位：未加载时使用占位符（低质量缩略图、纯色块等）
`
                },
                {
                    describe: '适用场景',
                    key: 2,
                    code: `
// 适用场景：
// 长列表图片（电商商品列表、社交媒体信息流）
// 视频内容
// 大型组件（非首屏的复杂组件）
// 路由组件（未访问的路由）
`
                },
                {
                    describe: '组件与路由懒加载',
                    key: 3,
                    code: `
// 实现方式：
// React 组件懒加载
import React, { Suspense, lazy } from 'react';

// 懒加载组件
const LazyComponent = lazy(() => import('./LazyComponent'));

// 使用Suspense提供加载状态
const App = () => (
  <div>
    <Suspense fallback={<div>加载中...</div>}>
      <LazyComponent />
    </Suspense>
  </div>
);


// Vue 路由懒加载
// 路由懒加载
const routes = [
  {
    path: '/lazy',
    component: () => import(/* webpackChunkName: "lazy-page" */ './LazyPage.vue'),
    // 加载状态
    loading: LoadingComponent,
    error: ErrorComponent
  }
];

// 组件内懒加载
export default {
  components: {
    LazyComponent: () => import('./LazyComponent.vue')
  }
};
`
                },
                {
                    // 图片懒加载
                    describe: '图片懒加载',
                    key: 3,
                    code: `
// 1. 原生 HTML 实现（最简单）
使用 HTML5 新增的loading="lazy"属性，浏览器原生支持：
<!-- 图片懒加载 -->
<img 
  src="placeholder.jpg"  <!-- 占位图 -->
  data-src="actual-image.jpg"  <!-- 实际图片地址 -->
  loading="lazy" 
  alt="描述文本"
  width="600" 
  height="400"
>
<!-- 背景图懒加载可结合data属性 -->
<div 
  class="lazy-bg"
  data-bg="background-image.jpg"
  style="width: 100%; height: 400px;"
></div>
         
// 2. IntersectionObserver API 实现

// 初始化观察器
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    // 元素进入视口
    if (entry.isIntersecting) {
      const lazyElement = entry.target;
      
      // 处理图片
      if (lazyElement.tagName === 'IMG') {
        // 替换src为实际图片地址
        if (lazyElement.dataset.src) {
          lazyElement.src = lazyElement.dataset.src;
          // 移除data属性
          delete lazyElement.dataset.src;
        }
      } 
      // 处理背景图
      else if (lazyElement.dataset.bg) {
        lazyElement.style.backgroundImage = \`url(\${lazyElement.dataset.bg})\`;
        delete lazyElement.dataset.bg;
      }
      
      // 停止观察已加载的元素
      observer.unobserve(lazyElement);
    }
  });
}, {
  // 提前100px开始加载
  rootMargin: '100px 0px',
  // 元素可见比例达到10%时触发
  threshold: 0.1
});

// 监听所有带有lazy类的元素
document.querySelectorAll('.lazy').forEach(element => {
  observer.observe(element);
});


// 33. 传统滚动监听实现（兼容性方案）
通过监听scroll、resize等事件判断元素位置
// 获取所有需要懒加载的元素
const lazyElements = document.querySelectorAll('.lazy');

// 检查元素是否在视口内
const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) + 100 &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// 加载可见元素
const loadVisibleElements = () => {
  lazyElements.forEach(element => {
    if (isInViewport(element) && !element.classList.contains('loaded')) {
      // 加载图片逻辑（同IntersectionObserver）
      if (element.tagName === 'IMG' && element.dataset.src) {
        element.src = element.dataset.src;
        element.classList.add('loaded');
      }
    }
  });
};

// 初始化检查
loadVisibleElements();

// 监听滚动和窗口大小变化事件（使用节流优化）
const throttle = (func, delay = 100) => {
  let timeout;
  return () => {
    if (!timeout) {
      timeout = setTimeout(() => {
        func();
        timeout = null;
      }, delay);
    }
  };
};

window.addEventListener('scroll', throttle(loadVisibleElements));
window.addEventListener('resize', throttle(loadVisibleElements));


                `
                }
            ]
        },
        {
            title: '资源体积优化',
            key: 'resourceVolumeOptimization',
            content: [
                {
                    describe: '图片压缩',
                    key: 'imageCompression',
                    code: `
// 图片压缩：使用图片压缩工具，如tinypng、imageoptim等，压缩图片体积，减少加载时间。
`
                },
                {
                    describe: '压缩资源：使用压缩工具压缩代码、图片等资源体积，减少加载时间。',
                    key: 'compressResources',
                    code: `
// 压缩资源：使用压缩工具压缩代码、图片等资源体积，减少加载时间。
`
                },
                {
                    describe: '图片压缩',
                    key: 'imageCompression2',
                    code: ` 
// 图片压缩：使用工具压缩图片，如TinyPNG、Compressor.io等
`
                },
                {
                    describe: '合并资源：将多个资源合并为一个文件，减少请求次数。',
                    key: 'mergeResources',
                    code: `         
// 代码压缩：使用工具如UglifyJS、Terser等压缩代码
`
                },
            ]
        },
        {
            title: '代码分割',
            key: 'codeSplitting',
            content: [
                {
                    describe: '将大型应用拆分成多个小模块，按需加载。',
                    key: 'codeSplitting1',
                    code: ` 
使用webpack的SplitChunksPlugin进行代码分割
配置示例
imization: {
 splitChunks: {
     chunks: 'all',
     minSize: 20000,
     maxSize: 0,
     minChunks: 1,
     maxAsyncRequests: 30,
     maxInitialRequests: 30,
     automaticNameDelimiter: '~',
     name: true,
     cacheGroups: {
         defaultVendors: {
             test: /[\\/]node_modules[\\/]/,
             priority: -10
         },
         default: {
             minChunks: 2,
             priority: -20,
             reuseExistingChunk: true
         }
     }
 }
}
                `
                },
            ]
        },
        {
            title: '缓存策略',
            key: 'cacheStrategy',
            content: [
                {
                    describe: '合理利用浏览器缓存，减少不必要的请求。',
                    key: 'cacheStrategy1',
                    code: `
// 合理利用浏览器缓存，减少不必要的请求。
`
                },
            ]
        },
        {
            title: 'webpack',
            key: 'webpack',
            content: [
                {
                    describe: 'webpack 是一个静态模块打包工具，它将应用程序的所有资源（如 JavaScript、CSS、图片等）视为模块，通过分析模块之间的依赖关系，将它们打包成一个或多个静态文件。',
                    key: 'webpack1',
                    code: `
// webpack 是一个静态模块打包工具，

Webpack 是一个现代 JavaScript 应用程序的静态模块 bundler（打包工具），
其核心功能是将多个模块文件打包成一个或多个最终文件（bundle）。

以下是 Webpack 完整的打包过程解析：

// 它将应用程序的所有资源（如 JavaScript、CSS、图片等）视为模块，通过分析模块之间的依赖关系，将它们打包成一个或多个静态文件。

// 构建过程
1. 初始化阶段（Initialization）
读取配置：解析 webpack.config.js 配置文件，合并 CLI 传递的参数（如 --mode production）
创建编译器：初始化 Compiler 实例，包含完整的配置信息
加载插件：实例化并注册所有配置的插件，触发 plugins 的 apply 方法
// 简化的初始化逻辑
const webpack = require('webpack');
const config = require('./webpack.config.js');

// 创建编译器实例
const compiler = webpack(config);

// 注册插件
config.plugins.forEach(plugin => {
  plugin.apply(compiler);
});


2. 编译阶段（Compilation）
这是 Webpack 最核心的阶段，包含模块解析、依赖收集和转换：
（1）入口处理（Entry Processing）
从 entry 配置指定的入口文件开始（默认 ./src/index.js）
调用相应的 loader 处理入口文件（如 babel-loader 转译 ES6+ 语法）
（2）模块解析（Module Resolution）
递归解析依赖：通过 require/import 语句查找所有依赖模块
路径解析：根据 resolve 配置（如 extensions、alias）确定模块实际路径
模块缓存：解析过的模块会被缓存，避免重复解析
（3）模块转换（Module Transformation）
对不同类型的文件应用相应的 loader 进行转换：
JavaScript：babel-loader、eslint-loader
CSS：css-loader、style-loader、postcss-loader
图片：url-loader、file-loader
转换结果是标准的 JavaScript 模块
（4）依赖图谱构建（Dependency Graph）
构建一个包含所有模块及其依赖关系的依赖图谱（Dependency Graph）
每个模块会被分配一个唯一的 moduleId

3.输出阶段（Emission）
将处理好的模块组合成最终的 bundle 文件：
（1）代码分块（Chunking）
根据 splitChunks 配置将模块分割成不同的 chunk（代码块）
常见分块策略：入口 chunk、异步 chunk、公共 chunk
（2）模块合并（Module Concatenation）
开启 concatenateModules（生产环境默认开启）
将多个模块合并到一个函数中，减少运行时开销（类似 Rollup 的 Tree-shaking）
（3）生成 bundle
根据 output 配置生成最终的文件：
文件名：通过 filename、chunkFilename 配置，支持 [name]、[hash] 等占位符
路径：输出到 path 配置指定的目录
注入运行时代码（webpack runtime），负责在浏览器中加载和执行模块

4.完成阶段（Completion）
输出打包统计信息（如打包时间、文件大小）
执行 done 钩子，插件可在此阶段做最后的处理（如生成报告）
若开启 watch: true，则进入监听模式，文件变化时重新触发打包
`
                },
            ]
        },
        {
            title: 'vite',
            key: 'vite',
            content: [
                {
                    describe: 'vite 是一个基于浏览器原生 ES 模块的开发服务器，它利用浏览器的原生模块加载能力，实现了快速的冷启动和热更新。',
                    key: 'vite1',
                    code: `
// vite 是一个基于浏览器原生 ES 模块的开发服务器，它利用浏览器的原生模块加载能力，实现了快速的冷启动和热更新。


Vite 是一款基于浏览器原生 ES 模块（ESM）的前端构建工具，
以其极速的开发体验和高效的构建流程著称。
与 Webpack 等传统工具相比，
Vite 采用了 “开发时按需编译” 和 “生产环境 Rollup 打包” 的混合策略，大幅提升了构建效率。

// 开发环境
开发环境中，Vite 不进行完整打包，而是通过原生 ESM 按需加载，配合快速的模块转换实现极速热更新。
（1）初始化阶段
配置解析：读取 vite.config.js 配置，合并默认配置和 CLI 参数（如 --port 3000）
插件系统初始化：加载并初始化配置的插件（如 @vitejs/plugin-vue、@vitejs/plugin-react）
创建开发服务器：启动基于 Koa 的 HTTP 服务器，设置端口、跨域等基础配置
// 简化的初始化逻辑
import { createServer } from 'vite';

async function startDevServer() {
  const server = await createServer({
    configFile: 'vite.config.js',
    root: process.cwd()
  });
  await server.listen(3000);
}
startDevServer();

（2）请求处理阶段
当浏览器请求资源时，Vite 实时处理并返回转换后的内容：
入口 HTML 处理：
    解析 index.html，将其中的 <script type="module"> 作为入口
    自动注入 HMR（热模块替换）客户端代码
模块请求处理：
    路径解析：根据请求路径找到对应模块文件（支持别名、裸模块解析）
依赖预构建：
    对第三方依赖（如 node_modules 中的包）进行预构建，转换为 ESM 格式并缓存（node_modules/.vite）
    解决 CommonJS 与 ESM 互操作问题，避免浏览器重复请求细小依赖
模块转换：
    对源码模块（如 .vue、.ts、.scss）调用对应插件进行转换（如 vue-loader 解析单文件组件）
    注入 HMR 相关代码（如 import.meta.hot）
返回处理结果：
    将转换后的 ESM 代码返回给浏览器，浏览器直接执行

    （3）热模块替换（HMR）
监听文件变化（通过 chokidar）
当文件修改时，仅重新转换该模块及其依赖链
通过 WebSocket 通知客户端更新对应模块，无需刷新页面


// 生产环境 build

生产环境中，Vite 使用 Rollup 进行完整打包，生成优化后的静态资源。
（1）预构建阶段
    依赖扫描：分析入口文件，收集所有依赖（包括第三方依赖和源码）
    配置准备：根据 vite.config.js 生成 Rollup 配置（如 input、output、plugins）
    插件适配：将 Vite 插件转换为 Rollup 插件格式
（2）Rollup 打包阶段
    模块解析：递归解析所有模块，构建依赖图谱
    代码转换：
    源码转换（如 TypeScript → JavaScript、Sass → CSS）
    语法降级（通过 @babel/preset-env 适配目标浏览器）
    代码优化：
    Tree-shaking：移除未使用代码
    作用域提升（Scope Hoisting）：减少代码体积，提高执行效率
    代码分割（Code Splitting）：按入口、动态导入拆分 chunk
    资源处理：
        图片、字体等资源转为 base64 或单独文件
    生成产物：
        输出 JS、CSS、静态资源到 dist 目录
        文件名添加哈希（如 index.8f3b.js）用于缓存控制
（3）后处理阶段
    HTML 生成：生成自动引入打包资源的 index.html
    CSS 提取：将 CSS 从 JS 中提取为单独文件（通过 rollup-plugin-css-only）
    压缩优化：  
        JS 压缩（terser）
        CSS 压缩（cssnano）
        静态资源压缩（如图片优化）
    生成 manifest：可选生成 manifest.json，记录资源映射关系（用于服务端渲染）

`
                },
            ]
        },
        {
            title: 'tree-shaking',
            key: 'treeShaking',
            content: [
                {
                    describe: 'tree-shaking 是一种优化技术，它通过分析代码的依赖关系，将未使用的代码从最终的打包文件中移除，从而减少文件体积。',
                    key: 'treeShaking1',
                    code: `
// tree-shaking 是一种优化技术，它通过分析代码的依赖关系，将未使用的代码从最终的打包文件中移除，从而减少文件体积。
`
                },
            ]
        },
    ]
}

export default performanceOptimization
