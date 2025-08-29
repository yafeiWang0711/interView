import React, { useContext } from 'react'
import { MyContext } from './useContextData';
const Child = () => {
    const {name,age,sex,sayHello,sayGoodbye} = useContext(MyContext);
    return (
        <div>
            <h1>Hello</h1>
            <h2>{name}</h2>
            <h2>{age}</h2>
            <h2>{sex}</h2>
            <button onClick={() => sayHello('yfw')}>hello</button>
            <button onClick={() => sayGoodbye('yfw')}>goodbye</button>
        </div>
    )
}

export default Child