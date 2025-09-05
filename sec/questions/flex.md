### flex布局
    1. 容器属性
        1. flex-direction
            1. row 默认值
            2. row-reverse 反向排列
            3. column 列排列
            4. column-reverse 反向列排列
        2. flex-wrap
            1. nowrap 默认值
            2. wrap 换行
            3. wrap-reverse 反向换行
        3. flex-flow
            1. flex-direction + flex-wrap
        4. justify-content
            1. flex-start 默认值

            2. flex-end

            3. center
            4. space-between
            5. space-around
        5. align-items
        6. align-content
    2. 项目属性
        1. order
        2. flex-grow
        3. flex-shrink
        4. flex-basis
        5. flex
        6. align-self

flex:1 相当于 flex-grow:1;flex-shrink:1;flex-basis:0%
flex:2 相当于 flex-grow:2;flex-shrink:1;flex-basis:0%
flex:3 相当于 flex-grow:3;flex-shrink:1;flex-basis:0%
    flex-grow 定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大
    flex-shrink 定义项目的缩小比例，默认为1，即如果空间不足，该项目将缩小
    flex-basis 定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小