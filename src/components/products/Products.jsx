import axios from "axios";
import { useEffect, useState } from "react";
import style from '../products/products.module.css'
import { Box, Button, Card, CardActions, CardContent, CardMedia, createTheme, Grid, Rating, ThemeProvider, Typography } from "@mui/material";
import { Link } from 'react-router';
import Loader from "../../shared/Loader";
import ErrorPage from "../../pages/errorPage/ErrorPage";
import useFetch from "../../hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import AxiosNotAuth from "../../api/AxiosNotAuth";
export default function Products(){

  // const {error,loader,data:products}=useFetch('products');
  //     if(loader)return <Loader/>
  //     if(error)return <ErrorPage/>
   
      const fetchProducts=async()=>{
        const response= await AxiosNotAuth.get(`products?page=1&limit=4`);
        return response.data;
    }

    const {data,isLoading,isError,error}=useQuery({
      queryKey:['products'],
      queryFn:fetchProducts,
      staleTime:1*60*60*1000,
      retry:3
    });

    if(isError)return <ErrorPage/>
    if(isLoading)return <Loader/>
    // const [products,setProducts]=useState([]);
    // const getProducts= async()=>{
    //     const response= await axios.get(`${import.meta.env.VITE_BURL}products`);
    //     console.log(response.data); 
    //     setProducts(response.data); 
         
    // }


    // useEffect(()=>{
    //     getProducts();
       
    // },[])
    
    return ( 
      <>
       {console.log(data.data.data)}
       <Box sx={{m:5}} className={`${style.row}`}>
        <h3>our Products</h3>
        <Button  style={{color:'primary'}} component={Link} to={'/Products'} >See all</Button>
       </Box>
     
    <Grid sx={{m:5}} container rowSpacing={4} columnSpacing={4} className={`${style.productSection}`}>
    {
    (data.data).map((product) =>
        <Grid  item  xs={12} sm={4} md={3} lg={2} xl={2} >
        <Card key={product.id} className={`${style.productDiv}`}>
            <CardMedia component={'img'} image={product.mainImg} className={`${style.productImg}`}  alt={product.description}>

            </CardMedia>
            <CardContent sx={{width:'100%'}}>
            <Typography component={'div'} variant="h6">
              {product.name}
            </Typography>
            <p className={`${style.description}`}>
              {product.description}
            </p>
            <div className={`${style.row}`}>
            <span className={`${style.price}`}>
              {product.price}$
            </span>
             <Rating name="read-only" defaultValue={product.rate} precision={0.5}  readOnly />
            </div>
         
           </CardContent>
           <CardActions>
            <Button size="small" component={Link} to={`/product/${product.id}`}>Details</Button>
           </CardActions>

       </Card>

        </Grid>
      
        )
}
    
    </Grid>
     </>
    )
}