import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// PayloadAction<T> 类型表示一个包含泛型 T 的 action，其中 T 是将要传递给 reducer 的有效负载的类型。
// 例如，incrementByAmount 操作需要一个数字作为有效负载，所以它的 action 类型是 PayloadAction<number>。

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

// 导出action creators
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// 导出reducer
export default counterSlice.reducer;