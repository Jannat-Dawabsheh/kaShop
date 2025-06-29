import axios from 'axios'
import React from 'react'
 const userToken=localStorage.getItem('userToken')
const AxiosAuth=axios.create({
    baseURL:'https://mytshop.runasp.net/api/',
    headers:{
        Authorization: `Bearer ${userToken}`
    }
});
export default AxiosAuth;
