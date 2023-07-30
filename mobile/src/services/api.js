import axios from 'axios';

const localIp = '';
const api = axios.create({
    baseURL: 'http://' + localIp + ':3333'
})

console.log(ips);

export default api;