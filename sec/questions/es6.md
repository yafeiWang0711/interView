### es6 
    1. es6模块化开发
        comonjs amd cmd es6

        require 引入模块
        module.exports 导出模块
        export 导出模块
        import 引入模块
        1. 导出模块
            1. 导出默认模块
                export default 模块
            2. 导出多个模块
                export { 模块1, 模块2, 模块3 }
        2. 引入模块
            1. 引入默认模块
                import 模块 from '模块路径'
            2. 引入多个模块
                import { 模块1, 模块2, 模块3 } from '模块路径'
    
    webpack升级成vite 有问题吗？
        1. 问题
            1. 项目比较大的时候，vite的启动速度会比webpack快很多。
            2. 项目比较小的时候，vite的启动速度会比webpack慢很多。
        2. 解决
            1. 项目比较大的时候，使用vite。
            2. 项目比较小的时候，使用webpack。
        3. 引入commomjs模块

        