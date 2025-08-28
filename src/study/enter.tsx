import React from 'react';
import { Button } from 'antd';
import { useNavigate, Routes, Route } from 'react-router-dom';

import Base from '@/study/funcC/base';
import MyCC from '@/study/classC';
import LifeCycle from '@/study/classC/lifeCycle';
import Parents from '@/study/funcC/parents';
import ReduxDemo from '@/study/redux/index';
import UseEffectF from '@/study/hooksS/useEffect';
import UseMemoF from '@/study/hooksS/useMemoF';
import UseStateF from '@/study/hooksS/useStateF';
import UseCallbackF from '@/study/hooksS/useCallbackF';
import UseContextF from '@/study/hooksS/useContextF';

function Enter() {
  // 使用useNavigate钩子进行导航
  const navigate = useNavigate();

  const goTo = (path: string) => {
    // 使用navigate函数进行页面跳转
    navigate('/study/' + path);
  }
  
  // 返回上一页按钮
  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div>
      <div>
        <Button onClick={handleGoBack}>返回入口</Button>
        <h1>学习中心</h1>
        {/* 点击按钮跳转到各个学习组件 */}
        <Button onClick={() => goTo('classC')}>点击跳转类组件</Button>
        <Button onClick={() => goTo('lifeCycle')}>点击跳转生命周期</Button>
        <Button onClick={() => goTo('parents')}>点击跳转父子组件通信</Button>
        <Button onClick={() => goTo('redux')}>点击跳转Redux</Button>
        <Button onClick={() => goTo('useEffect')}>点击跳转useEffect</Button>
        <Button onClick={() => goTo('useState')}>点击跳转useState</Button>
        <Button onClick={() => goTo('useMemo')}>点击跳转useMemo</Button>
        <Button onClick={() => goTo('useCallback')}>点击跳转useCallback</Button>
        <Button onClick={() => goTo('useContext')}>点击跳转useContext</Button>
      </div>
      
      {/* 主内容区域 */}
      <Routes>
        {/* 学习中心首页内容 */}
        <Route path="" element={<Base name="yfw" age={18} sex='男' />} />
        
        {/* 所有学习组件路由 */}
        <Route path="classC" element={<MyCC name="yfw" age={18} sex='男' />} />
        <Route path="lifeCycle" element={<LifeCycle name="yfw" age={18} sex='男' />} />
        <Route path="parents" element={<Parents />} />
        <Route path="redux" element={<ReduxDemo />} />
        <Route path="useEffect" element={<UseEffectF />} />
        <Route path="useMemo" element={<UseMemoF />} />
        <Route path="useState" element={<UseStateF />} />
        <Route path="useCallback" element={<UseCallbackF />} />
        <Route path="useContext" element={<UseContextF />} />
        
        {/* 处理无效路径 */}
        <Route path="*" element={<Base name="yfw" age={18} sex='男' />} />
      </Routes>
    </div>
  );
}

export default Enter;