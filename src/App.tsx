
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

function App() {
    const navigate = useNavigate();
  return (
    <div className="App">
      <div className="nav-buttons">
        <h1>React学习入口</h1>

       <Button onClick={() => navigate('/study')}>进入学习中心</Button>
       <Button onClick={() => navigate('/sys')}>进入React Router学习</Button>
       <Button onClick={() => navigate('/bsView')}>进入可视化大屏学习 16:9</Button>
       <Button onClick={() => navigate('/interview')}>面试题</Button>
      </div>
    </div>
  );
}

export default App;
