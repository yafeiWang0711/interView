import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import vitePluginImp from 'vite-plugin-imp'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: (name) => `antd/es/${name}/style/index.js`
        }
      ]
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@router': path.resolve(__dirname, 'src/router'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@study': path.resolve(__dirname, 'src/study'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@pages': path.resolve(__dirname, 'src/pages'),
    }
  },
  // 添加全局 Less 变量配置
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          // // 可以在这里直接覆盖 antd 的主题变量
          // 'primary-color': '#1890ff',
          // 'border-radius-base': '4px'
        },
        javascriptEnabled: true,
        additionalData: `@import '${path.resolve(__dirname, 'src/theme/variables.less')}';`
      }
    }
  },
  server: {
    host: '0.0.0.0'
  }
})
