import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const addFavorite = (country, token) => axios.post(`${API_URL}/favorites`, {favorites: country}, { headers: { 'authorization': `Bearer ${token}` } });
export const getFavorites = (token) => axios.get(`${API_URL}/favorites`, { headers: { 'authorization': `Bearer ${token}` } });
export const removeFavorite = (id, token) => axios.delete(`${API_URL}/favorites/${id}`, { headers: { 'authorization': `Bearer ${token}` } });