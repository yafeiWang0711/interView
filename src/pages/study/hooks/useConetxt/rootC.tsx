import {MyContext} from './useContextData';
import {useContext} from 'react';
import Child from './child';
import Child1 from './child1';
const useContextC = () => {
    const {name,age,sex,sayHello,sayGoodbye} = useContext(MyContext);
    return (
        <MyContext.Provider value={{name,age,sex,sayHello,sayGoodbye}}>
            <h1>Hello</h1>
            <h1>--------child1---------</h1>
            <Child />
            <h1>--------child2---------</h1>
            <Child1 />
        </MyContext.Provider>
    )

}

export default useContextC;