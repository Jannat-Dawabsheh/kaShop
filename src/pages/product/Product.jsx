import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Loader from '../../shared/Loader';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import style from '../product/product.module.css'
import StarRateIcon from '@mui/icons-material/StarRate';
import { toast, ToastContainer, Zoom } from 'react-toastify';
export default function Product() {

    const {id}=useParams("id");
    const [product,setProduct]=useState();
    const [loader,setLoader]=useState(true);
    const getProduct=async()=>{
       const response= await axios.get(`http://mytshop.runasp.net/api/products/${id}`);
        console.log(response.data); 
        setProduct(response.data); 
        setLoader(false);
    }

    useEffect(()=>{
        getProduct();
    },[])


    const addToCart=async(id)=>{
        const userToken=localStorage.getItem('userToken')
     const response= await axios.post(`http://mytshop.runasp.net/api/Carts/${id}`,{},
        {
            headers:{
                AUTHORIZATION:`Bearer ${userToken}`
            }
        }
     );
        console.log(response); 
        if(response.status==200){
          toast.success('This product added successfully to your cart', {
          position: "top-right",
          autoClose:2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Zoom,
          });
        }
    }
    if(loader){
        return <Loader/>
    }
  return (
    <>
    <Card sx={{m:4,}} >
         <CardMedia component={'img'} image={product.mainImg}  alt={product.description}>
            </CardMedia>
            <CardContent>
            <Typography component={'div'} variant="h6">
              {product.name}
            </Typography>
            <p  className={`${style.description}`}>
              {product.description}
            </p>
            <p className={`${style.lable}`}>
              Rate
            </p>
            
                <StarRateIcon color='mainColor'/>
                <StarRateIcon color='mainColor'/>
                <StarRateIcon color='mainColor'/>
                <StarRateIcon color='mainColor'/>
                <StarRateIcon color='mainColor'/>
                {product.rate}
           
            <p className={`${style.lable}`}>
              Price
            </p>
            <span  className={`${style.price}`}>
              {product.price}$
            </span>
           </CardContent>
           <CardActions>
            <Button size="small" color='mainColor'  variant="contained" onClick={()=>addToCart(product.id)}>Add to Cart</Button>
           </CardActions>
    </Card>
    <ToastContainer />
    </>
  )
}
