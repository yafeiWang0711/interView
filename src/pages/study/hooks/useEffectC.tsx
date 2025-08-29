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


/**
* 使用 React Hooks 中的 useEffect 函数来监听状态变化并执行相应的操作。
*
* @returns 返回 JSX 元素，用于渲染组件。
*/
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
            <div>
                useEffect 是 React 中用于处理副作用的 Hook，允许你在函数组件中执行数据获取、订阅、手动修改 DOM 等操作。它相当于 class 组件中的 componentDidMount、componentDidUpdate 和 componentWillUnmount 这三个生命周期方法的组合。
            </div>

            <p>依赖项控制执行时机
                依赖项数组决定了副作用何时执行：
                空数组 []：仅在组件挂载时执行一次（相当于 componentDidMount），清理函数在组件卸载时执行。
                包含变量：当数组中的变量发生变化时，副作用会重新执行（相当于 componentDidUpdate）。
                无依赖项：组件每次渲染后都会执行（不推荐，可能导致性能问题）</p>


            清理函数避免内存泄漏
            当副作用涉及长期存在的资源（如事件监听、定时器、订阅）时，必须通过返回清理函数释放资源，避免内存泄漏。
            jsx
            <pre>
                {`
    useEffect(() => {
        const timer = setInterval(() => {
            console.log('定时器执行');
        }, 1000);

        return () => {
            clearInterval(timer); // 清理函数，清除定时器
        };
    }, []);
    `}
            </pre>

            <Button onClick={() => setCount(count + 1)}>点击增加</Button>
            <h2>count:{count}</h2>

            <Button onClick={() => setStr('str2')}>点击改变</Button>
            <h2>str:{str}</h2>
        </>
    )
}


export default useEffectF