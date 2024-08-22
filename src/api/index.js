import axios from 'axios';

// Axios 인스턴스 생성
const api = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
});


// 요청 인터셉터 추가
api.interceptors.request.use(
(config) => {
    const token = localStorage.getItem('jwt');
    if (token) {
        config.headers['Authorization'] = `${token}`;
    }
        return config;
    },
    (error) => {
        return Promise.reject(error);
}
);

export default api;

