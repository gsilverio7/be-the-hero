import axios from 'axios';

const api = axios.create({

    baseURL:"https://become-the-hero-backend.onrender.com",

})

export default api;