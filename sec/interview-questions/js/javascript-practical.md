# JavaScript 实际应用面试题

## 1. 实际项目场景

### 问题：如何实现一个图片懒加载组件？

**答案：**

```javascript
class LazyImage {
  constructor(selector) {
    this.images = document.querySelectorAll(selector);
    this.init();
  }
  
  init() {
    // 创建 Intersection Observer
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
    
    // 观察所有图片
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

// 使用示例
// HTML: <img data-src="image.jpg" class="lazy" alt="懒加载图片">
new LazyImage('img[data-src]');
```

### 问题：如何实现一个无限滚动列表？

**答案：**

```javascript
class InfiniteScroll {
  constructor(container, options = {}) {
    this.container = container;
    this.page = 1;
    this.loading = false;
    this.hasMore = true;
    this.options = {
      threshold: 100,
      pageSize: 20,
      ...options
    };
    
    this.init();
  }
  
  init() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.loading && this.hasMore) {
          this.loadMore();
        }
      });
    });
    
    // 创建哨兵元素
    this.sentinel = document.createElement('div');
    this.sentinel.className = 'scroll-sentinel';
    this.container.appendChild(this.sentinel);
    this.observer.observe(this.sentinel);
  }
  
  async loadMore() {
    this.loading = true;
    
    try {
      const data = await this.fetchData(this.page);
      
      if (data.length < this.options.pageSize) {
        this.hasMore = false;
      }
      
      this.renderItems(data);
      this.page++;
    } catch (error) {
      console.error('加载失败:', error);
    } finally {
      this.loading = false;
    }
  }
  
  async fetchData(page) {
    // 模拟API调用
    return new Promise(resolve => {
      setTimeout(() => {
        const items = Array.from({ length: this.options.pageSize }, (_, i) => ({
          id: (page - 1) * this.options.pageSize + i + 1,
          title: `Item ${(page - 1) * this.options.pageSize + i + 1}`
        }));
        resolve(items);
      }, 500);
    });
  }
  
  renderItems(items) {
    items.forEach(item => {
      const element = document.createElement('div');
      element.className = 'list-item';
      element.textContent = item.title;
      this.container.insertBefore(element, this.sentinel);
    });
  }
  
  destroy() {
    this.observer.disconnect();
  }
}

// 使用示例
const container = document.getElementById('list-container');
new InfiniteScroll(container, {
  pageSize: 10,
  threshold: 50
});
```

### 问题：如何实现一个防抖搜索框？

**答案：**

```javascript
class SearchBox {
  constructor(input, options = {}) {
    this.input = input;
    this.options = {
      delay: 300,
      minLength: 2,
      ...options
    };
    
    this.debouncedSearch = this.debounce(this.search.bind(this), this.options.delay);
    this.init();
  }
  
  init() {
    this.input.addEventListener('input', (e) => {
      const query = e.target.value.trim();
      
      if (query.length >= this.options.minLength) {
        this.debouncedSearch(query);
      } else {
        this.clearResults();
      }
    });
  }
  
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  async search(query) {
    try {
      this.showLoading();
      const results = await this.fetchResults(query);
      this.renderResults(results);
    } catch (error) {
      this.showError(error.message);
    }
  }
  
  async fetchResults(query) {
    // 模拟API调用
    return new Promise(resolve => {
      setTimeout(() => {
        const results = [
          { id: 1, title: `搜索结果 1 for "${query}"` },
          { id: 2, title: `搜索结果 2 for "${query}"` },
          { id: 3, title: `搜索结果 3 for "${query}"` }
        ];
        resolve(results);
      }, 200);
    });
  }
  
  renderResults(results) {
    this.clearResults();
    
    const container = this.getResultsContainer();
    results.forEach(result => {
      const element = document.createElement('div');
      element.className = 'search-result';
      element.textContent = result.title;
      element.addEventListener('click', () => {
        this.selectResult(result);
      });
      container.appendChild(element);
    });
  }
  
  selectResult(result) {
    this.input.value = result.title;
    this.clearResults();
    this.onSelect && this.onSelect(result);
  }
  
  clearResults() {
    const container = this.getResultsContainer();
    container.innerHTML = '';
  }
  
  showLoading() {
    const container = this.getResultsContainer();
    container.innerHTML = '<div class="loading">搜索中...</div>';
  }
  
  showError(message) {
    const container = this.getResultsContainer();
    container.innerHTML = `<div class="error">${message}</div>`;
  }
  
  getResultsContainer() {
    let container = this.input.parentNode.querySelector('.search-results');
    if (!container) {
      container = document.createElement('div');
      container.className = 'search-results';
      this.input.parentNode.appendChild(container);
    }
    return container;
  }
}

// 使用示例
const searchInput = document.getElementById('search-input');
const searchBox = new SearchBox(searchInput, {
  delay: 500,
  minLength: 3
});

searchBox.onSelect = (result) => {
  console.log('选择了:', result);
};
```

### 问题：如何实现一个虚拟滚动列表？

**答案：**

```javascript
class VirtualScroll {
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
  
  handleResize() {
    this.calculateVisibleCount();
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
    
    // 渲染可见项
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
  
  scrollToIndex(index) {
    const scrollTop = index * this.options.itemHeight;
    this.container.scrollTop = scrollTop;
  }
  
  destroy() {
    this.container.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
  }
}

// 使用示例
const container = document.getElementById('virtual-container');
const virtualScroll = new VirtualScroll(container, {
  itemHeight: 60,
  buffer: 3
});

// 设置数据
const items = Array.from({ length: 10000 }, (_, i) => ({
  id: i + 1,
  title: `Item ${i + 1}`
}));

virtualScroll.setItems(items);
```

### 问题：如何实现一个状态管理库？

**答案：**

```javascript
class Store {
  constructor(initialState = {}) {
    this.state = new Proxy(initialState, {
      set: (target, property, value) => {
        target[property] = value;
        this.notify(property, value);
        return true;
      }
    });
    
    this.subscribers = new Map();
    this.middlewares = [];
  }
  
  subscribe(key, callback) {
    if (!this.subscribers.has(key)) {
      this.subscribers.set(key, new Set());
    }
    this.subscribers.get(key).add(callback);
    
    // 返回取消订阅函数
    return () => {
      const callbacks = this.subscribers.get(key);
      if (callbacks) {
        callbacks.delete(callback);
      }
    };
  }
  
  notify(key, value) {
    const callbacks = this.subscribers.get(key);
    if (callbacks) {
      callbacks.forEach(callback => {
        try {
          callback(value, this.state);
        } catch (error) {
          console.error('订阅者回调错误:', error);
        }
      });
    }
  }
  
  setState(updates) {
    Object.assign(this.state, updates);
  }
  
  getState() {
    return { ...this.state };
  }
  
  useMiddleware(middleware) {
    this.middlewares.push(middleware);
  }
  
  dispatch(action) {
    let currentState = this.state;
    
    // 应用中间件
    this.middlewares.forEach(middleware => {
      currentState = middleware(currentState, action);
    });
    
    // 更新状态
    this.setState(currentState);
  }
}

// 中间件示例
const loggerMiddleware = (state, action) => {
  console.log('Action:', action);
  console.log('Previous State:', state);
  return state;
};

const thunkMiddleware = (state, action) => {
  if (typeof action === 'function') {
    return action(state);
  }
  return state;
};

// 使用示例
const store = new Store({
  count: 0,
  user: null,
  todos: []
});

// 添加中间件
store.useMiddleware(loggerMiddleware);
store.useMiddleware(thunkMiddleware);

// 订阅状态变化
const unsubscribe = store.subscribe('count', (newCount, state) => {
  console.log('Count changed to:', newCount);
});

// 更新状态
store.setState({ count: 1 });

// 使用 dispatch
store.dispatch({ type: 'INCREMENT', payload: 1 });

// 异步 action
store.dispatch((state) => {
  setTimeout(() => {
    store.setState({ count: state.count + 1 });
  }, 1000);
  return state;
});

// 取消订阅
unsubscribe();
```

### 问题：如何实现一个事件总线？

**答案：**

```javascript
class EventBus {
  constructor() {
    this.events = new Map();
    this.onceEvents = new Map();
  }
  
  on(event, callback) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event).add(callback);
  }
  
  once(event, callback) {
    if (!this.onceEvents.has(event)) {
      this.onceEvents.set(event, new Set());
    }
    this.onceEvents.get(event).add(callback);
  }
  
  off(event, callback) {
    if (this.events.has(event)) {
      this.events.get(event).delete(callback);
    }
    if (this.onceEvents.has(event)) {
      this.onceEvents.get(event).delete(callback);
    }
  }
  
  emit(event, ...args) {
    // 触发普通事件
    if (this.events.has(event)) {
      this.events.get(event).forEach(callback => {
        try {
          callback.apply(this, args);
        } catch (error) {
          console.error('事件回调错误:', error);
        }
      });
    }
    
    // 触发一次性事件
    if (this.onceEvents.has(event)) {
      const callbacks = this.onceEvents.get(event);
      callbacks.forEach(callback => {
        try {
          callback.apply(this, args);
        } catch (error) {
          console.error('一次性事件回调错误:', error);
        }
      });
      // 清除一次性事件
      this.onceEvents.delete(event);
    }
  }
  
  clear(event) {
    if (event) {
      this.events.delete(event);
      this.onceEvents.delete(event);
    } else {
      this.events.clear();
      this.onceEvents.clear();
    }
  }
  
  listenerCount(event) {
    const normalCount = this.events.has(event) ? this.events.get(event).size : 0;
    const onceCount = this.onceEvents.has(event) ? this.onceEvents.get(event).size : 0;
    return normalCount + onceCount;
  }
}

// 使用示例
const eventBus = new EventBus();

// 监听事件
eventBus.on('user:login', (user) => {
  console.log('用户登录:', user);
});

eventBus.once('app:init', () => {
  console.log('应用初始化完成');
});

// 触发事件
eventBus.emit('user:login', { id: 1, name: 'John' });
eventBus.emit('app:init');

// 获取监听器数量
console.log(eventBus.listenerCount('user:login')); // 1
```

### 问题：如何实现一个缓存系统？

**答案：**

```javascript
class Cache {
  constructor(options = {}) {
    this.maxSize = options.maxSize || 100;
    this.ttl = options.ttl || 60000; // 默认1分钟
    this.cache = new Map();
    this.timers = new Map();
  }
  
  set(key, value, ttl = this.ttl) {
    // 清理过期项
    this.cleanup();
    
    // 如果缓存已满，删除最旧的项
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.delete(firstKey);
    }
    
    // 设置缓存
    this.cache.set(key, {
      value,
      timestamp: Date.now(),
      ttl
    });
    
    // 设置过期定时器
    if (ttl > 0) {
      const timer = setTimeout(() => {
        this.delete(key);
      }, ttl);
      this.timers.set(key, timer);
    }
  }
  
  get(key) {
    const item = this.cache.get(key);
    
    if (!item) {
      return undefined;
    }
    
    // 检查是否过期
    if (Date.now() - item.timestamp > item.ttl) {
      this.delete(key);
      return undefined;
    }
    
    return item.value;
  }
  
  has(key) {
    return this.get(key) !== undefined;
  }
  
  delete(key) {
    this.cache.delete(key);
    
    const timer = this.timers.get(key);
    if (timer) {
      clearTimeout(timer);
      this.timers.delete(key);
    }
  }
  
  clear() {
    this.cache.clear();
    
    // 清除所有定时器
    this.timers.forEach(timer => clearTimeout(timer));
    this.timers.clear();
  }
  
  size() {
    return this.cache.size;
  }
  
  keys() {
    return Array.from(this.cache.keys());
  }
  
  values() {
    return Array.from(this.cache.values()).map(item => item.value);
  }
  
  cleanup() {
    const now = Date.now();
    
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl) {
        this.delete(key);
      }
    }
  }
  
  // 获取缓存统计信息
  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      keys: this.keys()
    };
  }
}

// 使用示例
const cache = new Cache({
  maxSize: 10,
  ttl: 5000 // 5秒
});

// 设置缓存
cache.set('user:1', { id: 1, name: 'John' });
cache.set('user:2', { id: 2, name: 'Jane' }, 10000); // 10秒过期

// 获取缓存
console.log(cache.get('user:1')); // { id: 1, name: 'John' }

// 检查是否存在
console.log(cache.has('user:1')); // true

// 获取统计信息
console.log(cache.getStats());

// 5秒后自动过期
setTimeout(() => {
  console.log(cache.get('user:1')); // undefined
}, 6000);
```

### 问题：如何实现一个任务队列？

**答案：**

```javascript
class TaskQueue {
  constructor(options = {}) {
    this.maxConcurrency = options.maxConcurrency || 3;
    this.retryAttempts = options.retryAttempts || 3;
    this.retryDelay = options.retryDelay || 1000;
    
    this.queue = [];
    this.running = 0;
    this.paused = false;
  }
  
  add(task, priority = 0) {
    const taskItem = {
      id: Date.now() + Math.random(),
      task,
      priority,
      attempts: 0,
      status: 'pending'
    };
    
    this.queue.push(taskItem);
    this.queue.sort((a, b) => b.priority - a.priority);
    
    this.process();
    
    return taskItem.id;
  }
  
  async process() {
    if (this.paused || this.running >= this.maxConcurrency) {
      return;
    }
    
    const taskItem = this.queue.shift();
    if (!taskItem) {
      return;
    }
    
    this.running++;
    taskItem.status = 'running';
    
    try {
      const result = await this.executeTask(taskItem);
      taskItem.status = 'completed';
      taskItem.result = result;
      
      // 触发完成事件
      this.emit('taskCompleted', taskItem);
    } catch (error) {
      taskItem.status = 'failed';
      taskItem.error = error;
      
      // 重试逻辑
      if (taskItem.attempts < this.retryAttempts) {
        taskItem.attempts++;
        taskItem.status = 'pending';
        
        setTimeout(() => {
          this.queue.unshift(taskItem);
          this.process();
        }, this.retryDelay);
      } else {
        // 触发失败事件
        this.emit('taskFailed', taskItem);
      }
    } finally {
      this.running--;
      this.process();
    }
  }
  
  async executeTask(taskItem) {
    if (typeof taskItem.task === 'function') {
      return await taskItem.task();
    }
    return taskItem.task;
  }
  
  pause() {
    this.paused = true;
  }
  
  resume() {
    this.paused = false;
    this.process();
  }
  
  clear() {
    this.queue = [];
  }
  
  getStatus() {
    return {
      queueLength: this.queue.length,
      running: this.running,
      paused: this.paused,
      maxConcurrency: this.maxConcurrency
    };
  }
  
  // 简单的事件系统
  on(event, callback) {
    if (!this.events) {
      this.events = new Map();
    }
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(callback);
  }
  
  emit(event, data) {
    if (this.events && this.events.has(event)) {
      this.events.get(event).forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error('事件回调错误:', error);
        }
      });
    }
  }
}

// 使用示例
const taskQueue = new TaskQueue({
  maxConcurrency: 2,
  retryAttempts: 2
});

// 监听事件
taskQueue.on('taskCompleted', (task) => {
  console.log('任务完成:', task.id, task.result);
});

taskQueue.on('taskFailed', (task) => {
  console.log('任务失败:', task.id, task.error);
});

// 添加任务
const task1 = taskQueue.add(async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return 'Task 1 completed';
}, 1);

const task2 = taskQueue.add(async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return 'Task 2 completed';
}, 2);

const task3 = taskQueue.add(async () => {
  throw new Error('Task 3 failed');
}, 0);

// 查看状态
console.log(taskQueue.getStatus());
```

这些实际应用场景的面试题涵盖了前端开发中常见的功能实现，包括性能优化、用户体验、状态管理等。掌握这些实现对于实际项目开发和面试都非常重要。 