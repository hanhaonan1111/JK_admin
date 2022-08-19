import axios from 'axios'
import {message} from 'antd'
import {getToken, hasToken} from '@/utils/token'

export const baseURL = 'http://geek.itheima.net/v1_0'
let http = axios.create({
    baseURL: baseURL,
    timeout: 5000
})


http.interceptors.request.use((config) => {
    if (hasToken()) {
        config.headers!.Authorization = `Bearer ${getToken().token}`;
    }
    return config;
});

http.interceptors.response.use(res => {
    return res.data
}, e => {
    if (e.response.status !== 200) {
        message.error(e.response.data.message, 1);
    }
})

export default http


