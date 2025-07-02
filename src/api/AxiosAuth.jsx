// import axios from 'axios'
// import React from 'react'
//  const userToken=localStorage.getItem('userToken')
// const AxiosAuth=axios.create({
//     baseURL:'https://mytshop.runasp.net/api/',
//     headers:{
//         Authorization: `Bearer ${userToken}`
//     }
// });
// export default AxiosAuth;

import axios from 'axios';

const AxiosAuth = axios.create({
  baseURL: 'https://mytshop.runasp.net/api/',
});


AxiosAuth.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default AxiosAuth;
