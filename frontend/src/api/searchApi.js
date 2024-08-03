import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const addHistory = (search, token) => axios.post(`${API_URL}/searches`, search, { headers:{ 'authorization': `Bearer ${token}` } });
export const getHistory = (token) => axios.get(`${API_URL}/searches`, { headers: { 'authorization': `Bearer ${token}` } });
