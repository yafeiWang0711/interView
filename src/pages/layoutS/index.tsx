import React, { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import HeaderC from './components/headerC';
import SiderC from './components/sider';
import './index.less';
// import headerMenuItemsI from '@/menu/menu';
// import type { MenuItem } from '@/types/interface';


const BaseLayout: React.FC = () => {
  // 定义一个组件，用于展示布局结构


  const siderRef = useRef<{
    siderChange: (key: string) => void;
  }>(null)
  const onHeadMenuChange = (key: string): void => {
    siderRef.current?.siderChange(key)
  }
  return (
    <div className="layout-container">
      <div className="layout-header">
        <HeaderC title="系统布局组件" onHeadMenuChange={onHeadMenuChange} />
      </div>
      <div className="content">
        <div className="sider">
          <SiderC ref={siderRef} />
        </div>
        <div className="main">
          <div className="main-content">
            {/* 使用 Outlet 组件展示当前路由对应的组件 */}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseLayout;
