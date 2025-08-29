import { createContext } from 'react';

// 创建一个上下文
const MyContext = createContext({
  name: 'Tom',
  age: 0, 
  sex: '男',
  sayHello: (msg?:string|number) => {
    console.log('hello',msg);
  },
  sayGoodbye: (msg?:string|number) => {
    console.log('goodbye',msg);
  }
});

export {MyContext};
