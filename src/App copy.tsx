import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import Study from '@/study/enter';
import BaseLayout from '@/pages/layoutS';

// import './App.css';

// 导航按钮组件
const NavButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="nav-buttons">
      <h1>React学习入口</h1>
      <Button onClick={() => navigate('/study')}>进入学习中心</Button>
      <Button onClick={() => navigate('/sys')}>进入React Router学习</Button>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* 默认入口页面 - 带有导航按钮 */}
          <Route path="/" element={<NavButton />} />
          
          {/* 学习中心路由 - 使用通配符支持学习中心内的所有子路由 */}
          <Route path="/study/*" element={<Study />} />
          {/* 布局组件 */}
          <Route path="/sys/*" element={<BaseLayout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
