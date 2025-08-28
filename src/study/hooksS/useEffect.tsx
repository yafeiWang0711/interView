import { useEffect, useState } from 'react';
import { Button } from 'antd';

// useState 是 React 中用于在函数组件中添加状态（state）的 Hook。
// 它接收一个初始值作为参数，并返回一个数组，包含当前状态值和更新状态的函数。
// 可以使用数组解构赋值的方式来获取状态值和更新函数。

// useEffect 是 React 中处理副作用的 Hook，用于在组件渲染后执行操作（如数据请求、事件监听、DOM 操作等）。
// 它接收两个参数：一个函数和一个依赖项数组。
// 第一个参数是一个包含副作用逻辑的函数，第二个参数是一个数组，用于指定哪些状态或属性变化时需要重新执行该副作用。
// 如果依赖项为空数组（[]），则只在组件首次渲染后运行一次；如果依赖项不为空，则在指定的值发生变化时再次运行。
// 类似vue的 watchEffect 监听所有的状态变化 类似vue的 watch 监听指定的状态变化
// 没有返回值 只能在函数中使用 类似vue的 watchEffect

// useEffect 可以有返回值，但其返回值必须是一个清理函数（函数类型），用于清除副作用产生的残留影响（如事件监听、定时器、订阅等），避免内存泄漏。


const useEffectF = () => {
    // 类似vue的 watchEffect 监听所有的状态变化 类似vue的 watch 监听指定的状态变化
    useEffect(() => {
        console.log('任何状态变化都会执行');
    }, [])


    const [count, setCount] = useState<number>(0)
    const [str, setStr] = useState<string>('str')

    // 组件首次渲染完成后执行一次
    useEffect(() => {
        console.log('组件渲染完成');
    }, [])
    // 当 count 变化时执行
    useEffect(() => {
        console.log('count ，str 变化了');
    }, [count, str])

    // 当 str 变化时执行 , 这里有个问题 就是 每次渲染都会执行 因为 str 没有在依赖项中 所以 每次渲染都会重新赋值 给str 导致无限循环 应该使用 useMemo 解决这个问题
    useEffect(() => {
        console.log('str 变化了');
    }, [str])
    return (
        <>
            <h1>this is hooks - useEffect</h1>
            <Button onClick={() => setCount(count + 1)}>点击增加</Button>
            <h2>count:{count}</h2>

            <Button onClick={() => setStr('str2')}>点击改变</Button>
            <h2>str:{str}</h2>
        </>
    )
}


export default useEffectF