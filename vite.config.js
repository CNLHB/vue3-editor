import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import router from 'vue-router'
import vuex from 'vuex'
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      less: {
          javascriptEnabled: true,
          additionalData:  `@import "${path.resolve(__dirname, 'src/assets/styles/base.less')}";`
      }
  }}
})
