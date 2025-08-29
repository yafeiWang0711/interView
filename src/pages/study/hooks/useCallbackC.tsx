import { useState, useCallback, memo } from 'react';

// 如果 props 中包含函数或对象，父组件重渲染时可能导致这些值的引用变化（即使内容没变），此时需用 useCallback（缓存函数）或 useMemo（缓存对象）配合使用，否则 React.memo 会失效。

// 子组件：使用React.memo包裹，仅在props变化时重渲染
// react.memo()用于包裹组件，仅在props变化时重新渲染
const ExpensiveChild = memo(({ onButtonClick, name }: { onButtonClick: () => void; name: string }) => {
  console.log('ExpensiveChild 重渲染了'); // 用于验证是否重复渲染
  return (
    <div>
      <p>子组件接收的名称: {name}</p>
      <button onClick={onButtonClick}>点击触发父组件方法</button>
    </div>
  );
}); // 默认情况下，memo仅在props浅比较时才阻止渲染

// 父组件
const ParentComponent = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("初始名称");

  // 不使用useCallback：每次父组件渲染都会创建新函数
  const handleNormalClick = () => {
    setCount(count + 1);
    console.log("普通点击事件，count:", count);
  };

  // 使用useCallback：仅当依赖项count变化时，才会创建新函数
  const handleMemoizedClick = useCallback(() => {
    console.log("缓存的点击事件，count:", count);
  }, [count]); // 依赖数组：count变化时更新函数

  return (
    <div>
      <h1>useCallback钩子函数</h1>
      <p>useCallback钩子函数用于缓存函数，避免在每次渲染时创建新函数，从而优化性能。</p>
      <p>useCallback主要用于优化子组件的props，避免不必要的渲染。</p>

      <div>==================</div>
      <h3>父组件计数: {count}</h3>
      <button onClick={() => setCount(count + 1)}>增加计数</button>
      <br />
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="修改名称"
      />

      <h4>子组件1（接收普通函数）：</h4>
      <ExpensiveChild 
        onButtonClick={handleNormalClick} 
        name={name} 
      />

      <h4>子组件2（接收useCallback缓存的函数）：</h4>
      <ExpensiveChild 
        onButtonClick={handleMemoizedClick} 
        name={name} 
      />
    </div>
  );
};

export default ParentComponent;
