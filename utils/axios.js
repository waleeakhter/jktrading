import axios from "axios";

const API = axios.create({
    baseURL: 'https://jktrading.vercel.app/api/',
})

export default API  