<template>
  <div class="vue-internals-explained">
    <div class="qa-header">
      <h1>Vue内部原理与浏览器渲染机制详解</h1>
      <router-link to="/demos" class="back-link">← 返回演示导航</router-link>
      <p>
        深入解析Vue核心原理及浏览器渲染机制，帮助理解框架底层实现与性能优化方向
      </p>
    </div>

    <div class="qa-container">
      <!-- Vue v-model源码原理 -->
      <div class="qa-item">
        <div class="qa-question" @click="toggleSection('vModel')">
          <span class="question-number">1.</span>
          <span class="question-text">Vue v-model源码原理深度解析</span>
          <span class="toggle-icon">{{ openSections.vModel ? "−" : "+" }}</span>
        </div>
        <div class="qa-answer" v-if="openSections.vModel">
          <h3>1. v-model的本质</h3>
          <p>
            v-model是Vue提供的语法糖，本质上是对表单元素的value属性和input事件的封装：
          </p>
          <div class="code-example">
            <pre><code>&lt;!-- v-model语法糖 --&gt;
&lt;input v-model="message"&gt;

&lt;!-- 等价于 --&gt;
&lt;input :value="message" @input="message = $event.target.value"&gt;</code></pre>
          </div>

          <h3>2. 源码实现核心逻辑</h3>
          <p>
            在Vue源码中，v-model的实现位于<code class="code-inline"
              >vModelDirective</code
            >函数中：
          </p>
          <div class="code-example">
            <pre><code>// Vue3 v-model核心实现简化版
export const vModelText: ModelDirective&lt;HTMLInputElement | HTMLTextAreaElement&gt; = {
  created(el, { value, modifiers: { lazy, trim, number } }, vnode) {
    // 设置初始值
    el.value = value == null ? '' : value
    // 绑定input事件
    el._vModifiers = modifiers // 缓存修饰符
    el.addEventListener('input', onInput)
    // 处理lazy修饰符
    if (lazy) {
      el.addEventListener('change', onLazyInput)
    }
  },
  // 更新值
  updated(el, { value }) {
    if (el.value !== value) {
      el.value = value == null ? '' : value
    }
  },
  // 解绑事件
  unmounted(el) {
    el.removeEventListener('input', onInput)
    el.removeEventListener('change', onLazyInput)
  }
}

// 输入事件处理函数
function onInput(e) {
  const el = e.target
  let value = el.value
  // 处理修饰符
  if (el._vModifiers.trim) {
    value = value.trim()
  }
  if (el._vModifiers.number) {
    value = toNumber(value)
  }
  // 更新绑定值
  el._assignValue(value)
}

// 为元素添加赋值函数
function setUpModelValue(el, value) {
  el._assignValue = (val) => {
    el.value = val
  }
}</code></pre>
          </div>

          <h3>3. 不同表单元素的适配</h3>
          <p>v-model针对不同表单元素有不同实现：</p>
          <ul>
            <li>
              <strong>文本输入框(text/textarea)</strong>：绑定value和input事件
            </li>
            <li>
              <strong>复选框(checkbox)</strong
              >：绑定checked和change事件，支持数组绑定
            </li>
            <li><strong>单选按钮(radio)</strong>：绑定checked和change事件</li>
            <li>
              <strong>下拉选择框(select)</strong
              >：绑定value和change事件，支持多选
            </li>
          </ul>

          <h3>4. 自定义组件的v-model</h3>
          <p>
            自定义组件使用v-model需实现<code class="code-inline"
              >modelValue</code
            >prop和<code class="code-inline">update:modelValue</code>事件：
          </p>
          <div class="code-example">
            <pre><code>// 自定义组件
export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  methods: {
    updateValue(newValue) {
      this.$emit('update:modelValue', newValue)
    }
  }
}

// 使用自定义组件
&lt;custom-input v-model="searchText"&gt;&lt;/custom-input&gt;

// 等价于
&lt;custom-input
  :modelValue="searchText"
  @update:modelValue="searchText = $event"
&gt;&lt;/custom-input&gt;</code></pre>
          </div>
        </div>
      </div>

      <!-- Vue响应式原理 -->
      <div class="qa-item">
        <div class="qa-question" @click="toggleSection('reactivity')">
          <span class="question-number">2.</span>
          <span class="question-text">Vue响应式原理深度解析</span>
          <span class="toggle-icon">{{
            openSections.reactivity ? "−" : "+"
          }}</span>
        </div>
        <div class="qa-answer" v-if="openSections.reactivity">
          <h3>1. Vue2 vs Vue3响应式实现对比</h3>
          <table class="comparison-table">
            <tr>
              <th>特性</th>
              <th>Vue2</th>
              <th>Vue3</th>
            </tr>
            <tr>
              <td>核心API</td>
              <td>Object.defineProperty</td>
              <td>Proxy + Reflect</td>
            </tr>
            <tr>
              <td>监听范围</td>
              <td>仅对象属性</td>
              <td>整个对象(包括新增属性)</td>
            </tr>
            <tr>
              <td>数组支持</td>
              <td>重写数组方法</td>
              <td>原生数组支持</td>
            </tr>
            <tr>
              <td>性能</td>
              <td>初始化慢，访问快</td>
              <td>初始化快，访问略慢</td>
            </tr>
          </table>

          <h3>2. Vue3响应式核心实现</h3>
          <p>Vue3使用Proxy实现响应式，核心包含以下模块：</p>
          <div class="code-example">
            <pre><code>// 响应式核心实现简化版
function reactive(target) {
  // 创建Proxy对象
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers
  )
}

// 创建响应式对象
function createReactiveObject(target, isReadonly, baseHandlers, collectionHandlers) {
  // 非对象类型直接返回
  if (!isObject(target)) {
    return target
  }
  // 已创建过响应式对象直接返回
  if (target.__v_raw && !(isReadonly && target.__v_isReactive)) {
    return target
  }
  // 根据目标类型选择处理器
  const handlers = isCollectionType(target) ? collectionHandlers : baseHandlers
  // 创建Proxy
  const observed = new Proxy(target, handlers)
  // 标记已响应式
  observed.__v_isReactive = true
  return observed
}

// 基本处理器
const mutableHandlers = {
  get(target, key, receiver) {
    // Track依赖收集
    track(target, TrackOpTypes.GET, key)
    // 执行原始get操作
    const res = Reflect.get(target, key, receiver)
    // 深层响应式
    return isObject(res) ? reactive(res) : res
  },
  set(target, key, value, receiver) {
    const oldValue = Reflect.get(target, key, receiver)
    const result = Reflect.set(target, key, value, receiver)
    // Trigger触发更新
    if (hasChanged(value, oldValue)) {
      trigger(target, TriggerOpTypes.SET, key, value, oldValue)
    }
    return result
  },
  // 其他处理器：deleteProperty, has, ownKeys等
}

// 依赖收集
function track(target, type, key) {
  if (!isTracking()) {
    return
  }
  // 获取target对应的依赖Map
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  // 获取key对应的依赖集合
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = createDep()))
  }
  // 将当前effect添加到依赖中
  trackEffects(dep)
}

// 触发更新
function trigger(target, type, key, newValue, oldValue) {
  // 获取target对应的依赖Map
  const depsMap = targetMap.get(target)
  if (!depsMap) {
    return
  }
  // 收集所有相关依赖
  const effects = new Set()
  if (type === TriggerOpTypes.CLEAR) {
    // 清除操作，收集所有依赖
    depsMap.forEach(dep => {
      addEffects(effects, dep)
    })
  } else {
    // 根据key收集依赖
    if (key !== void 0) {
      addEffects(effects, depsMap.get(key))
    }
    // 特殊类型操作额外处理
    if (type === TriggerOpTypes.ADD || type === TriggerOpTypes.DELETE) {
      // ...
    }
  }
  // 执行所有依赖的effect
  effects.forEach(effect => {
    triggerEffect(effect)
  })
}</code></pre>
          </div>

          <h3>3. 响应式系统工作流程</h3>
          <ol>
            <li>
              <strong>依赖收集阶段</strong
              >：当组件渲染时，会执行render函数，访问响应式数据的getter，触发track收集依赖
            </li>
            <li>
              <strong>依赖存储阶段</strong
              >：将组件的effect与数据的key关联存储在targetMap中
            </li>
            <li>
              <strong>触发更新阶段</strong
              >：当响应式数据变化时，触发setter，调用trigger通知所有相关effect重新执行
            </li>
            <li>
              <strong>重新渲染阶段</strong
              >：effect重新执行，导致组件重新渲染，生成新的虚拟DOM
            </li>
          </ol>
        </div>
      </div>

      <!-- 回流重绘详细解析 -->
      <div class="qa-item">
        <div class="qa-question" @click="toggleSection('reflowRepaint')">
          <span class="question-number">3.</span>
          <span class="question-text">浏览器回流与重绘机制深度解析</span>
          <span class="toggle-icon">{{
            openSections.reflowRepaint ? "−" : "+"
          }}</span>
        </div>
        <div class="qa-answer" v-if="openSections.reflowRepaint">
          <h3>1. 浏览器渲染流水线</h3>
          <p>浏览器将HTML/CSS/JS转换为屏幕像素的过程包含以下阶段：</p>
          <div class="render-pipeline">
            <div class="pipeline-stage">HTML解析 → DOM树</div>
            <div class="pipeline-arrow">→</div>
            <div class="pipeline-stage">CSS解析 → CSSOM树</div>
            <div class="pipeline-arrow">→</div>
            <div class="pipeline-stage">DOM + CSSOM → 渲染树</div>
            <div class="pipeline-arrow">→</div>
            <div class="pipeline-stage">布局(回流) → 几何信息</div>
            <div class="pipeline-arrow">→</div>
            <div class="pipeline-stage">绘制(重绘) → 像素信息</div>
            <div class="pipeline-arrow">→</div>
            <div class="pipeline-stage">合成 → 屏幕显示</div>
          </div>

          <h3>2. 回流(Reflow)详解</h3>
          <p>
            <strong>定义</strong
            >：计算渲染树中元素几何属性的过程，包括元素位置、大小、
            margins、padding等。
          </p>

          <h4>触发回流的操作：</h4>
          <ul>
            <li>页面首次渲染</li>
            <li>浏览器窗口大小变化(resize事件)</li>
            <li>元素尺寸或位置变化(width, height, top, left等)</li>
            <li>元素内容变化(文本变化、图片加载完成)</li>
            <li>元素字体大小变化</li>
            <li>添加/删除可见DOM元素</li>
            <li>查询某些属性(offsetWidth, getBoundingClientRect等)</li>
          </ul>

          <h3>3. 重绘(Repaint)详解</h3>
          <p>
            <strong>定义</strong
            >：根据元素的几何属性计算好的位置，为元素填充像素的过程，不影响布局。
          </p>

          <h4>触发重绘的操作：</h4>
          <ul>
            <li>元素颜色变化(color, background-color)</li>
            <li>元素背景变化(background-image, background-position)</li>
            <li>元素可见性变化(visibility, opacity)</li>
            <li>文本样式变化(font-style, text-decoration)</li>
            <li>box-shadow变化</li>
          </ul>

          <h3>4. 优化策略与最佳实践</h3>
          <div class="optimization-strategies">
            <div class="strategy-card">
              <h4>减少回流范围</h4>
              <ul>
                <li>使用transform代替top/left定位</li>
                <li>使用visibility代替display:none</li>
                <li>将频繁变化的元素设为absolute/fixed</li>
                <li>使用contain: layout隔离重排影响</li>
              </ul>
            </div>

            <div class="strategy-card">
              <h4>批量DOM操作</h4>
              <ul>
                <li>离线DOM修改(documentFragment)</li>
                <li>使用CSS containment</li>
                <li>避免频繁读取布局属性</li>
                <li>使用防抖/节流处理resize等事件</li>
              </ul>
            </div>

            <div class="strategy-card">
              <h4>渲染性能优化</h4>
              <ul>
                <li>使用CSS硬件加速(transform, opacity)</li>
                <li>减少绘制区域和复杂度</li>
                <li>优化CSS选择器(避免嵌套过深)</li>
                <li>使用will-change提示浏览器优化</li>
              </ul>
            </div>
          </div>

          <h3>5. 检测与分析工具</h3>
          <ul>
            <li>
              <strong>Chrome DevTools Performance</strong>：记录和分析运行时性能
            </li>
            <li>
              <strong>Layout Instability API</strong>：监控布局偏移(CLS指标)
            </li>
            <li><strong>Chrome渲染面板</strong>：高亮重绘区域</li>
            <li><strong>Performance API</strong>：在代码中精确测量性能</li>
          </ul>
          <div class="code-example">
            <pre><code>// 使用Performance API测量回流时间
function measureReflowTime() {
  const startTime = performance.now();
  
  // 可能触发回流的操作
  element.style.width = '200px';
  element.style.height = '300px';
  
  const endTime = performance.now();
  console.log(`Reflow time: ${endTime - startTime}ms`);
}

// 使用will-change提示浏览器
.element {
  will-change: transform, opacity;
}

// 使用contain隔离元素
.isolated-element {
  contain: layout paint size;
}</code></pre>
          </div>
        </div>
      </div>

      <!-- Vue MVVM模型原理 -->
      <div class="qa-item">
        <div class="qa-question" @click="toggleSection('mvvm')">
          <span class="question-number">4.</span>
          <span class="question-text">Vue MVVM模型原理深度解析</span>
          <span class="toggle-icon">{{ openSections.mvvm ? "−" : "+" }}</span>
        </div>
        <div class="qa-answer" v-if="openSections.mvvm">
          <h3>1. MVVM架构模式的核心概念</h3>
          <p>
            MVVM（Model-View-ViewModel）是一种软件架构设计模式，由Martin
            Fowler的Presentation
            Model模式演变而来，并在WPF/Silverlight框架中得到广泛应用。Vue.js作为现代MVVM框架的代表，其核心设计思想是：
          </p>
          <ul>
            <li>
              <strong>数据驱动</strong
              >：UI界面的展示状态完全由数据决定，数据变化自动更新UI
            </li>
            <li>
              <strong>双向绑定</strong>：View与ViewModel之间建立自动同步机制
            </li>
            <li>
              <strong>关注点分离</strong>：清晰划分数据层、视图层与业务逻辑层
            </li>
          </ul>

          <h3>2. Vue MVVM架构的四大组成部分</h3>
          <div class="architecture-diagram">
            <pre><code>┌─────────────┐       ┌────────────────┐       ┌─────────────┐
│             │       │                │       │             │
│    Model    │◄──────┤   ViewModel    │◄──────┤    View     │
│  (数据模型)  │       │  (视图模型/VM)  │       │  (视图界面)  │
│             │──────►│                │──────►│             │
└─────────────┘       └────────────────┘       └─────────────┘
       ▲                        ▲                      ▲
       │                        │                      │
       ▼                        ▼                      ▼
┌─────────────┐       ┌────────────────┐       ┌─────────────┐
│ 业务逻辑数据  │       │ 响应式系统/指令  │       │ DOM渲染/事件 │
│  API交互     │       │ 模板编译/数据绑定 │       │ 用户交互处理 │
└─────────────┘       └────────────────┘       └─────────────┘</code></pre>
          </div>

          <h3>3. Vue实现MVVM的核心技术</h3>
          <table class="comparison-table">
            <tr>
              <th>技术模块</th>
              <th>Vue 2实现</th>
              <th>Vue 3实现</th>
              <th>核心作用</th>
            </tr>
            <tr>
              <td>数据响应式</td>
              <td>Object.defineProperty</td>
              <td>Proxy + Reflect</td>
              <td>实现Model到ViewModel的自动同步</td>
            </tr>
            <tr>
              <td>模板编译</td>
              <td>字符串模板 → AST → Render函数</td>
              <td>优化AST生成与patch算法</td>
              <td>实现ViewModel到View的转换</td>
            </tr>
            <tr>
              <td>虚拟DOM</td>
              <td>Snabbdom库改造版</td>
              <td>重写虚拟DOM与Diff算法</td>
              <td>优化View层渲染性能</td>
            </tr>
            <tr>
              <td>事件系统</td>
              <td>自定义事件总线</td>
              <td>重构事件系统与生命周期</td>
              <td>实现View到ViewModel的数据反馈</td>
            </tr>
          </table>

          <h3>4. Vue数据双向绑定的实现原理</h3>
          <p>Vue的双向绑定是MVVM架构的核心特性，通过以下三个部分协同工作：</p>
          <div class="code-example">
            <pre><code>// Vue 2双向绑定核心实现（简化版）
class Vue {
  constructor(options) {
    this.$options = options;
    this._data = options.data;
    // 1. 数据响应式处理
    observe(this._data);
    // 2. 代理data到vm实例
    proxy(this);
    // 3. 编译模板
    this.$compile = new Compile(options.el, this);
  }
}

// 数据劫持
function observe(data) {
  if (!data || typeof data !== 'object') return;
  return new Observer(data);
}

class Observer {
  constructor(data) {
    this.walk(data);
  }
  walk(data) {
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key]);
    });
  }
  defineReactive(data, key, val) {
    // 创建依赖收集器
    const dep = new Dep();
    // 递归处理子属性
    observe(val);
    // 数据劫持
    Object.defineProperty(data, key, {
      get() {
        // 依赖收集
        Dep.target && dep.addSub(Dep.target);
        return val;
      },
      set(newVal) {
        if (newVal === val) return;
        val = newVal;
        observe(newVal);
        // 通知更新
        dep.notify();
      }
    });
  }
}

// 依赖收集器
class Dep {
  constructor() {
    this.subs = [];
  }
  addSub(sub) {
    this.subs.push(sub);
  }
  notify() {
    this.subs.forEach(sub => sub.update());
  }
}

// 观察者
class Watcher {
  constructor(vm, expOrFn, cb) {
    this.vm = vm;
    this.cb = cb;
    this.expOrFn = expOrFn;
    this.get();
  }
  get() {
    Dep.target = this;
    this.value = this.getVMVal();
    Dep.target = null;
  }
  update() {
    const oldVal = this.value;
    this.value = this.getVMVal();
    this.cb.call(this.vm, this.value, oldVal);
  }
}
</code></pre>
          </div>

          <h3>5. MVVM数据流向与生命周期</h3>
          <p>Vue应用中的数据流动遵循严格的规则：</p>
          <ol>
            <li>
              <strong>初始化阶段</strong>：
              <ul>
                <li>解析模板生成AST</li>
                <li>将数据转换为响应式对象</li>
                <li>创建Watcher观察者实例</li>
              </ul>
            </li>
            <li>
              <strong>数据更新阶段</strong>：
              <ul>
                <li>修改数据触发setter</li>
                <li>Dep通知所有Watcher更新</li>
                <li>Watcher执行更新函数</li>
                <li>通过虚拟DOM Diff算法更新视图</li>
              </ul>
            </li>
            <li>
              <strong>用户交互阶段</strong>：
              <ul>
                <li>View层捕获用户事件</li>
                <li>调用ViewModel中的方法</li>
                <li>修改Model层数据</li>
                <li>触发响应式更新流程</li>
              </ul>
            </li>
          </ol>

          <h3>6. MVVM模式的优缺点分析</h3>
          <div class="pros-cons">
            <div class="pros">
              <h4>优势：</h4>
              <ul>
                <li>降低代码耦合度，提高可维护性</li>
                <li>减少DOM操作代码，提高开发效率</li>
                <li>视图与逻辑分离，便于单元测试</li>
                <li>数据驱动开发，状态管理更清晰</li>
              </ul>
            </div>
            <div class="cons">
              <h4>潜在挑战：</h4>
              <ul>
                <li>学习曲线较陡峭，理解响应式原理有难度</li>
                <li>简单场景可能显得过度设计</li>
                <li>调试复杂度增加，数据流追踪困难</li>
                <li>性能开销，响应式系统有一定运行时成本</li>
              </ul>
            </div>
          </div>

          <h3>7. Vue 3对MVVM的演进与创新</h3>
          <p>Vue 3在保持MVVM核心思想的同时，引入了Composition API等创新：</p>
          <ul>
            <li><strong>更灵活的代码组织</strong>：按功能而非选项组织代码</li>
            <li>
              <strong>更好的类型支持</strong>：原生TypeScript支持提升开发体验
            </li>
            <li>
              <strong>性能优化</strong>：
              <ul>
                <li>Proxy替代Object.defineProperty，解决数组监听限制</li>
                <li>引入Fragments减少DOM层级</li>
                <li>静态提升与PatchFlag优化Diff过程</li>
              </ul>
            </li>
            <li>
              <strong>逻辑复用增强</strong>：通过Composables实现更优雅的代码复用
            </li>
          </ul>
        </div>
      </div>

      <!-- HTTP/HTTPS协议解析 -->
      <div class="qa-item">
        <div class="qa-question" @click="toggleSection('httpHttps')">
          <span class="question-number">5.</span>
          <span class="question-text">HTTP与HTTPS协议原理及安全机制解析</span>
          <span class="toggle-icon">{{
            openSections.httpHttps ? "−" : "+"
          }}</span>
        </div>
        <div class="qa-answer" v-if="openSections.httpHttps">
          <router-link to="/demos" class="back-link"
            >← 返回演示导航</router-link
          >
          <h3>1. HTTP协议基础</h3>
          <p>
            HTTP（Hypertext Transfer
            Protocol）是一种基于TCP/IP的应用层协议，用于传输超媒体文档（如HTML）。其核心特点包括：
          </p>
          <ul>
            <li><strong>无连接</strong>：每次请求-响应后断开连接</li>
            <li><strong>无状态</strong>：服务器不保留客户端上下文信息</li>
            <li>
              <strong>媒体独立</strong
              >：可传输任意类型数据（由Content-Type指定）
            </li>
            <li>
              <strong>基于请求-响应模型</strong>：客户端主动请求，服务器被动响应
            </li>
          </ul>

          <h3>2. HTTP请求-响应模型</h3>
          <div class="protocol-diagram">
            <pre><code>┌───────────┐                     ┌───────────┐
│           │                     │           │
│  Client   │                     │  Server   │
│           │                     │           │
└─────┬─────┘                     └─────┬─────┘
      │                                 │
      │  GET /index.html HTTP/1.1       │
      │  Host: example.com              │
      │  User-Agent: Chrome/90.0.4430.72│
      │  Accept: text/html              │
      │────────────────────────────────▶│
      │                                 │
      │  HTTP/1.1 200 OK                │
      │  Content-Type: text/html        │
      │  Content-Length: 1234           │
      │  &lt;!DOCTYPE html&gt;&lt;html&gt;...&lt;/html&gt;│
      │◀────────────────────────────────│
      │                                 │
</code></pre>
          </div>

          <h3>3. HTTP状态码分类与常见状态码</h3>
          <table class="comparison-table">
            <tr>
              <th>分类</th>
              <th>范围</th>
              <th>含义</th>
              <th>常见状态码</th>
            </tr>
            <tr>
              <td>信息响应</td>
              <td>100-199</td>
              <td>请求已接收，继续处理</td>
              <td>100 Continue, 101 Switching Protocols</td>
            </tr>
            <tr>
              <td>成功响应</td>
              <td>200-299</td>
              <td>请求已成功处理</td>
              <td>200 OK, 201 Created, 204 No Content</td>
            </tr>
            <tr>
              <td>重定向</td>
              <td>300-399</td>
              <td>需要进一步操作完成请求</td>
              <td>301 Moved Permanently, 302 Found, 304 Not Modified</td>
            </tr>
            <tr>
              <td>客户端错误</td>
              <td>400-499</td>
              <td>请求包含语法错误或无法完成</td>
              <td>
                400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found
              </td>
            </tr>
            <tr>
              <td>服务器错误</td>
              <td>500-599</td>
              <td>服务器在处理请求时出错</td>
              <td>
                500 Internal Server Error, 502 Bad Gateway, 503 Service
                Unavailable
              </td>
            </tr>
          </table>

          <h3>4. HTTPS安全机制详解</h3>
          <p>
            HTTPS（HTTP
            Secure）通过在HTTP与TCP之间添加TLS/SSL加密层实现安全通信，其工作原理包括：
          </p>
          <ol>
            <li>
              <strong>证书验证阶段</strong>：
              <ul>
                <li>客户端请求HTTPS网站</li>
                <li>服务器返回SSL证书（包含公钥和网站信息）</li>
                <li>客户端验证证书合法性（通过CA机构）</li>
              </ul>
            </li>
            <li>
              <strong>密钥协商阶段</strong>：
              <ul>
                <li>客户端生成随机对称密钥，用服务器公钥加密后发送</li>
                <li>服务器用私钥解密获取对称密钥</li>
                <li>双方确立会话密钥（Session Key）</li>
              </ul>
            </li>
            <li>
              <strong>加密通信阶段</strong>：
              <ul>
                <li>后续通信使用对称密钥加密（速度快）</li>
                <li>结合MAC（消息认证码）确保数据完整性</li>
                <li>使用TLS握手协议确保安全参数协商</li>
              </ul>
            </li>
          </ol>

          <h3>5. HTTP/1.1 vs HTTP/2 vs HTTP/3主要区别</h3>
          <div class="code-example">
            <pre><code>// HTTP协议版本对比
HTTP/1.1:
- 基于文本的协议
- 每次请求需要建立新连接（或使用Keep-Alive复用连接）
- 队头阻塞（Head-of-Line Blocking）问题
- 单个连接同一时间只能处理一个请求

HTTP/2:
- 二进制分帧层（Binary Framing Layer）
- 多路复用（Multiplexing）：多个请求通过单个连接并行传输
- 服务器推送（Server Push）：主动推送资源
- 头部压缩（HPACK）：减少头部传输开销
- 流优先级（Stream Prioritization）

HTTP/3:
- 基于QUIC协议（而非TCP）
- 解决TCP队头阻塞问题
- 更快的连接建立（0-RTT/1-RTT握手）
- 连接迁移（Connection Migration）：支持网络切换
- 前向纠错（Forward Error Correction）：减少重传</code></pre>
          </div>

          <h3>6. 前端开发中的HTTP最佳实践</h3>
          <ul>
            <li>
              <strong>资源优化</strong>：
              <ul>
                <li>使用HTTP/2+多路复用减少连接数</li>
                <li>实施资源压缩（gzip/Brotli）</li>
                <li>合理设置缓存策略（Cache-Control, ETag）</li>
              </ul>
            </li>
            <li>
              <strong>安全措施</strong>：
              <ul>
                <li>强制使用HTTPS（HSTS）</li>
                <li>实施CSP（内容安全策略）防止XSS</li>
                <li>使用SameSite Cookie防止CSRF</li>
              </ul>
            </li>
            <li>
              <strong>性能优化</strong>：
              <ul>
                <li>使用CDN分发静态资源</li>
                <li>实施懒加载（Lazy Loading）</li>
                <li>预连接关键域名（preconnect）</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <!-- TCP三次握手四次挥手 -->
      <div class="qa-item">
        <div class="qa-question" @click="toggleSection('tcpHandshake')">
          <span class="question-number">6.</span>
          <span class="question-text">TCP三次握手与四次挥手机制深度解析</span>
          <span class="toggle-icon">{{
            openSections.tcpHandshake ? "−" : "+"
          }}</span>
        </div>
        <div class="qa-answer" v-if="openSections.tcpHandshake">
          <router-link to="/demos" class="back-link"
            >← 返回演示导航</router-link
          >
          <h3>1. TCP协议与可靠传输基础</h3>
          <p>
            TCP（Transmission Control
            Protocol）是一种面向连接的、可靠的、基于字节流的传输层协议，通过以下机制实现可靠性：
          </p>
          <ul>
            <li><strong>确认应答（ACK）</strong>：接收方收到数据后发送确认</li>
            <li><strong>超时重传</strong>：发送方未按时收到ACK则重传数据</li>
            <li><strong>流量控制</strong>：通过滑动窗口机制控制发送速率</li>
            <li>
              <strong>拥塞控制</strong>：避免网络拥塞（慢启动、拥塞避免等算法）
            </li>
            <li><strong>数据校验</strong>：检测数据在传输过程中的损坏</li>
          </ul>

          <h3>2. TCP三次握手建立连接过程</h3>
          <p>三次握手（Three-way Handshake）是TCP建立可靠连接的过程：</p>
          <div class="protocol-diagram">
            <pre><code>┌───────────┐                     ┌───────────┐
│  Client   │                     │  Server   │
└─────┬─────┘                     └─────┬─────┘
      │                                 │
      │  SYN=1, Seq=X                   │
      │────────────────────────────────▶│
      │         (请求建立连接)           │
      │                                 │
      │  SYN=1, ACK=1, Seq=Y, ACK=X+1   │
      │◀────────────────────────────────│
      │        (确认并请求连接)          │
      │                                 │
      │  ACK=1, Seq=X+1, ACK=Y+1        │
      │────────────────────────────────▶│
      │           (确认连接)             │
      │                                 │
      │          连接已建立              │
      │◀────────────────────────────────▶│
</code></pre>
          </div>

          <h3>3. 三次握手的核心作用与安全意义</h3>
          <ol>
            <li>
              <strong>同步序列号</strong>：
              <p>
                双方交换初始序列号（ISN），确保数据按序传输和重组。ISN是随机生成的32位数字，防止旧连接的报文干扰新连接。
              </p>
            </li>
            <li>
              <strong>协商连接参数</strong>：
              <p>
                交换MSS（最大报文段大小）、窗口大小、选项（如SACK、Timestamp）等关键参数。
              </p>
            </li>
            <li>
              <strong>防止半连接攻击</strong>：
              <p>
                三次握手设计可有效抵御SYN
                Flood攻击，服务器通过SYN-RCVD状态管理半连接队列。
              </p>
            </li>
            <li>
              <strong>确保双向通信能力</strong>：
              <p>三次握手确保双方都能发送和接收数据，是全双工通信的基础。</p>
            </li>
          </ol>

          <h3>4. TCP四次挥手断开连接过程</h3>
          <p>四次挥手（Four-way Wavehand）是TCP断开连接的过程：</p>
          <div class="protocol-diagram">
            <pre><code>┌───────────┐                     ┌───────────┐
│  Client   │                     │  Server   │
└─────┬─────┘                     └─────┬─────┘
      │                                 │
      │  FIN=1, Seq=U                  │
      │────────────────────────────────▶│
      │        (请求关闭连接)            │
      │                                 │
      │  ACK=1, Seq=V, ACK=U+1         │
      │◀────────────────────────────────│
      │         (确认关闭请求)           │
      │                                 │
      │                                 │
      │  FIN=1, ACK=1, Seq=W, ACK=U+1   │
      │◀────────────────────────────────│
      │        (请求关闭连接)            │
      │                                 │
      │  ACK=1, Seq=U+1, ACK=W+1        │
      │────────────────────────────────▶│
      │           (确认关闭)             │
      │                                 │
      │         连接已关闭               │
</code></pre>
          </div>

          <h3>5. 四次挥手的关键状态与超时机制</h3>
          <ul>
            <li>
              <strong>FIN_WAIT_1</strong>：
              <p>客户端发送FIN后进入，等待服务器ACK。超时未收到则重发FIN。</p>
            </li>
            <li>
              <strong>FIN_WAIT_2</strong>：
              <p>收到服务器ACK后进入，等待服务器FIN。</p>
            </li>
            <li>
              <strong>CLOSE_WAIT</strong>：
              <p>服务器收到FIN后进入，表示被动关闭方仍有数据发送。</p>
            </li>
            <li>
              <strong>LAST_ACK</strong>：
              <p>服务器发送FIN后进入，等待客户端ACK。</p>
            </li>
            <li>
              <strong>TIME_WAIT</strong>：
              <p>
                客户端发送最后ACK后进入，等待2MSL（报文最大生存时间），确保服务器收到ACK。
              </p>
            </li>
          </ul>

          <h3>6. TCP连接异常处理与性能优化</h3>
          <div class="code-example">
            <pre><code>// TCP连接管理相关的系统参数（Linux）
// 1. TIME_WAIT状态持续时间（默认60秒）
net.ipv4.tcp_fin_timeout = 60

// 2. TIME_WAIT状态最大连接数
net.ipv4.tcp_max_tw_buckets = 5000

// 3. 允许重用处于TIME_WAIT状态的端口
net.ipv4.tcp_tw_reuse = 1

// 4. 快速回收TIME_WAIT连接（需配合tcp_tw_reuse使用）
net.ipv4.tcp_tw_recycle = 0  // 通常禁用，可能导致NAT环境问题

// 5. SYN半连接队列大小
net.ipv4.tcp_max_syn_backlog = 1024

// 6. SYN重传次数
net.ipv4.tcp_syn_retries = 3
net.ipv4.tcp_synack_retries = 3

// 7. 启用TCP快速打开（TFO）
net.ipv4.tcp_fastopen = 3</code></pre>
          </div>

          <h3>7. 前端开发中与TCP相关的性能优化</h3>
          <ul>
            <li>
              <strong>减少连接建立开销</strong>：
              <ul>
                <li>使用连接复用（HTTP/1.1 Keep-Alive或HTTP/2+多路复用）</li>
                <li>实施域名分片（Domain Sharding）突破浏览器连接限制</li>
                <li>预连接关键域名（&lt;link rel="preconnect"&gt;）</li>
              </ul>
            </li>
            <li>
              <strong>优化数据传输效率</strong>：
              <ul>
                <li>减少HTTP请求数量（合并资源、内联关键资源）</li>
                <li>压缩传输数据（gzip/Brotli）</li>
                <li>使用适当的缓存策略减少重复传输</li>
              </ul>
            </li>
            <li>
              <strong>应对网络不稳定</strong>：
              <ul>
                <li>实现断点续传和分片上传</li>
                <li>使用指数退避策略处理重试</li>
                <li>实施请求优先级和超时控制</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VueInternalsExplained",
  data() {
    return {
      openSections: {
        vModel: false,
        reactivity: false,
        reflowRepaint: false,
        mvvm: false,
        tcpHandshake: false, // 添加TCP握手状态
        httpHttps: false, // 添加HTTP/HTTPS状态
      },
    };
  },
  methods: {
    toggleSection(section) {
      // 关闭其他所有部分
      Object.keys(this.openSections).forEach((key) => {
        if (key !== section) {
          this.openSections[key] = false;
        }
      });
      // 切换当前部分
      this.openSections[section] = !this.openSections[section];
    },
  },
};
</script>

<style scoped>
/* 基础样式继承自PerformanceOptimizationQA.vue */
.qa-header {
  text-align: center;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e5e7eb;
}

.qa-container {
  display: flex;
  flex-direction: column;
  padding: 20px 30px;
  gap: 15px;
}

.qa-item {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
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

.qa-answer {
  padding: 25px;
  background-color: white;
  border-top: 1px solid #e2e8f0;
  animation: fadeIn 0.3s ease;
  line-height: 1.7;
  color: #334155;
}

/* 新增样式 */
.comparison-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

.comparison-table th,
.comparison-table td {
  border: 1px solid #e2e8f0;
  padding: 12px;
  text-align: left;
}

.comparison-table th {
  background-color: #f8fafc;
  font-weight: 600;
}

.render-pipeline {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 20px 0;
  padding: 15px;
  background-color: #f8fafc;
  border-radius: 8px;
}

.pipeline-stage {
  background-color: #e0f2fe;
  padding: 8px 12px;
  border-radius: 4px;
  font-weight: 500;
}

.pipeline-arrow {
  margin: 0 10px;
  color: #64748b;
}

.optimization-strategies {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.strategy-card {
  background-color: #f8fafc;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.strategy-card h4 {
  margin-top: 0;
  color: #1e293b;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .optimization-strategies {
    grid-template-columns: 1fr;
  }
}
.back-link {
  display: inline-block;
  margin-bottom: 16px;
  color: #42b983;
  text-decoration: none;
  font-size: 14px;
}

.back-link:hover {
  text-decoration: underline;
}
.protocol-diagram {
  background-color: #f8fafc;
  border-radius: 6px;
  padding: 15px;
  margin: 15px 0;
  overflow-x: auto;
  font-family: monospace;
}

/* 确保代码示例与协议图样式统一 */
.code-example pre {
  background-color: #f8fafc;
  border-radius: 6px;
  padding: 15px;
  overflow-x: auto;
}
.protocol-diagram {
  background-color: #f8fafc;
  border-radius: 6px;
  padding: 15px;
  margin: 15px 0;
  overflow-x: auto;
  font-family: monospace;
}

/* 确保代码示例与协议图样式统一 */
.code-example pre {
  background-color: #f8fafc;
  border-radius: 6px;
  padding: 15px;
  overflow-x: auto;
}
</style>
