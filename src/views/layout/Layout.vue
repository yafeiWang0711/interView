 <template>
  <el-container style="height: 100vh;">
    <el-header height="60px" class="header">
      <div class="header-inner">
        <span class="logo">
          <svg viewBox="0 0 32 32" width="32" height="32" style="vertical-align: middle;"><circle cx="16" cy="16" r="16" fill="#fff"/><path d="M8 20v-2l8-5 8 5v2l-8-5-8 5z" fill="#0984e3"/><rect x="14" y="22" width="4" height="2" rx="1" fill="#0984e3"/></svg>
        </span>
        <el-menu mode="horizontal" :default-active="activeTopMenu" @select="handleTopMenu" class="custom-top-menu" style="flex:1;">
          <el-menu-item index="七年级上">七年级上</el-menu-item>
          <el-menu-item index="七年级下">七年级下</el-menu-item>
        </el-menu>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">
        <el-menu :default-active="activeSideMenu" :default-openeds="['第一章']" @select="handleSideMenu" class="custom-side-menu">
          <el-sub-menu index="第一章">
            <template #title>第一章  有理数</template>
            <el-menu-item
              v-for="section in currentSections"
              :key="section.key"
              :index="section.key"
            >
              {{ section.label }}
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useMenuStore } from '@/store/index'
import { useRouter, useRoute } from 'vue-router'
const menuStore = useMenuStore()
const router = useRouter()
const route = useRoute()

// 动态菜单数据
const menuMap = {
  '七年级上': [
    { key: 'grade7up/chapter1/section1', label: '1.1 正数和负数' },
    { key: 'grade7up/chapter1/section2', label: '1.2 有理数及其大小比较' }
  ],
  '七年级下': [
    { key: 'grade7down/chapter1/section1', label: '第一小节' },
    { key: 'grade7down/chapter1/section2', label: '第二小节' }
  ]
}

// 顶部菜单高亮
const activeTopMenu = ref(menuStore.topMenu)
const currentSections = computed(() => menuMap[activeTopMenu.value])

// 侧边菜单高亮
const activeSideMenu = ref('')

// 路由变化时自动高亮
watch(
  () => route.path,
  (newPath) => {
    // 侧边菜单高亮
    const found = Object.values(menuMap).flat().find(item => newPath.includes(item.key))
    activeSideMenu.value = found ? found.key : ''
    // 顶部菜单高亮
    if (newPath.includes('grade7up')) {
      activeTopMenu.value = '七年级上'
      menuStore.setTopMenu('七年级上')
    } else if (newPath.includes('grade7down')) {
      activeTopMenu.value = '七年级下'
      menuStore.setTopMenu('七年级下')
    }
  },
  { immediate: true }
)

function handleTopMenu(menu) {
  activeTopMenu.value = menu
  menuStore.setTopMenu(menu)
  // 跳转到对应第一个小节
  if (menu === '七年级上') {
    router.push('/grade7up/chapter1/section1')
  } else if (menu === '七年级下') {
    router.push('/grade7down/chapter1/section1')
  }
}

function handleSideMenu(sectionKey) {
  router.push('/' + sectionKey)
}
</script>

<style scoped>
.header {
  background: #0984e3;
  color: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  padding: 0;
}
.header-inner {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0;
}
.logo {
  display: flex;
  align-items: center;
  margin-right: 8px;
  margin-left: 0;
  height: 100%;
}
.custom-top-menu {
  flex: 1;
  border-bottom: none;
  background: transparent;
  margin-left: 0;
}
.custom-top-menu >>> .el-menu-item {
  margin: 0;
}
/* 顶部菜单高亮背景 */
.custom-top-menu >>> .el-menu-item.is-active {
  background: #0984e3 !important;
  color: #fff !important;
  border-radius: 8px 8px 0 0;
  font-weight: bold;
}

/* 侧边菜单高亮背景 */
.custom-side-menu >>> .el-menu-item.is-active {
  background: #0984e3 !important;
  color: #fff !important;
  border-radius: 6px;
  font-weight: bold;
}
.aside {
  background: #fff;
  border-right: 1px solid #eee;
}
.main {
  background: #f5f6fa;
  padding: 24px;
  height: calc(100vh - 60px); /* 高度为屏幕高度减去顶部菜单高度 */
  overflow: auto; /* 超出时滚动 */
}
</style> 