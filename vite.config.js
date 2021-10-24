import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
// 配置element-plus
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
console.log(path.resolve(__dirname, './src'));
export default defineConfig({
  plugins: [
    vue(),
    Components({
    resolvers: [ElementPlusResolver()],
    })
  ],
  resolve:{
    alias: {
      "@": path.resolve(__dirname, "src"),
      "components": path.resolve(__dirname, "src/components"),
      "styles": path.resolve(__dirname, "src/styles"),
      "views": path.resolve(__dirname, "src/views"),
      "utils": path.resolve(__dirname, "src/utils"),
  }
  },
  server:{
    open: '/editor/index', // 浏览器自动打开
  },
  css: {
    preprocessorOptions: {
      less: {
          javascriptEnabled: true,
          additionalData:  `@import "${path.resolve(__dirname, 'src/assets/styles/base.less')}";`
      }
  }}
})
