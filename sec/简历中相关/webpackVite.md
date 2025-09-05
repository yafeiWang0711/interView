### webpack和vite的区别
    webpack
        webpack是一个现代JavaScript应用程序的静态模块打包器(module bundler)。当webpack处理应用程序时，它会递归地构建一个依赖关系图，其中包含应用程序需要的每个模块，然后将所有这些信息打包成一个或多个bundle。


    vite
        vite是一个基于浏览器原生ES模块导入的开发服务器，它的工作原理是在开发时，将所有的资源都打包成一个或多个bundle，然后在浏览器请求资源时才进行编译。
        vite的工作原理如下：
        1. 客户端向服务器发送一个请求，请求中包含了客户端的公钥。
        2. 服务器返回一个响应，响应中包含了服务器的公钥和证书。
        3. 客户端使用服务器的公钥加密数据，并将加密后的数据发送到服务器。
        4. 服务器使用自己的私钥解密数据，并将解密后的数据发送到客户端。
        5. 客户端使用服务器的公钥加密数据，并将加密后的数据发送到服务器。
        6. 服务器使用自己的私钥解密数据，并将解密后的数据发送到客户端。

    webpack和vite都是现代前端开发中常用的构建工具，它们都可以帮助开发者将源代码打包成浏览器可以识别的代码。但是，它们之间还是有一些区别的：
    1. 打包方式不同
        webpack是基于打包的，它会将所有的资源打包成一个或多个文件。
        vite是基于预编译的，它会在浏览器请求资源时才进行编译。
    2. 开发体验不同
        webpack的开发体验相对较差，因为它需要打包所有的资源，包括开发时不需要的资源。
        vite的开发体验相对较好，因为它只需要打包开发时需要的资源，而不需要打包所有的资源。
    3. 打包速度不同
        webpack的打包速度相对较慢，因为它需要打包所有的资源。
        vite的打包速度相对较快，因为它只需要打包开发时需要的资源。
    4. 热更新不同
        webpack的热更新相对较慢，因为它需要打包所有的资源。
        vite的热更新相对较快，因为它只需要打包开发时需要的资源。
    5. 插件系统不同
        webpack的插件系统相对完善，因为它支持所有的前端插件。
        vite的插件系统相对简单，因为它只支持一些基本的插件。

    vite 不支持require()语法，因为它是基于ES模块的。
    但是，vite提供了一个@vitejs/plugin-commonjs插件，这个插件可以将CommonJS模块转换为ES模块，从而支持require()语法。
    1. 安装插件
        ```
        npm install @vitejs/plugin-commonjs --save-dev
        ```
    2. 配置插件
        在vite.config.js文件中添加以下配置：
        ```
        import commonjs from '@vitejs/plugin-commonjs'
        import { defineConfig } from 'vite'
        export default defineConfig({
            plugins: [commonjs()]
        })
        ```
    3. 使用require()语法
        现在，你可以在vite项目中使用require()语法了。
        例如，你可以在项目中使用以下代码：
        ```
        const fs = require('fs')
        ```