import axios from 'axios';

export default axios.create({
    baseURL: 'https://foodshuffle-backend.vercel.app/'
})