import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@store/index';
import { increment, decrement, incrementByAmount } from '@store/slices/counterSlice';
import { Button } from 'antd';
import Item from './itemI';

const ReduxDemo: React.FC = () => {
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.counter.value);
  
  const incrementCount = () => {
    dispatch(increment());
  };
  
  const decrementCount = () => {
    dispatch(decrement());
  };
  
  const incrementCountByAmount = (amount: number) => {
    dispatch(incrementByAmount(amount));
  };
  return (
    <div>
      <h1>Redux Demo</h1> 
      <p>Count: {count}</p>
      <Button onClick={incrementCount}>Increment</Button>
      <Button onClick={decrementCount}>Decrement</Button>
      <Button onClick={() => incrementCountByAmount(5)}>Increment by 5</Button>
      
      
      <div style={{ marginTop: '20px' }}>
        <Item />
      </div>
    </div>
  );
};

export default ReduxDemo;