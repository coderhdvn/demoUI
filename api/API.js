import axios from 'axios';

export default axios.create({
    baseURL: 'http://192.168.4.25:8082',
})