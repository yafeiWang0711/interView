import { useImperativeHandle, forwardRef, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './sider.less';
import headerMenuItemsI from '@/menu/menu';
import type { MenuItem } from '@/types/interface';

const Sider = forwardRef((props, ref) => {
  // 侧边栏菜单项配置
  const [menuItems, setMenuItems] = useState<Array<MenuItem>>([])
  useImperativeHandle(ref, () => ({
    siderChange: (key: string) => {
      const item = headerMenuItemsI.find((item: MenuItem) => item.key === key);
      setMenuItems(item?.children || [])
      localStorage.setItem('layoutSiderActiveKey', item?.children?.[0].path || '')
      autohandleSiderChange()
    },
    // setMenuItems: (items: Array<MenuItem>) => setMenuItems(items)
  }))

  useEffect(() => {
    autohandleSiderChange()
  }, [])
  const navigate = useNavigate();

  // 自动处理侧边栏激活项
  // 初始化时自动点击第一个菜单项，并设置本地存储的激活状态
  const autohandleSiderChange = () => {
    const siderPath: string | null = localStorage.getItem('layoutSiderActiveKey');
    const siderPathGo = siderPath ? siderPath : headerMenuItemsI[0].path;
    localStorage.setItem('layoutSiderActiveKey', siderPathGo);
    navigate(siderPathGo);
  }


  return (
    <div className='sider'>
      <h1>侧边菜单组件</h1>
      <nav className='sidebar-nav'>
        {menuItems.map(item => (

          <NavLink
            key={item.key}
            to={item.path}
            onClick={() => localStorage.setItem('layoutSiderActiveKey', item.path)}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
})

export default Sider;