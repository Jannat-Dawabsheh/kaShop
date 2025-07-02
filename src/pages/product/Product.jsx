import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Loader from '../../shared/Loader';
import { Box, Button, Card, CardActions, CardContent, CardMedia, colors, Grid, Typography } from "@mui/material";
import style from '../product/product.module.css'
import StarRateIcon from '@mui/icons-material/StarRate';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import { CartContext } from '../../context/CartContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AxiosNotAuth from '../../api/AxiosNotAuth';
import AxiosAuth from '../../api/AxiosAuth';
export default function Product() {
    // const {cartItems,setCartItems}=React.useContext(CartContext);
    const {id}=useParams("id");
     const userToken=localStorage.getItem('userToken')
    // const [product,setProduct]=useState();
    // const [loader,setLoader]=useState(true);
    // const getProduct=async()=>{
    //    const response= await axios.get(`${import.meta.env.VITE_BURL}products/${id}`);
    //     console.log(response.data); 
    //     setProduct(response.data); 
    //     setLoader(false);
    // }
     const queryClient=  useQueryClient();
    const fetchProduct=async()=>{
        const {data}= await AxiosNotAuth.get(`products/${id}`);
        return data;
    }

    const {data,isLoading,isError,error}=useQuery({
      queryKey:['product',id],
      queryFn:fetchProduct,
      staleTime:5000,
      refetchOnWindowFocus:true,
      retry:3
    });

    

    const addToCartMutation=useMutation({
      mutationFn:(productId)=>{
        return  AxiosAuth.post(`Carts/${productId}`,{},);
      },
      onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:['cartItems']})
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
          console.log(sucess);
      },
      onError:()=>{
        console.log(`error...`,error.message);
      }
    })
    // const addToCart=async(id)=>{
    //     const userToken=localStorage.getItem('userToken')
    //  const response= await axios.post(`${import.meta.env.VITE_BURL}Carts/${id}`,{},
    //     {
    //         headers:{
    //             AUTHORIZATION:`Bearer ${userToken}`
    //         }
    //     }
    //  );
    //     console.log(response); 
    //     if(response.status==200){
    //       toast.success('This product added successfully to your cart', {
    //       position: "top-right",
    //       autoClose:2000,
    //       hideProgressBar: false,
    //       closeOnClick: false,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "dark",
    //       transition: Zoom,
    //       });

    //       setCartItems(cartItems+1);
    //     }
    // }

    if(isError)return <ErrorPage/>
    if(isLoading)return <Loader/>
  return (
    <>
    <Card sx={{m:4,}} >
         <CardMedia component={'img'} image={data.mainImg}  alt={data.description}>
            </CardMedia>
            <CardContent>
            <Typography component={'div'} variant="h6">
              {data.name}
            </Typography>
            <p  className={`${style.description}`}>
              {data.description}
            </p>
            <p className={`${style.lable}`}>
              Rate
            </p>
            
                <StarRateIcon color='mainColor'/>
                <StarRateIcon color='mainColor'/>
                <StarRateIcon color='mainColor'/>
                <StarRateIcon color='mainColor'/>
                <StarRateIcon color='mainColor'/>
                {data.rate}
           
            <p className={`${style.lable}`}>
              Price
            </p>
            <span  className={`${style.price}`}>
              {data.price}$
            </span>
           </CardContent>
           <CardActions>
            <Button size="small" color='mainColor'  variant="contained" onClick={()=>addToCartMutation.mutate(data.id)} disabled={addToCartMutation.isPending || !userToken}>
              {addToCartMutation.isPending?'Adding...':'Add to Cart'} 
              </Button>
              <p className={style.loginmsg}>{!userToken?'you must login to add..':null}</p>
           </CardActions>
    </Card>
    <ToastContainer />
    </>
  )
}
