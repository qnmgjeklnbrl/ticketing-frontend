import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import store from "@/store/store";

// 생성한 뷰 라우터 받아오기
import { router } from './routes/index.js'

const app = createApp(App)
app.use(router).use(store)  // 라우터 사용, vuex 사용
app.mount('#app')