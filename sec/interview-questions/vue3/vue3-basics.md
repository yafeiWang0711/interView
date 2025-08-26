# Vue3 基础面试题

## 1. Vue3 核心特性

### 问题：Vue3 相比 Vue2 有哪些重要改进？

**答案：**

**主要改进：**

1. **性能提升**
   - 重写虚拟 DOM 实现
   - 编译时优化
   - Tree-shaking 支持
   - 更小的包体积

2. **Composition API**
   - 更好的逻辑复用
   - 更好的 TypeScript 支持
   - 更灵活的代码组织

3. **响应式系统升级**
   - 使用 Proxy 替代 Object.defineProperty
   - 更好的性能
   - 支持 Map、Set、WeakMap、WeakSet

4. **新特性**
   - Teleport 组件
   - Fragments（多根节点）
   - Suspense 组件
   - 更好的 TypeScript 支持

### 问题：Vue3 的响应式原理是什么？

**答案：**

**Vue3 使用 Proxy 实现响应式：**

```javascript
// Vue3 响应式实现原理
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      console.log(`获取属性: ${key}`);
      const result = Reflect.get(target, key, receiver);
      
      // 如果属性值是对象，递归代理
      if (typeof result === 'object' && result !== null) {
        return reactive(result);
      }
      
      return result;
    },
    
    set(target, key, value, receiver) {
      console.log(`设置属性: ${key} = ${value}`);
      const result = Reflect.set(target, key, value, receiver);
      
      // 触发更新
      trigger(target, key);
      
      return result;
    },
    
    deleteProperty(target, key) {
      console.log(`删除属性: ${key}`);
      const result = Reflect.deleteProperty(target, key);
      
      // 触发更新
      trigger(target, key);
      
      return result;
    }
  });
}

// 使用示例
const data = reactive({
  name: 'Vue3',
  age: 3,
  info: {
    version: '3.0.0'
  }
});

// 测试响应式
data.name = 'Vue3 Updated'; // 触发 setter
console.log(data.name); // 触发 getter
data.info.version = '3.1.0'; // 嵌套对象也能响应
```

**Vue3 响应式的优势：**

1. **支持更多数据类型**
```javascript
// Vue3 可以监听这些变化
const reactiveMap = reactive(new Map());
const reactiveSet = reactive(new Set());
const reactiveArray = reactive([1, 2, 3]);

reactiveMap.set('key', 'value'); // 可以监听
reactiveSet.add('item'); // 可以监听
reactiveArray[0] = 10; // 可以监听
reactiveArray.length = 0; // 可以监听
```

2. **更好的性能**
```javascript
// Vue3 的响应式系统更高效
const state = reactive({
  count: 0,
  name: 'Vue3'
});

// 只有被访问的属性才会被代理
console.log(state.count); // 只有 count 被代理
```

## 2. Composition API

### 问题：什么是 Composition API？如何使用？

**答案：**

**Composition API 是 Vue3 的新特性，用于更好的逻辑复用和代码组织。**

**基本使用：**

```javascript
<template>
  <div>
    <h1>{{ title }}</h1>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

// 响应式数据
const count = ref(0);
const title = ref('Vue3 Composition API');

// 计算属性
const doubleCount = computed(() => count.value * 2);

// 方法
const increment = () => {
  count.value++;
};

const decrement = () => {
  count.value--;
};

// 生命周期
onMounted(() => {
  console.log('组件已挂载');
});

onUnmounted(() => {
  console.log('组件已卸载');
});
</script>
```

**组合函数（Composables）：**

```javascript
// useCounter.js
import { ref, computed } from 'vue';

export function useCounter(initialValue = 0) {
  const count = ref(initialValue);
  
  const increment = () => count.value++;
  const decrement = () => count.value--;
  const reset = () => count.value = initialValue;
  
  const doubleCount = computed(() => count.value * 2);
  
  return {
    count,
    increment,
    decrement,
    reset,
    doubleCount
  };
}

// 在组件中使用
<script setup>
import { useCounter } from './useCounter';

const { count, increment, decrement, reset, doubleCount } = useCounter(10);
</script>
```

**响应式 API：**

```javascript
<script setup>
import { ref, reactive, computed, watch, watchEffect } from 'vue';

// ref - 用于基本类型
const count = ref(0);
const name = ref('Vue3');

// reactive - 用于对象
const user = reactive({
  name: 'John',
  age: 25,
  address: {
    city: 'Beijing',
    country: 'China'
  }
});

// computed - 计算属性
const fullName = computed(() => `${user.name} (${user.age})`);
const isAdult = computed(() => user.age >= 18);

// watch - 监听器
watch(count, (newVal, oldVal) => {
  console.log(`count 从 ${oldVal} 变为 ${newVal}`);
});

// 监听多个源
watch([count, name], ([newCount, newName], [oldCount, oldName]) => {
  console.log('count 或 name 发生变化');
});

// 深度监听
watch(user, (newUser, oldUser) => {
  console.log('user 对象发生变化');
}, { deep: true });

// watchEffect - 自动收集依赖
watchEffect(() => {
  console.log(`当前计数: ${count.value}`);
  console.log(`用户名: ${user.name}`);
});

// 立即执行
watchEffect(() => {
  console.log('立即执行');
}, { flush: 'post' }); // 在 DOM 更新后执行
</script>
```

**生命周期钩子：**

```javascript
<script setup>
import { 
  onMounted, 
  onUnmounted, 
  onUpdated, 
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onErrorCaptured
} from 'vue';

// 挂载阶段
onBeforeMount(() => {
  console.log('组件挂载前');
});

onMounted(() => {
  console.log('组件已挂载');
  // 可以访问 DOM
  const element = document.getElementById('my-element');
});

// 更新阶段
onBeforeUpdate(() => {
  console.log('组件更新前');
});

onUpdated(() => {
  console.log('组件已更新');
});

// 卸载阶段
onBeforeUnmount(() => {
  console.log('组件卸载前');
  // 清理工作
  clearInterval(timer);
});

onUnmounted(() => {
  console.log('组件已卸载');
});

// 错误捕获
onErrorCaptured((err, instance, info) => {
  console.error('捕获到错误:', err);
  return false; // 阻止错误继续传播
});
</script>
```

## 3. 新组件特性

### 问题：Vue3 有哪些新的组件特性？

**答案：**

**1. Teleport 组件**

```vue
<!-- Modal.vue -->
<template>
  <teleport to="body">
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal-content">
        <h2>{{ title }}</h2>
        <p>{{ content }}</p>
        <button @click="close">关闭</button>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  isVisible: Boolean,
  title: String,
  content: String
});

const emit = defineEmits(['close']);

const close = () => {
  emit('close');
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
}
</style>
```

**2. Fragments（多根节点）**

```vue
<template>
  <!-- Vue3 支持多根节点 -->
  <header>
    <h1>{{ title }}</h1>
  </header>
  
  <main>
    <p>{{ content }}</p>
  </main>
  
  <footer>
    <p>© 2024</p>
  </footer>
</template>
```

**3. Suspense 组件**

```vue
<!-- AsyncComponent.vue -->
<template>
  <div>
    <h2>{{ data.title }}</h2>
    <p>{{ data.content }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 模拟异步数据
const data = ref(null);

// 模拟异步请求
const fetchData = async () => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  data.value = {
    title: '异步加载的标题',
    content: '异步加载的内容'
  };
};

// 立即执行
fetchData();
</script>

<!-- 父组件 -->
<template>
  <Suspense>
    <template #default>
      <AsyncComponent />
    </template>
    
    <template #fallback>
      <div class="loading">
        <p>加载中...</p>
      </div>
    </template>
  </Suspense>
</template>

<script setup>
import AsyncComponent from './AsyncComponent.vue';
</script>
```

**4. 异步组件**

```javascript
// 异步组件定义
const AsyncComponent = defineAsyncComponent({
  loader: () => import('./HeavyComponent.vue'),
  loadingComponent: LoadingSpinner,
  errorComponent: ErrorComponent,
  delay: 200,
  timeout: 3000,
  onError(error, retry, fail, attempts) {
    if (attempts <= 3) {
      retry();
    } else {
      fail();
    }
  }
});
```

## 4. 组件通信

### 问题：Vue3 中的组件通信方式有哪些？

**答案：**

**1. Props / Emits**

```vue
<!-- 父组件 -->
<template>
  <div>
    <child-component 
      :message="parentMessage"
      :user="user"
      @update-message="handleUpdate"
      @user-change="handleUserChange"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ChildComponent from './ChildComponent.vue';

const parentMessage = ref('Hello from parent');
const user = ref({ name: 'John', age: 25 });

const handleUpdate = (newMessage) => {
  parentMessage.value = newMessage;
};

const handleUserChange = (newUser) => {
  user.value = newUser;
};
</script>

<!-- 子组件 -->
<template>
  <div>
    <p>{{ message }}</p>
    <p>{{ user.name }} - {{ user.age }}</p>
    <button @click="updateParent">更新父组件</button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  message: {
    type: String,
    required: true
  },
  user: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['update-message', 'user-change']);

const updateParent = () => {
  emit('update-message', 'Updated from child');
  emit('user-change', { name: 'Jane', age: 30 });
};
</script>
```

**2. Provide / Inject**

```vue
<!-- 祖先组件 -->
<template>
  <div>
    <child-component />
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import ChildComponent from './ChildComponent.vue';

const theme = ref('light');
const user = ref({ name: 'John', role: 'admin' });

// 提供数据
provide('theme', theme);
provide('user', user);
provide('updateTheme', (newTheme) => {
  theme.value = newTheme;
});
</script>

<!-- 后代组件 -->
<template>
  <div :class="theme">
    <p>当前主题: {{ theme }}</p>
    <p>用户: {{ user.name }}</p>
    <button @click="toggleTheme">切换主题</button>
  </div>
</template>

<script setup>
import { inject } from 'vue';

// 注入数据
const theme = inject('theme');
const user = inject('user');
const updateTheme = inject('updateTheme');

const toggleTheme = () => {
  updateTheme(theme.value === 'light' ? 'dark' : 'light');
};
</script>
```

**3. 事件总线（使用 mitt）**

```javascript
// eventBus.js
import mitt from 'mitt';
export const eventBus = mitt();

// 组件A
<script setup>
import { eventBus } from './eventBus';

const sendMessage = () => {
  eventBus.emit('custom-event', 'Hello from A');
};
</script>

// 组件B
<script setup>
import { eventBus } from './eventBus';
import { onMounted, onUnmounted } from 'vue';

const handleEvent = (data) => {
  console.log('收到事件:', data);
};

onMounted(() => {
  eventBus.on('custom-event', handleEvent);
});

onUnmounted(() => {
  eventBus.off('custom-event', handleEvent);
});
</script>
```

**4. Pinia（状态管理）**

```javascript
// stores/counter.js
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    name: 'Counter'
  }),
  
  getters: {
    doubleCount: (state) => state.count * 2,
    isEven: (state) => state.count % 2 === 0
  },
  
  actions: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
    async fetchCount() {
      const response = await api.getCount();
      this.count = response.data;
    }
  }
});

// 在组件中使用
<script setup>
import { useCounterStore } from '@/stores/counter';

const counter = useCounterStore();

// 访问状态
console.log(counter.count);
console.log(counter.doubleCount);

// 调用 action
const increment = () => counter.increment();
</script>
```

## 5. 模板语法改进

### 问题：Vue3 的模板语法有哪些改进？

**答案：**

**1. v-model 改进**

```vue
<template>
  <!-- 基本用法 -->
  <input v-model="message" />
  
  <!-- 自定义组件双向绑定 -->
  <custom-input v-model="searchText" />
  
  <!-- 多个 v-model -->
  <user-form 
    v-model:name="user.name"
    v-model:email="user.email"
    v-model:age="user.age"
  />
  
  <!-- 修饰符 -->
  <input v-model.trim="message" />
  <input v-model.number="age" />
  <input v-model.lazy="message" />
</template>

<script setup>
import { ref } from 'vue';

const message = ref('');
const searchText = ref('');
const user = ref({
  name: '',
  email: '',
  age: 0
});
</script>
```

**2. 自定义组件 v-model**

```vue
<!-- CustomInput.vue -->
<template>
  <input 
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    required: true
  }
});

defineEmits(['update:modelValue']);
</script>

<!-- 使用 -->
<template>
  <custom-input v-model="message" />
</template>
```

**3. 多个 v-model**

```vue
<!-- UserForm.vue -->
<template>
  <div>
    <input 
      :value="name"
      @input="$emit('update:name', $event.target.value)"
    />
    <input 
      :value="email"
      @input="$emit('update:email', $event.target.value)"
    />
    <input 
      :value="age"
      @input="$emit('update:age', Number($event.target.value))"
    />
  </div>
</template>

<script setup>
defineProps({
  name: String,
  email: String,
  age: Number
});

defineEmits(['update:name', 'update:email', 'update:age']);
</script>
```

**4. 新的指令**

```vue
<template>
  <!-- v-memo - 缓存模板 -->
  <div v-memo="[user.id, user.name]">
    <h2>{{ user.name }}</h2>
    <p>{{ user.email }}</p>
  </div>
  
  <!-- v-once - 一次性渲染 -->
  <div v-once>
    <h1>{{ staticTitle }}</h1>
  </div>
</template>
```

## 6. TypeScript 支持

### 问题：Vue3 如何更好地支持 TypeScript？

**答案：**

**1. 类型定义**

```typescript
// types/user.ts
export interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

// 组件中使用
<script setup lang="ts">
import { ref, computed } from 'vue';
import type { User, ApiResponse } from '@/types/user';

// 类型化的响应式数据
const user = ref<User>({
  id: 1,
  name: 'John',
  email: 'john@example.com'
});

// 类型化的计算属性
const displayName = computed(() => `${user.value.name} (${user.value.age || 'N/A'})`);

// 类型化的方法
const updateUser = (newUser: Partial<User>) => {
  Object.assign(user.value, newUser);
};

// 类型化的异步方法
const fetchUser = async (id: number): Promise<User> => {
  const response = await fetch(`/api/users/${id}`);
  const result: ApiResponse<User> = await response.json();
  return result.data;
};
</script>
```

**2. Props 类型定义**

```vue
<script setup lang="ts">
interface Props {
  title: string;
  count?: number;
  items: string[];
  user: {
    name: string;
    age: number;
  };
  onUpdate?: (value: string) => void;
}

// 使用 withDefaults 提供默认值
const props = withDefaults(defineProps<Props>(), {
  count: 0,
  items: () => []
});

// 类型化的 emits
interface Emits {
  (e: 'update', value: string): void;
  (e: 'delete', id: number): void;
}

const emit = defineEmits<Emits>();

const handleUpdate = (value: string) => {
  emit('update', value);
};
</script>
```

**3. 组合函数类型**

```typescript
// composables/useCounter.ts
import { ref, computed, Ref } from 'vue';

interface CounterOptions {
  initialValue?: number;
  min?: number;
  max?: number;
}

interface CounterReturn {
  count: Ref<number>;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  isMin: Ref<boolean>;
  isMax: Ref<boolean>;
}

export function useCounter(options: CounterOptions = {}): CounterReturn {
  const { initialValue = 0, min = -Infinity, max = Infinity } = options;
  
  const count = ref(initialValue);
  
  const increment = () => {
    if (count.value < max) {
      count.value++;
    }
  };
  
  const decrement = () => {
    if (count.value > min) {
      count.value--;
    }
  };
  
  const reset = () => {
    count.value = initialValue;
  };
  
  const isMin = computed(() => count.value === min);
  const isMax = computed(() => count.value === max);
  
  return {
    count,
    increment,
    decrement,
    reset,
    isMin,
    isMax
  };
}
```

**4. 泛型组件**

```vue
<!-- GenericList.vue -->
<template>
  <div>
    <ul>
      <li v-for="item in items" :key="getKey(item)">
        <slot :item="item" :index="index">
          {{ item }}
        </slot>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts" generic="T, K extends keyof T">
interface Props<T, K extends keyof T> {
  items: T[];
  keyField?: K;
}

const props = withDefaults(defineProps<Props<T, K>>(), {
  keyField: undefined
});

const getKey = (item: T): string | number => {
  if (props.keyField) {
    return item[props.keyField] as string | number;
  }
  return JSON.stringify(item);
};
</script>

<!-- 使用 -->
<template>
  <generic-list :items="users" key-field="id">
    <template #default="{ item }">
      <span>{{ item.name }} - {{ item.email }}</span>
    </template>
  </generic-list>
</template>
```

## 7. 性能优化

### 问题：Vue3 中有哪些性能优化特性？

**答案：**

**1. 编译时优化**

```vue
<!-- Vue3 会自动优化静态内容 -->
<template>
  <div>
    <!-- 静态内容会被提升 -->
    <h1>Vue3 性能优化</h1>
    <p>这是一个静态段落</p>
    
    <!-- 动态内容 -->
    <p>{{ dynamicContent }}</p>
  </div>
</template>
```

**2. 响应式优化**

```javascript
<script setup>
import { ref, shallowRef, readonly } from 'vue';

// 普通 ref - 深度响应式
const deepData = ref({
  user: { name: 'John', age: 25 }
});

// shallowRef - 浅层响应式
const shallowData = shallowRef({
  user: { name: 'John', age: 25 }
});

// readonly - 只读响应式
const readOnlyData = readonly({
  config: { theme: 'dark' }
});

// 使用 markRaw 标记非响应式对象
import { markRaw } from 'vue';

const staticConfig = markRaw({
  apiUrl: 'https://api.example.com',
  version: '1.0.0'
});
</script>
```

**3. 组件优化**

```vue
<!-- 使用 defineAsyncComponent 懒加载 -->
<script setup>
import { defineAsyncComponent } from 'vue';

const HeavyComponent = defineAsyncComponent({
  loader: () => import('./HeavyComponent.vue'),
  loadingComponent: LoadingSpinner,
  errorComponent: ErrorComponent,
  delay: 200,
  timeout: 3000
});
</script>

<!-- 使用 v-memo 缓存模板 -->
<template>
  <div v-memo="[user.id, user.name]">
    <h2>{{ user.name }}</h2>
    <p>{{ user.email }}</p>
  </div>
</template>
```

**4. 虚拟列表优化**

```vue
<!-- VirtualList.vue -->
<template>
  <div class="virtual-list" ref="container">
    <div :style="{ height: totalHeight + 'px' }">
      <div 
        v-for="item in visibleItems" 
        :key="item.id"
        :style="{ transform: `translateY(${item.offset}px)` }"
      >
        <slot :item="item.data" :index="item.index">
          {{ item.data }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

interface Props {
  items: any[];
  itemHeight: number;
  containerHeight: number;
}

const props = defineProps<Props>();

const container = ref<HTMLElement>();
const scrollTop = ref(0);

const totalHeight = computed(() => props.items.length * props.itemHeight);

const visibleItems = computed(() => {
  const start = Math.floor(scrollTop.value / props.itemHeight);
  const end = Math.min(
    start + Math.ceil(props.containerHeight / props.itemHeight) + 1,
    props.items.length
  );
  
  return props.items.slice(start, end).map((item, index) => ({
    data: item,
    index: start + index,
    offset: (start + index) * props.itemHeight
  }));
});

const handleScroll = () => {
  if (container.value) {
    scrollTop.value = container.value.scrollTop;
  }
};

onMounted(() => {
  container.value?.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  container.value?.removeEventListener('scroll', handleScroll);
});
</script>
```

## 8. 错误处理

### 问题：Vue3 中如何优雅地处理错误？

**答案：**

**1. 全局错误处理**

```javascript
// main.ts
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

// 全局错误处理器
app.config.errorHandler = (err, instance, info) => {
  console.error('Vue 错误:', err);
  console.error('错误信息:', info);
  
  // 发送错误到服务器
  errorReporter.captureException(err, {
    component: instance?.$options.name,
    info: info
  });
};

// 警告处理器
app.config.warnHandler = (msg, instance, trace) => {
  console.warn('Vue 警告:', msg);
  console.warn('组件栈:', trace);
};

app.mount('#app');
```

**2. 错误边界组件**

```vue
<!-- ErrorBoundary.vue -->
<template>
  <div>
    <div v-if="error" class="error-boundary">
      <h2>出错了！</h2>
      <p>{{ error.message }}</p>
      <button @click="resetError">重试</button>
    </div>
    <slot v-else />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface ErrorInfo {
  message: string;
  stack?: string;
}

const error = ref<ErrorInfo | null>(null);

const resetError = () => {
  error.value = null;
};

// 错误捕获
const handleError = (err: Error, info: string) => {
  error.value = {
    message: err.message,
    stack: err.stack
  };
  
  console.error('组件错误:', err);
  console.error('错误信息:', info);
  
  return false; // 阻止错误继续传播
};

// 暴露错误处理方法
defineExpose({
  handleError
});
</script>
```

**3. 异步错误处理**

```vue
<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue';

const data = ref(null);
const loading = ref(false);
const error = ref<Error | null>(null);

// 错误捕获
onErrorCaptured((err, instance, info) => {
  error.value = err;
  console.error('捕获到错误:', err);
  return false;
});

const fetchData = async () => {
  try {
    loading.value = true;
    error.value = null;
    
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    data.value = await response.json();
  } catch (err) {
    error.value = err as Error;
    console.error('请求失败:', err);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div>
    <div v-if="loading">加载中...</div>
    <div v-else-if="error" class="error">
      <p>加载失败: {{ error.message }}</p>
      <button @click="fetchData">重试</button>
    </div>
    <div v-else>
      <pre>{{ data }}</pre>
    </div>
  </div>
</template>
```

**4. 自定义错误类**

```typescript
// utils/errors.ts
export class ValidationError extends Error {
  constructor(message: string, public field: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class NetworkError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
    this.name = 'NetworkError';
  }
}

export class BusinessError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'BusinessError';
  }
}

// 在组件中使用
<script setup lang="ts">
import { ValidationError, NetworkError, BusinessError } from '@/utils/errors';

const validateForm = (form: any) => {
  if (!form.name) {
    throw new ValidationError('姓名不能为空', 'name');
  }
  if (!form.email) {
    throw new ValidationError('邮箱不能为空', 'email');
  }
};

const submitForm = async (form: any) => {
  try {
    validateForm(form);
    
    const response = await api.submitForm(form);
    
    if (!response.success) {
      throw new BusinessError(response.message, response.code);
    }
    
    return response.data;
  } catch (err) {
    if (err instanceof ValidationError) {
      console.error(`验证错误 - ${err.field}:`, err.message);
    } else if (err instanceof NetworkError) {
      console.error('网络错误:', err.message);
    } else if (err instanceof BusinessError) {
      console.error('业务错误:', err.message);
    } else {
      console.error('未知错误:', err);
    }
    throw err;
  }
};
</script>
```

## 9. 测试

### 问题：如何测试 Vue3 组件？

**答案：**

**1. 单元测试**

```typescript
// Counter.test.ts
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Counter from './Counter.vue';

describe('Counter', () => {
  it('renders correctly', () => {
    const wrapper = mount(Counter);
    expect(wrapper.find('h1').text()).toBe('Counter');
    expect(wrapper.find('.count').text()).toBe('0');
  });

  it('increments count when button is clicked', async () => {
    const wrapper = mount(Counter);
    
    await wrapper.find('button').trigger('click');
    
    expect(wrapper.find('.count').text()).toBe('1');
  });

  it('emits increment event', async () => {
    const wrapper = mount(Counter);
    
    await wrapper.find('button').trigger('click');
    
    expect(wrapper.emitted('increment')).toBeTruthy();
    expect(wrapper.emitted('increment')?.[0]).toEqual([1]);
  });
});
```

**2. 组合函数测试**

```typescript
// useCounter.test.ts
import { describe, it, expect } from 'vitest';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('initializes with default value', () => {
    const { count } = useCounter();
    expect(count.value).toBe(0);
  });

  it('initializes with custom value', () => {
    const { count } = useCounter({ initialValue: 10 });
    expect(count.value).toBe(10);
  });

  it('increments count', () => {
    const { count, increment } = useCounter();
    
    increment();
    
    expect(count.value).toBe(1);
  });

  it('decrements count', () => {
    const { count, decrement } = useCounter({ initialValue: 5 });
    
    decrement();
    
    expect(count.value).toBe(4);
  });

  it('respects min and max bounds', () => {
    const { count, increment, decrement } = useCounter({
      initialValue: 0,
      min: 0,
      max: 5
    });
    
    // 尝试减到最小值以下
    decrement();
    expect(count.value).toBe(0);
    
    // 尝试加到最大值以上
    for (let i = 0; i < 10; i++) {
      increment();
    }
    expect(count.value).toBe(5);
  });
});
```

**3. 集成测试**

```typescript
// UserForm.test.ts
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import UserForm from './UserForm.vue';

describe('UserForm', () => {
  it('submits form with user data', async () => {
    const mockSubmit = vi.fn();
    const wrapper = mount(UserForm, {
      props: {
        onSubmit: mockSubmit
      }
    });

    // 填写表单
    await wrapper.find('input[name="name"]').setValue('John Doe');
    await wrapper.find('input[name="email"]').setValue('john@example.com');
    await wrapper.find('input[name="age"]').setValue('25');

    // 提交表单
    await wrapper.find('form').trigger('submit');

    expect(mockSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      age: 25
    });
  });

  it('validates required fields', async () => {
    const wrapper = mount(UserForm);

    // 尝试提交空表单
    await wrapper.find('form').trigger('submit');

    expect(wrapper.find('.error').text()).toContain('姓名不能为空');
  });
});
```

**4. E2E 测试**

```typescript
// cypress/e2e/user-management.cy.ts
describe('User Management', () => {
  beforeEach(() => {
    cy.visit('/users');
  });

  it('creates a new user', () => {
    cy.get('[data-testid="add-user-btn"]').click();
    
    cy.get('[data-testid="name-input"]').type('John Doe');
    cy.get('[data-testid="email-input"]').type('john@example.com');
    cy.get('[data-testid="age-input"]').type('25');
    
    cy.get('[data-testid="submit-btn"]').click();
    
    cy.get('[data-testid="user-list"]')
      .should('contain', 'John Doe')
      .and('contain', 'john@example.com');
  });

  it('edits an existing user', () => {
    cy.get('[data-testid="edit-user-btn"]').first().click();
    
    cy.get('[data-testid="name-input"]').clear().type('Jane Doe');
    cy.get('[data-testid="submit-btn"]').click();
    
    cy.get('[data-testid="user-list"]').should('contain', 'Jane Doe');
  });

  it('deletes a user', () => {
    const userName = 'Test User';
    
    cy.get('[data-testid="user-list"]').should('contain', userName);
    cy.get('[data-testid="delete-user-btn"]').first().click();
    cy.get('[data-testid="confirm-delete-btn"]').click();
    
    cy.get('[data-testid="user-list"]').should('not.contain', userName);
  });
});
```

## 10. 最佳实践

### 问题：Vue3 开发中有哪些最佳实践？

**答案：**

**1. 组件设计原则**

```vue
<!-- 单一职责原则 -->
<!-- UserCard.vue - 只负责显示用户信息 -->
<template>
  <div class="user-card">
    <img :src="user.avatar" :alt="user.name" />
    <h3>{{ user.name }}</h3>
    <p>{{ user.email }}</p>
  </div>
</template>

<script setup lang="ts">
interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

defineProps<{
  user: User;
}>();
</script>

<!-- UserList.vue - 只负责列表逻辑 -->
<template>
  <div class="user-list">
    <user-card 
      v-for="user in users" 
      :key="user.id" 
      :user="user"
      @click="selectUser(user)"
    />
  </div>
</template>

<script setup lang="ts">
import UserCard from './UserCard.vue';
import { useUsers } from '@/composables/useUsers';

const { users, selectUser } = useUsers();
</script>
```

**2. 组合函数设计**

```typescript
// composables/useApi.ts
import { ref, computed } from 'vue';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useApi<T>(url: string) {
  const state = ref<ApiState<T>>({
    data: null,
    loading: false,
    error: null
  });

  const fetchData = async () => {
    state.value.loading = true;
    state.value.error = null;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      state.value.data = await response.json();
    } catch (err) {
      state.value.error = err as Error;
    } finally {
      state.value.loading = false;
    }
  };

  const refetch = () => {
    fetchData();
  };

  return {
    ...state.value,
    fetchData,
    refetch
  };
}

// 使用
<script setup lang="ts">
import { useApi } from '@/composables/useApi';

const { data: users, loading, error, fetchData } = useApi<User[]>('/api/users');

// 组件挂载时获取数据
onMounted(() => {
  fetchData();
});
</script>
```

**3. 类型安全**

```typescript
// 严格类型定义
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
  createdAt: Date;
}

interface CreateUserRequest {
  name: string;
  email: string;
  age?: number;
}

interface UpdateUserRequest extends Partial<CreateUserRequest> {
  id: number;
}

// 类型化的 API 调用
const api = {
  async getUsers(): Promise<User[]> {
    const response = await fetch('/api/users');
    return response.json();
  },

  async createUser(user: CreateUserRequest): Promise<User> {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    return response.json();
  },

  async updateUser(user: UpdateUserRequest): Promise<User> {
    const response = await fetch(`/api/users/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    return response.json();
  }
};
```

**4. 错误处理策略**

```typescript
// utils/errorHandler.ts
export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const errorHandler = {
  handle(error: unknown): void {
    if (error instanceof AppError) {
      console.error(`[${error.code}] ${error.message}`);
      // 显示用户友好的错误消息
      showNotification(error.message, 'error');
    } else if (error instanceof Error) {
      console.error('Unexpected error:', error.message);
      showNotification('发生未知错误', 'error');
    } else {
      console.error('Unknown error:', error);
      showNotification('发生未知错误', 'error');
    }
  },

  async wrap<T>(promise: Promise<T>): Promise<T> {
    try {
      return await promise;
    } catch (error) {
      this.handle(error);
      throw error;
    }
  }
};

// 在组件中使用
<script setup lang="ts">
import { errorHandler } from '@/utils/errorHandler';

const handleSubmit = async () => {
  await errorHandler.wrap(
    api.createUser(formData)
  );
};
</script>
```

**5. 性能优化实践**

```vue
<!-- 使用 v-memo 优化渲染 -->
<template>
  <div>
    <div v-memo="[user.id, user.name]">
      <h2>{{ user.name }}</h2>
      <p>{{ user.email }}</p>
    </div>
  </div>
</template>

<!-- 使用 shallowRef 优化大数据 -->
<script setup lang="ts">
import { shallowRef } from 'vue';

// 对于不会深层变化的大数据，使用 shallowRef
const largeData = shallowRef({
  items: Array.from({ length: 10000 }, (_, i) => ({ id: i, name: `Item ${i}` }))
});
</script>

<!-- 使用 defineAsyncComponent 懒加载 -->
<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const HeavyComponent = defineAsyncComponent({
  loader: () => import('./HeavyComponent.vue'),
  loadingComponent: LoadingSpinner,
  errorComponent: ErrorComponent,
  delay: 200,
  timeout: 3000
});
</script>
``` 