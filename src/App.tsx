import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Base from '@/study/funcC/base';
import MyCC from '@/study/classC';
import  LifeCycle from '@/study/classC/lifeCycle';

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* 将所有路由都嵌套在Layout下 */}
        <Route path="/" element={<Base name="yfw" age={18} sex='男'/>} />
        <Route path="/classC" element={<MyCC name="yfw" age={18} sex='男'/>} />
        <Route path="/lifeCycle" element={<LifeCycle name="yfw" age={18} sex='男'/>} />
      </Routes>
    </Router>
  );
}

export default App;
