# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)
```js
const path = require('path')

module.exports = {
    alias: {
        '/@/': path.resolve(__dirname, './src')
    },
    hostname: '0.0.0.0', // 默认是 localhost
    port: '8000', // 默认是 3000 端口
    open: true, // 浏览器自动打开
    https: false, // 是否开启 https
    ssr: false, // 服务端渲染
    base: './', // 生产环境下的公共路径
    outDir: 'dist', // 打包构建输出路径，默认 dist ，如果路径存在，构建之前会被删除
    proxy: { // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
    '/api': {
      target: 'http://127.0.0.1:7001', // 后端服务实际地址
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api/, '')
    }
  }
}

import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import ElementPlus from 'element-plus' // 这边引入 element-plus

const app = createApp(App)
app.use(ElementPlus) // 使用 element-plus
app.use(router)
app.mount('#app')
```