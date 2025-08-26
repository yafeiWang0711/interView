### redux react 状态管理
    1.创建store
        import { createStore } from 'redux';
        import rootReducer from './reducers';
        const store = createStore(rootReducer);
        export default store;
    2.创建reducer
        2.1 定义初始状态
        2.2 定义reducer函数
        2.3 导出reducer
    3.创建action
        3.1 定义action类型
        3.2 定义action创建函数
        3.3 导出action创建函数
    4.创建组件
        4.1 引入useSelector和useDispatch
        4.2 从store中获取状态
        4.3 分发action