import { useState } from 'react'
import {Button} from 'antd'

interface Props {
  name: string;
  age: number;
  sex?: string;
}
// 函数式组件 没有生命周期
const FuncC = (props: Props) => {
  const { name, age, sex } = props
  const [count, setCount] = useState<number>(0)
  return (
    <div>
        <div>name: {name}</div>
        <div>age: {age}</div>
        <div>sex: {sex || '男'}</div>
      <p>You clicked {count} times</p>
      <Button onClick={() => setCount(count + 1)}>
        Click me
      </Button>

    </div>
  )
}

export default FuncC
