import axios from 'axios';
import { HashRouter as Router } from 'react-router-dom';

const router = new Router();
// axios.defaults.timeout = conf.timeout
axios.defaults.baseURL = 'http://localhost:7001';

// 请求拦截
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (err) => Promise.reject(err)
);

// 响应拦截
axios.interceptors.response.use(
    (resp) => {
        const { authorization } = resp.headers;
        console.log(authorization)
        if (authorization) {
            localStorage.setItem('token', authorization);
            console.log('set auth success...')
        };
        return resp;
    },
    (err) => {
        if (err.response) {
            // 判断是否 401 
            console.log(err.response.data)
            if (err.response.status === 401) {
                localStorage.clear("token");
                
                router.history.push(`/login?status=${err.response.data.code}`);
            };
        };
        return Promise.reject(err);
    }
);
export default axios;