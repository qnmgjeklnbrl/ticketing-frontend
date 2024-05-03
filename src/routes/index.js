import { createRouter, createWebHistory } from 'vue-router'

// 연결할 각 컴포넌트 import
import MainPage from '../pages/MainPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import SignupPage from "@/pages/SignupPage.vue";
import MyPage from "@/pages/MyPage.vue";
import AdminPage from "@/pages/AdminPage.vue";
import AdminLoginPage from "@/pages/AdminLoginPage.vue";
import AdminSignupPage from "@/pages/AdminSignupPage.vue";

// 라우터 설계
const routes = [
    { path: '/', component:MainPage},
    { path: '/login', component:LoginPage},
    { path: '/signup', component:SignupPage},
    { path: '/mypage', component:MyPage},
    { path: '/admin', component: AdminPage},
    { path: '/admin/login', component: AdminLoginPage},
    { path: '/admin/signup', component: AdminSignupPage}
]

// 라우터 생성
const router = createRouter({
    history: createWebHistory(),
    routes
});

// 라우터 추출 (main.js에서 import)
export {router}
