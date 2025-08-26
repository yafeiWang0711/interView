// 生命周期
import { Component } from 'react'
import { Button } from 'antd';
import type { Person } from '@/types/interface.ts'

// 只有在类组件中才有生命周期 函数组件中没有生命周期
// 挂载阶段：
// constructor → getDerivedStateFromProps → render → componentDidMount

// 更新阶段：
// getDerivedStateFromProps → shouldComponentUpdate → render → getSnapshotBeforeUpdate → componentDidUpdate

// 卸载阶段：
// componentWillUnmount

interface State {
    name: string;
    age: number;
    sex?: string;
    count: number;
}


class LifeCycle extends Component <Person, State> {
    constructor(props: Person) {
        super(props)
        this.state = {
            name: props.name,
            age: props.age,
            sex: props.sex,
            count: 0,
        }

        console.log('constructor','生命周期钩子函数执行顺序：constructor → render → componentDidMount')
    }

    // getDerivedStateFromProps 是一个静态方法，它在组件挂载时和更新时都会被调用
    // 它的作用是根据 props 来更新 state 
    static getDerivedStateFromProps(props: Person, state: State) {
        console.log('getDerivedStateFromProps',props,state)
        return {
            name: props.name,
            age: props.age,
            sex: props.sex,
            count: state.count,
        }
    }

    // shouldComponentUpdate 是一个实例方法，它在组件更新前被调用
    // 它的作用是根据 props 和 state 来判断是否需要更新组件
    shouldComponentUpdate(nextProps: Person, nextState: State) {
        console.log('shouldComponentUpdate',nextProps,nextState)
        return true  // 返回 true 表示需要更新组件，返回 false 表示不需要更新组件
    }

    // 组件挂载完成后执行
    componentDidMount() {
        console.log('componentDidMount','生命周期钩子函数执行顺序：constructor → render → componentDidMount')
    }
    // getSnapshotBeforeUpdate 是一个实例方法，它在组件更新前被调用
    // 它的作用是在组件更新前获取 DOM 信息
/**
* 在组件更新前获取快照
*
* @param prevProps 上一次的 props
* @param prevState 上一次的 state
* @returns 返回一个对象，该对象包含上一个 props 和 state 的快照信息，
* 这个返回值将在 componentDidUpdate 生命周期方法中作为第三个参数传入
*/
    getSnapshotBeforeUpdate(prevProps: Person, prevState: State) {
        console.log('getSnapshotBeforeUpdate',prevProps,prevState)
        // 返回一个值，这个值会在 componentDidUpdate 中作为第三个参数传入
        return {
            name: prevProps.name,
            age: prevProps.age,
            sex: prevProps.sex,
            count: prevState.count,
        }
    }

    // componentDidUpdate 是一个实例方法，它在组件更新后被调用
    // 它的作用是在组件更新后执行一些操作
    /**
* 组件更新后的生命周期方法。
*
* @param prevProps 上一次的 props
* @param prevState 上一次的状态
* @param snapshot 快照值，用于实现持久化 UI 状态
*/
    componentDidUpdate(prevProps: Person, prevState: State, snapshot: void) {
        console.log('componentDidUpdate',prevProps,prevState,snapshot,'组件更新后执行一些操作')
    }
    
/**
* 渲染函数
*
* 在生命周期钩子函数中被调用，用于生成组件的UI界面。
*
* @returns 渲染的JSX元素
*/
    render() {
        console.log('render','生命周期钩子函数执行顺序：constructor → render → componentDidMount')
        return (
            <div>
                <div>name: {this.props.name}</div>
                <div>age: {this.props.age}</div>
                <div>sex: {this.props.sex || '男'}</div>
                <div>count:{this.state.count}</div>
                <Button onClick={() => {
                    this.setState({
                        count: this.state.count + 1
                    })
                }}>
                    点击
                </Button>
            </div>
        )
    }
}

export default LifeCycle