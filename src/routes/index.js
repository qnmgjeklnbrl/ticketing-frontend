import { createRouter, createWebHistory } from 'vue-router'

// 연결할 각 컴포넌트 import
import MainPage from '../components/MainPage.vue'
import LoginPage from '../components/LoginPage.vue'
import SignupPage from "@/components/SignupPage.vue";
import MyPage from "@/components/MyPage.vue";

// 라우터 설계
const routes = [
    { path: '/', component:MainPage},
    { path: '/login', component:LoginPage},
    { path: '/signup', component:SignupPage},
    { path: '/mypage', component:MyPage},
]

// 라우터 생성
const router = createRouter({
    history: createWebHistory(),
    routes
});

// 라우터 추출 (main.js에서 import)
export {router}