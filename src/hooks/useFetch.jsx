import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AxiosNotAuth from '../api/AxiosNotAuth';

export default function useFetch(url) {
 const [data,setData]=useState([]);
 const [loader,setLoader]=useState(true);
 const [error,setError]=useState(null);
    const getData= async()=>{
        try{
        const response= await AxiosNotAuth.get(`${url}`);
        console.log(response.data); 
        setData(response.data); 
        }catch(error){
           setError(error);
        }finally{
            setLoader(false);
        }
        
         
    }


    useEffect(()=>{
        getData();
       
    },[])

    return {data,loader,error}
}
