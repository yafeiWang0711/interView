// useState的使用
import  { useState } from 'react';
import { Button } from 'antd';
const useStateC = () => {
    // 定义一个状态和一个更新状态的函数
    const [count, setCount] = useState<number>(0);
    // 定义一个状态和一个更新状态的函数
    const [name, setName] = useState<string>('张三');


    return (
        <div>
            <h1>useState的使用</h1>
            <p>const [count, setCount] = useState  (0)</p>
            <p>[参数1，参数2] 参数1是变量，参数2是一个更新状态的函数  useState(初始值)</p>
            {/* 展示状态 */}
            <p>{count}</p>
            {/* 更新状态 */}
            <Button onClick={() => setCount(count + 1)}>增加</Button>
            {/* 展示状态 */}
            <p>{name}</p>   
            {/* 更新状态 */}
            <Button onClick={() => setName('李四')}>修改姓名</Button>
        </div>
    )

}

export default useStateC;