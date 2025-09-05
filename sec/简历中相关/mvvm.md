### mvvm模型
    1. 模型（Model）：负责处理数据逻辑和业务规则。
    2. 视图（View）：负责展示数据和与用户交互。
    3. 视图模型（ViewModel）：作为连接模型和视图的桥梁，处理视图的业务逻辑和数据绑定。
    4. 数据绑定：ViewModel 与 View 之间通过数据绑定机制实现数据的自动同步，当模型数据发生变化时，视图会自动更新；当用户在视图上进行操作时，ViewModel 会自动更新模型数据。
    5. 事件绑定：ViewModel 与 View 之间通过事件绑定机制实现交互，当用户在视图上触发事件（如点击按钮）时，ViewModel 会收到通知并执行相应的业务逻辑。

### vue 双向绑定原理
Vue.js 实现双向数据绑定的核心是利用了 Object.defineProperty() 方法来劫持对象属性的 setter 和 getter，从而在属性被访问或修改时执行特定的逻辑。

#### 具体实现步骤：
1. **初始化**：当 Vue 实例化时，会遍历 data 中的所有属性，使用 `Object.defineProperty()` 将它们转换为 getter/setter。
2. **依赖收集（Dep）**：每个组件的渲染函数会被编译成 render function，在这个过程中，每当遇到一个需要从 data 中读取数据的表达式时，就会创建一个 Watcher 实例，并将这个表达式所依赖的数据对象的某个属性上的 Dep 添加到该 watcher 的 deps 数组中。这样，一旦这些数据发生变化，就可以通知所有的 watchers 进行更新。
3. **派发更新**：当用户通过 v-model 或其他方式改变视图中的值时，触发 setter，setter 会调用 dep.notify() 来通知所有依赖于这个值的 watchers，然后 watchers 再重新计算表达式的值并更新 DOM。
4. **手动触发更新**：在某些情况下，开发者可能需要手动触发视图的更新，例如使用了 computed properties 但没有直接绑定到模板上，这时可以通过 this.$forceUpdate() 来强制更新。

#### v-model 实现
    1. 组件的 render 函数中，会根据 v-model 指令的参数，生成一个 input 元素，并将其 value 属性绑定到组件的 data 中的某个属性上。
    2. 当用户在输入框中输入内容时，会触发 input 事件，事件处理函数会将输入框的值赋值给组件的 data 中的属性，从而触发属性的 setter，进而更新视图。
    3. 当组件的 data 中的属性发生变化时，会触发属性的 getter，从而更新视图中的值。
    4. 组件的 render 函数中，会根据 v-model 指令的参数，生成一个 input 元素，并将其 value 属性绑定到组件的 data 中的某个属性上。
    5. 当用户在输入框中输入内容时，会触发 input 事件，事件处理函数会将输入框的值赋值给组件的 data 中的属性，从而触发属性的 setter，进而更新视图。
    6. 当组件的 data 中的属性发生变化时，会触发属性的 getter，从而更新视图中的值。

