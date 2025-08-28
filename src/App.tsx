
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
      </div>
    </div>
  );
}

export default App;
