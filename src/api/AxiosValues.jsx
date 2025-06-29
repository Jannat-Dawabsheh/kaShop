import axios from 'axios'
import React from 'react'

const AxiosValues=axios.create({
    baseURL:'https://mytshop.runasp.net/api/',
    headers:{
        'Content-Type': 'application/json',
    }
    

});
export default AxiosValues;
