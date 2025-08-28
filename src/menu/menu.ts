import type { MenuItem } from '@/types/interface';

const menuItems: MenuItem[] = [
  {
    key: 'home',
    label: '系统首页',
    path: '/sys/home'
  },
  {
    key: 'dashboard',
    label: '数据看板',  
    path: '/sys/dashboard'
  },
  {
    key: 'users',
    label: '用户管理',
    path: '/sys/users'
  },
  {
    key: 'settings',
    label: '系统设置',
    path: '/sys/settings'
  },
  {
    key: 'reports',
    label: '报表分析',
    path: '/sys/reports'
  },
]

const menuItemsI: MenuItem[] = [
  {
    key: 'home',
    label: '系统首页',
    path: '/sys/home'
  },
  {
    key: 'dashboard',
    label: '数据看板',  
    path: '/sys/dashboard'
  },
]
const headerMenuItemsI: MenuItem[] = [
  {
    key: 'module1',
    label: '模块1',
    path: '/sys/home',
    children: menuItems
  },
    {
    key: 'module2',
    label: '模块2',
    path: '/sys/home',
    children: menuItemsI
  },
]

export default headerMenuItemsI;