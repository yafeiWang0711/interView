<template>
  <div class="demo-index">
    <h1>前端知识演示导航</h1>

    <div class="demo-grid">
      <!-- Vue3 父子组件传值演示 -->
      <div class="demo-card">
        <h3>Vue3 父子组件传值</h3>
        <p>演示Vue3中父子组件之间的数据传递和方法调用</p>
        <div class="demo-features">
          <span class="feature">Props传值</span>
          <span class="feature">Emit事件</span>
          <span class="feature">Ref调用</span>
          <span class="feature">Provide/Inject</span>
        </div>
        <router-link to="/vue-demo" class="demo-link"> 查看演示 </router-link>
      </div>
      <!-- pinia -->
      <div class="demo-card">
        <h3>Vue3 pinia状态管理演示</h3>
        <p>演示Vue3中pinia状态管理的使用</p>
        <div class="demo-features">
          <span class="feature">状态管理</span>
          <span class="feature"> actions</span>
          <span class="feature">getters</span>
          <span class="feature">插件</span>
          <span class="feature">模块</span>
          <span class="feature">持久化</span>
          <span class="feature">热更新</span>
        </div>
        <router-link to="/pinia" class="demo-link"> 查看演示 </router-link>
      </div>
      <!-- 浏览器URL过程演示 -->
      <div class="demo-card">
        <h3>浏览器输入URL过程</h3>
        <p>详细展示浏览器从输入URL到页面渲染的完整过程</p>
        <div class="demo-features">
          <span class="feature">DNS解析</span>
          <span class="feature">TCP连接</span>
          <span class="feature">HTTP请求</span>
          <span class="feature">页面渲染</span>
        </div>
        <router-link to="/url-process" class="demo-link">
          查看演示
        </router-link>
      </div>

      <!-- 虚拟列表演示 -->
      <div class="demo-card">
        <h3>虚拟列表实现</h3>
        <p>手写虚拟列表，支持大量数据的高性能渲染</p>
        <div class="demo-features">
          <span class="feature">固定高度</span>
          <span class="feature">动态高度</span>
          <span class="feature">性能优化</span>
          <span class="feature">缓冲区</span>
        </div>
        <router-link to="/virtual-list" class="demo-link">
          查看演示
        </router-link>
      </div>

      <!-- 高级虚拟列表演示 -->
      <div class="demo-card">
        <h3>高级虚拟列表</h3>
        <p>支持动态高度的虚拟列表，使用二分查找优化性能</p>
        <div class="demo-features">
          <span class="feature">动态高度</span>
          <span class="feature">二分查找</span>
          <span class="feature">高度缓存</span>
          <span class="feature">精确计算</span>
        </div>
        <router-link to="/advanced-virtual-list" class="demo-link">
          查看演示
        </router-link>
      </div>

      <!-- 前端性能优化问答 -->
      <div class="demo-card">
        <h3>前端性能优化问答</h3>
        <p>关于前端性能优化的常见问题及详细解答</p>
        <div class="demo-features">
          <span class="feature">加载优化</span>
          <span class="feature">渲染优化</span>
          <span class="feature">资源优化</span>
          <span class="feature">性能分析</span>
        </div>
        <router-link to="/performance-qa" class="demo-link">
          查看演示
        </router-link>
      </div>

      <!-- 新增Vue内部原理解析导航卡片 -->
      <div class="demo-card">
        <h3>Vue内部原理解析</h3>
        <p>深入解析Vue v-model、响应式原理及浏览器回流重绘机制</p>
        <div class="demo-features">
          <span class="feature">v-model源码</span>
          <span class="feature">响应式原理</span>
          <span class="feature">回流重绘</span>
          <span class="feature">性能优化</span>
        </div>
        <router-link to="/vue-internals" class="demo-link">
          查看演示
        </router-link>
      </div>
    </div>

    <!-- 快速导航 -->
    <div class="quick-nav">
      <h3>快速导航</h3>
      <div class="nav-links">
        <router-link to="/vue-demo" class="nav-link">Vue3传值演示</router-link>
        <router-link to="/url-process" class="nav-link"
          >URL过程演示</router-link
        >
        <router-link to="/virtual-list" class="nav-link">虚拟列表</router-link>
        <router-link to="/advanced-virtual-list" class="nav-link"
          >高级虚拟列表</router-link
        >
        <router-link to="/test" class="nav-link">综合测试</router-link>
        <router-link to="/performance-qa" class="nav-link"
          >性能优化问答</router-link
        >
        <router-link to="/vue-internals" class="nav-link"
          >Vue内部原理</router-link
        >
        <router-link to="/" class="nav-link">返回主页</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// 组件逻辑
</script>

<style scoped>
.demo-index {
  padding: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.demo-index h1 {
  text-align: center;
  color: #333;
  margin-bottom: 40px;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.demo-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.demo-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.demo-card h3 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.4rem;
}

.demo-card p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
}

.demo-features {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.feature {
  background: #e3f2fd;
  color: #1976d2;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

.demo-link {
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.demo-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.quick-nav {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 25px;
  text-align: center;
}

.quick-nav h3 {
  color: #333;
  margin-bottom: 20px;
}

.nav-links {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
}

.nav-link {
  background: #007bff;
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.nav-link:hover {
  background: #0056b3;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .demo-grid {
    grid-template-columns: 1fr;
  }

  .nav-links {
    flex-direction: column;
    align-items: center;
  }

  .nav-link {
    width: 200px;
    text-align: center;
  }
}
</style>
