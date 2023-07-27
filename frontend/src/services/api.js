import axios from 'axios';
//require('dotenv').config();

console.log(process.env.REACT_APP_BACKEND_URL);

const api = axios.create({

    baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:3333'

})

export default api;