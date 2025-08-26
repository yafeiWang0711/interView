import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            name: 'yfw',
            age: 18
        }
    },
    getters: {
        // getters 可以直接访问 state 中的属性 能修改 state 中的属性 但是不能直接修改 state 对象本身
        // 如果你想修改 state 中的属性 可以使用 actions 方法来修改
        // 但是不能直接修改 state 对象本身 比如你不能这样写 this.state = {name: 'yfw', age: 18} 

        getInfo(state) {
            return `姓名：${state.name}，年龄：${state.age}`
        }
    },
    actions: {
        setName(name) {
            this.name = name
            console.log('this.name', this.name);
        },
        setAge(age) {
            this.age = age
        },
        reset() {
            this.name = 'yfw'
            this.age = 18
        },
        addAge() {
            this.age++
        },
    }


})

export default store;

