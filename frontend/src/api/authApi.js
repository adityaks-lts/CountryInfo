import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const register = (userData) => axios.post(`${API_URL}/user/signup`, userData);
export const login = (userData) => axios.post(`${API_URL}/user/login`, userData);
