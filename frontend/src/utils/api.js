import axios from 'axios';

const API = axios.create({
    // Replace localhost with your actual Render backend URL
    baseURL: 'https://campuscore-c4gs.onrender.com' 
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = token;
    }
    return req;
});

export default API;