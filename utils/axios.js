import axios from "axios";
const env = process.env.NODE_ENV;
let url = ""
if (env == "development") {
    url = 'http://localhost:3000/api';
    // url = 'https://jktrading.vercel.app/api/'

}
else if (env == "production") {
    url = 'https://jktrading.vercel.app/api/'
}
const API = axios.create({
    baseURL: url,
})

export default API  