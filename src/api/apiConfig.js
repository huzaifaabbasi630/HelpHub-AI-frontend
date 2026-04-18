import axios from 'axios';

const API_URL = 'https://help-hub-ai-hackaton.vercel.app';

const API = axios.create({
    baseURL: API_URL,
});

// Automatically attach JWT token to every request if it exists
API.interceptors.request.use((req) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo && userInfo.token) {
        req.headers.Authorization = `Bearer ${userInfo.token}`;
    }
    return req;
});

export default API;
export { API_URL };
