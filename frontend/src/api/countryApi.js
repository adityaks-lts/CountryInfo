import axios from 'axios';

export const getCountryByCurrencyCode = (currencyCode) => axios.get(`https://restcountries.com/v3.1/currency/${currencyCode}`);
