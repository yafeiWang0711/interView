### react hooks 常用钩子
    1. useState
        创建状态变量和更新状态的函数
        例如：
        const [count, setCount] = useState(0);
        第一个参数是状态变量的初始值，第二个参数是更新状态变量的函数
    2. useEffect
        用于处理副作用，例如订阅事件、请求数据等
        例如：
        useEffect(() => {
            const subscription = props.source.subscribe();
            return () => {
                subscription.unsubscribe();
            }
        }, [props.source]);
    3. useContext
        用于访问上下文（Context）中的值
        例如：
        const value = useContext(MyContext);
        主要用途
           跨组件状态共享
                适用于需要在多个组件之间共享数据（如用户登录状态、主题设置等），通过在顶层组件使用 Provider 提供数据，下层组件通过useContext获取。 ‌
            简化状态管理
                避免props传递的繁琐，提高代码可读性和维护性。 ‌
            自动更新机制
                当Context值变化时，相关组件会自动重新渲染，实现动态响应。 ‌

    4. useReducer
        用于替代 useState 和 useEffect，可以处理更复杂的逻辑
        例如：
        const [state, dispatch] = useReducer(reducer, initialState);
        第一个参数是 reducer 函数，第二个参数是初始状态
        reducer 函数接收两个参数，第一个是当前状态，第二个是要处理的 action，返回新的状态
    5. useCallback
    6. useMemo
    7. useRef
    8. useImperativeHandle
    9. useLayoutEffect
    10. useDebugValue