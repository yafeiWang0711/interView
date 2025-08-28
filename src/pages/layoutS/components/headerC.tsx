import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import './headerC.less'; // 导入 Less 文件
import headerMenuItemsI from '@/menu/menu';
import type { MenuItem } from '@/types/interface';

interface HeaderProps {
  title?: string;
  isActive?: boolean;
  onHeadMenuChange?: (key: string) => void;
}

const HeaderC: React.FC<HeaderProps> = ({
  title = '默认标题',
  onHeadMenuChange,
}) => {
  const [activeKey, setActiveKey] = useState<string>('');
  const headerMenuChange = (key: string) => {
    setActiveKey(key);
    localStorage.setItem('layoutHeadActiveKey', key);
    onHeadMenuChange?.(key);
  }
  const autoClick = (): void => {
    // 初始化时自动点击第一个菜单项，并设置本地存储的激活状态
    const activeKey = localStorage.getItem('layoutHeadActiveKey');
    if (activeKey) {
      headerMenuChange(activeKey);
    } else {
      headerMenuChange(headerMenuItemsI[0].key);
    }
  }
  useEffect(() => {
    autoClick();
  }, [])
  return (
    <div className="header">
      <h1 className="title">{title}</h1>
      <div className="header-content">
        <div className="nav">
          {headerMenuItemsI.map((item: MenuItem) => (
            <div key={item.key} onClick={() => headerMenuChange(item.key)} className={` ${activeKey === item.key ? 'nav-itemChoose' : 'nav-item'}`}>
              {item.label}
            </div>
          ))}
        </div>
      </div>
      <Button className="button" onClick={() => onHeadMenuChange?.('23423')}>
        点击按钮
      </Button>
    </div>
  );
};

export default HeaderC;