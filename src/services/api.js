import axios from 'axios';

export const http = axios.create({
    baseURL: 'http://localhost:5001/api/',
    headers: {
        'Content-Type': 'application/json'
    }
});


http.interceptors.response.use(
    response => {
        if (response && response.data && response.data.token) {
            window.localStorage.setItem('token', response.data.token);
        }
        return response;
    },
    error => {
        const {response} = error;
        if (response && response.status === 401) {
            window.localStorage.removeItem('token');
            window.location.pathname = '/';
        }
        return Promise.reject(error);
    }
);

http.interceptors.request.use(config => {
    if (!!window.localStorage.getItem('token'))
        config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
    return config;
});


export const get = ({url}) => http.get(url);

export const post = ({url, data}) => http.post(url, data);

export const put = ({url, data}) => http.put(url, data);

export const del = url => http.delete(url);

export const patch = ({url, data}) => http.patch(url, data);