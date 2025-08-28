import { useState } from 'react'

// useState 钩子 示例组件
// 用于管理组件的状态
// 状态可以是任意类型 如 number、string、boolean、object、array 等
// 状态可以是多个 每个状态都有自己的 setState 方法
// 状态的更新是异步的 不会立即生效 会在组件重新渲染时生效
// [] 两个值 第一个是状态值 第二个是更新状态的函数

const useStateF = () => {
    const [count, setCount] = useState<number>(0)
    const [str, setStr] = useState<string>('str')
    return (
        <>
        <h1>useState 钩子</h1>
        <h2>count: {count}</h2>
        <button onClick={() => setCount(count + 1)}>点击增加 count</button>
        <h2>str: {str}</h2>
        <button onClick={() => setStr('str2'+new Date().getTime())}>点击改变 str</button>
        </>
    )
}

export default useStateF
