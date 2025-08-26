import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/demos'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/Login.vue')
  },
    {
    path: '/pinia',
    name: 'pinia',
    component: () => import('@/views/pinia/index.vue')
  },
  {
    path: '/bsMian',
    name: 'bsMian',
    component: () => import('@/view_bs/index.vue')
  },

  
  {
    path: '/study',
    name: 'study',
    component: () => import('@/views/study/index.vue')
  },
  // 新增的路由 - 放在layout外部
  {
    path: '/demos',
    name: 'DemoIndex',
    component: () => import('@/views/DemoIndex.vue')
  },
  {
    path: '/vue-demo',
    name: 'VueDemo',
    component: () => import('@/components/ParentChildExample.vue')
  },
  {
    path: '/url-process',
    name: 'UrlProcess',
    component: () => import('@/components/UrlProcessDemo.vue')
  },
    {
    path: '/interSectionObserver',
    name: 'interSectionObserver',
    component: () => import('@/components/interSectionObserver.vue')
  },
      {
    path: '/grid-layout',
    name: 'GridLayout',
    component: () => import('@/components/grid.vue')
  },
  {
    path: '/virtual-list',
    name: 'VirtualList',
    component: () => import('@/components/VirtualList.vue')
  },
  {
    path: '/advanced-virtual-list',
    name: 'AdvancedVirtualList',
    component: () => import('@/components/AdvancedVirtualList.vue')
  },
  {
    path: '/performance-qa',
    name: 'PerformanceOptimizationQA',
    component: () => import('@/components/PerformanceOptimizationQA.vue')
  },
  // 新增Vue内部原理解析路由
  {
    path: '/vue-internals',
    name: 'VueInternalsExplained',
    component: () => import('@/components/VueInternalsExplained.vue')
  },
  {
    path: '/reactivity',
    name: 'ReactivityDemo',
    component: () => import('@/components/ReactivityDemo.vue')
  },
  {
    path: '/performance',
    name: 'PerformanceDemo',
    component: () => import('@/components/PerformanceDemo.vue')
  },
  // {
  //   path: '/',
  //   component: () => import('@/views/layout/Layout.vue'),
  //   meta: { requiresAuth: true },
  //   children: [
  //     {
  //       path: '',
  //       name: 'HomeRedirect',
  //       redirect: '/grade7up/chapter1/section1'
  //     },
  //     {
  //       path: 'grade7up/chapter1/section1',
  //       name: 'Grade7UpChapter1Section1',
  //       component: () => import('@/views/grade7up/Chapter1Section1.vue')
  //     },
  //     {
  //       path: 'grade7up/chapter1/section2',
  //       name: 'Grade7UpChapter1Section2',
  //       component: () => import('@/views/grade7up/Chapter1Section2.vue')
  //     },
  //     {
  //       path: 'grade7down/chapter1/section1',
  //       name: 'Grade7DownChapter1Section1',
  //       component: () => import('@/views/grade7down/Chapter1Section1.vue')
  //     },
  //     {
  //       path: 'grade7down/chapter1/section2',
  //       name: 'Grade7DownChapter1Section2',
  //       component: () => import('@/views/grade7down/Chapter1Section2.vue')
  //     }
  //   ]
  // },
  {
    path: '/test',
    name: 'Test',
    component: () => import('@/views/Test.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router