import axios from "axios";
const env = process.env.NODE_ENV;
let url = ""
if (env == "development") {
    url = 'http://localhost:3000/api'
}
else if (env == "production") {
    url = process.env.Live_API_URL
}
const API = axios.create({
    baseURL: url,
})

export default API  