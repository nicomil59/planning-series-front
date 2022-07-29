import axios from 'axios';

export default axios.create({
    // baseURL: `http://localhost:3000/api/`,
    baseURL: `https://planning-series-api.herokuapp.com/api/`,
})