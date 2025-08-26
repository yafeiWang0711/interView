import  { useState,useImperativeHandle ,forwardRef} from 'react';
import { Button } from 'antd';

interface ChildProps {
    msg: string;
    count: number;
    parents: (msg: string) => void;
}

// 通过 forwardRef 接收 ref，用 useImperativeHandle 定义暴露给父组件的方法

const Child = forwardRef((props: ChildProps,ref) => {
    const {msg, count} = props;
    const [countChild, setCountChild] = useState<number>(0)
    useImperativeHandle(ref, () => ({
        childCountChange: () => setCountChild(countChild + 1),
    }))
    return (
       <>
        <div>
            <h1>我是子组件</h1>
            <h2>子组件count: {countChild}</h2>
            <Button onClick={() => setCountChild(countChild + 1)}>子组件count + 1</Button>
        </div>
        <div>
            <Button onClick={() => props.parents('我是子组件传递过来的')}>调用父组件方法</Button>
            <h2>父组件传来的msg: {msg}</h2>
            <h2>父组件传来的count: {count}</h2>
        </div>
       </>
    )
}
)
export default Child;