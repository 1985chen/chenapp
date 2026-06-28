import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, error => {
    return Promise.reject(error);
});

api.interceptors.response.use(response => {
    return response.data;
}, error => {
    if (error.response) {
        const message = error.response.data?.message || 'request failed';
        console.error('api error', message);
        return Promise.reject({message});
    }

    return Promise.reject({message: 'request failed'});
});

export const register = data => api.post('/auth/register', data);
export const login = data => api.post('/auth/login', data);
export const getMe = () => api.get('/auth/me');
export default api;
