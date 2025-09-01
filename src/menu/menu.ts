import type { MenuItem } from '@/types/interface';

const menuItems: MenuItem[] = [
  {
    key: 'home',
    label: '系统首页',
    path: '/sys/home'
  },
  
]
const menuItemsJsAndTs: MenuItem[] = [
  {
    key: 'jsAndTsType',
    label: 'jsAndTsType',
    path: '/sys/jsAndTsType'
  },
]
const menuItemsI: MenuItem[] = [
  {
    key: 'useStateC',
    label: 'useStateC钩子函数',
    path: '/sys/useStateC'
  },
  {
    key: 'useEffectC',
    label: 'useEffect钩子函数',
    path: '/sys/useEffectC'
  },
  {
    key: 'useMemoC',
    label: 'useMemo钩子函数',
    path: '/sys/useMemoC'
  },
  {
    key: 'useContextC',
    label: 'useContext钩子函数',
    path: '/sys/useContextC'
  },
  {
    key: 'useCallbackC',
    label: 'useCallback钩子函数',
    path: '/sys/useCallbackC'
  },
  {
    key: 'authButton',
    label: 'authButton权限按钮',
    path: '/sys/authButton'
  },
]
const headerMenuItemsI: MenuItem[] = [
  {
    key: 'jsAndTs',
    label: 'jsAndTs',
    path: '/sys/jsAndTs',
    children: menuItemsJsAndTs
  },
  {
    key: 'hooks',
    label: 'hooks',
    path: '/sys/hooks',
    children: menuItemsI
  },
]

export default headerMenuItemsI;