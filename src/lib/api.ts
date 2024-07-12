import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:3000/api/',
    timeout: 1000
});

export const setToken = (token: string) => {
    api.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    });
};


try {
    const token = JSON.parse(JSON.parse(localStorage.getItem('persist:root') || '{}').user)?.value?.token
    if (token) {
        setToken(token)
    }
} catch (e) {
    console.log('token not found')
}

