import axios from 'axios'
import React from 'react'

const AxiosNotAuth=axios.create({
    baseURL:'https://mytshop.runasp.net/api/',

});
export default AxiosNotAuth;
