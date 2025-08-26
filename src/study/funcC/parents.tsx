import { useState, useRef } from 'react'
import { Button } from 'antd'

import Child from './child'

const Parents = () => {

  const [count, setCount] = useState<number>(0)
  const [name, setName] = useState<string>('yfw')
  const [age, setAge] = useState<number>(18)
  const childRef = useRef<{
    childCountChange: () => void;
  }>(null)
  // 父组件调用子组件的方法，比如让子组件的count + 1
  const childCountchange = () => {
    childRef.current?.childCountChange()
  }

  const parents = (msg: string): void => {
    console.log('我是父组件的parents方法', msg)
  }
  return (
    <>
      <div>
        <h1>我是父组件</h1>
        <h2>count: {count}</h2>
        <h2>name: {name}</h2>
        <h2>age: {age}</h2>
        <Button onClick={() => setCount(count + 1)}>count + 1</Button>
        <Button onClick={() => setName('yfw2')}>name 2</Button>
        <Button onClick={() => setAge(20)}>age 20</Button>
        <div>
          <Button onClick={() => childCountchange()}>调用子组件count + 1</Button>

        </div>
      </div>
      <h1>----------child 子组件----------</h1>
      <Child ref={childRef} count={count} parents={parents} msg="我是父组件的msg" />
    </>
  )
}

export default Parents