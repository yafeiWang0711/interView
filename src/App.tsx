import React from 'react';
import { useNavigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Button } from 'antd';

import Base from '@/study/funcC/base';
import MyCC from '@/study/classC';
import LifeCycle from '@/study/classC/lifeCycle';
import Parents from '@/study/funcC/parents';
import ReduxDemo from '@/study/redux';
import UseEffectF from '@/study/hooksS/useEffect';
import UseMemoF from '@/study/hooksS/useMemoF';
import UseStateF from '@/study/hooksS/useStateF';
import UseCallbackF from '@/study/hooksS/useCallbackF';

import './App.css';

function App() {
  // 使用useNavigate钩子的组件必须在Router组件内部
  const NavButton = ({ path, text }: { path: string; text: string }) => {
    const navigate = useNavigate();
    return (
      <Button onClick={() => navigate(path)}>
        {text}
      </Button>
    );
  };

  return (
    <div>
      <Router>
        {/* 路由配置 */}
        <div>
          <h1>React 学习</h1>
          {/* 点击按钮跳转路由 */}
          <NavButton path="/" text="点击跳转首页" />
          <NavButton path="/classC" text="点击跳转类组件" />
          <NavButton path="/lifeCycle" text="点击跳转生命周期" />
          <NavButton path="/parents" text="点击跳转父子组件通信" />
          <NavButton path="/redux" text="点击跳转Redux" />
          <NavButton path="/useEffect" text="点击跳转useEffect" />
          <NavButton path="/useState" text="点击跳转useState" />
          <NavButton path="/useMemo" text="点击跳转useMemo" />
          <NavButton path="/useCallback" text="点击跳转useCallback" />
        </div>
        <Routes>
          {/* 将所有路由都嵌套在Layout下 */}
          <Route path="/" element={<Base name="yfw" age={18} sex='男' />} />
          <Route path="/classC" element={<MyCC name="yfw" age={18} sex='男' />} />
          <Route path="/lifeCycle" element={<LifeCycle name="yfw" age={18} sex='男' />} />
          <Route path="/parents" element={<Parents />} />
          <Route path="/redux" element={<ReduxDemo />} />
          <Route path="/useEffect" element={<UseEffectF />} />
          <Route path="/useMemo" element={<UseMemoF />} />
          <Route path="/useState" element={<UseStateF />} />
          <Route path="/useCallback" element={<UseCallbackF />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
