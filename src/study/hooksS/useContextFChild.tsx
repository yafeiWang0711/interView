import { useContext } from 'react';
import UserContext from './UserContext.tsx';


const ChildComponent = () => {
  // 子组件获取上下文数据   
  const { name, age } = useContext(UserContext);
  
  return (
    <div style={{ padding: 15, margin: 10, border: '1px solid #666' }}>
      <h3>子组件</h3>
      <p>从上下文获取的用户名: {name}</p>
      <p>从上下文获取的年龄: {age}岁</p>
    </div>
  );
};

export default ChildComponent;
    