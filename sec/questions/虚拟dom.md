### 虚拟dom
    虚拟dom是一种javascript对象，用来描述dom结构。虚拟 DOM 是一个用于描述真实 DOM 节点的 JavaScript 对象。
    例如：
    const vdom = {
        tag: 'div',
        props: {
            id: 'app'
        },
        children: [
            {
                tag: 'p',
                props: {
                    class: 'red'
                },
                children: ['hello world']
            }
        ]
    }
    上面的虚拟 DOM 对象描述了下面的真实 DOM：
    <div id="app">
        <p class="red">hello world</p>
    </div>

    为什么需要虚拟 DOM？ 
    因为直接操作真实 DOM 非常昂贵，尤其是在频繁更新场景下。浏览器渲染流程包括重排（reflow）和重绘（repaint），性能开销大。虚拟 DOM 提供了一层抽象，允许在 JS 层面进行高效的 diff 计算，仅将必要的变更直接操作真实 DOM 非常昂贵，尤其是在频繁更新场景下。浏览器渲染流程包括重排（reflow）和重绘（repaint），性能开销大。虚拟 DOM 提供了一层抽象，允许在 JS 层面进行高效的 diff 计算，仅将必要的变更应用到真实 DOM。

    diff 算法
    虚拟 DOM 的核心是 diff 算法，用于比较新旧两棵虚拟 DOM 树，计算出最小的更新操作。
    vue和react的虚拟dom都是基于diff算法实现的。
     diff 算法的核心思想是：
    1. 对比两棵树的差异，找到最小的变更。
    2. 只对有差异的节点进行操作，避免对整棵树进行操作。
    3. 利用树的结构和属性，进行高效的对比和更新。
    4. 最终将变更应用到真实 DOM。

    diff 算法有多种实现方式，例如：
        vue的diff算法是基于深度优先遍历新旧两棵树，比较节点的类型、属性等。
        react的diff算法是基于双端比较算法，比较新旧两棵树的差异。
        双端比较算法的核心思想是：
        1. 从新旧两棵树的头和尾开始比较，找到第一个不同的节点。
        2. 从旧树的头和新树的尾开始比较，找到第一个不同的节点。
        3. 对比这两个节点，计算出最小的变更。
        4. 最终将变更应用到真实 DOM。
