import axios from "axios";
import { getEnvVariables } from "../helpers";

const {VITE_API_URL} = getEnvVariables()

const memesApi = axios.create({
    baseURL: VITE_API_URL
});

memesApi.interceptors.request.use(config => {
    console.log(config.headers)
    if(localStorage.getItem('token')){
        config.headers = {
            ...config.headers,
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
    }

    return config;
})

export default memesApi;