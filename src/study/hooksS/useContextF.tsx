import { useState } from 'react';
import ChildComponent from './useContextFChild';
import UserContext from './UserContext';

const ParentComponent = () => {
  // 父组件管理状态
  const [user] = useState({
    name: '张三',
    age: 25
  });

  return (
    // 提供上下文数据
    <UserContext.Provider value={user}>
      <div style={{ padding: 20, border: '1px solid #ccc' }}>
        <h2>父组件</h2>
        <p>当前用户: {user.name} ({user.age}岁)</p>
        <ChildComponent />
      </div>
    </UserContext.Provider>
  );
};

export default ParentComponent;
    