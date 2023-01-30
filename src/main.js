import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/styles/main.less';
                console.log('1111111');
const app = createApp(App)
app
.use(store)
.use(router)
.mount('#app')
