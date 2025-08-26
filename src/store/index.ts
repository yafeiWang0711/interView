import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';

// 配置Redux store
const store = configureStore({
  reducer: {
    counter: counterReducer,
    // 可以添加更多reducer
  },
});

export default store;

// 导出RootState和AppDispatch类型，用于TypeScript类型安全
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;