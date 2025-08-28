import {useState,useMemo} from 'react'


// useMemo 钩子，用于缓存计算结果
// 只有当依赖项变化时，才会重新计算
// 返回的是一个缓存后的值 有更新时才会重新计算
// 如果没有依赖项或者依赖项为空数组，则每次渲染都会执行计算
// 类似vue的computed属性 计算属性


const useMemoF = () => {
    const [count, setCount] = useState<number>(0)

    const [str, setStr] = useState<string>('str')
    // 当 count 变化时执行
    const countMemo = useMemo(() => {
        console.log('两个值都变化时执行');
        return count+str
    }, [count,str])
    return (
        <>
        <h1>useMemo 钩子</h1>
        <h2>count: {count}</h2>
        <button onClick={() => setCount(count + 1)}>点击增加 count</button>
        <h2>str: {countMemo}</h2>
        <button onClick={() => setStr('str2'+new Date().getTime())}>点击改变 str</button>
        </>
    )
}

export default useMemoF
