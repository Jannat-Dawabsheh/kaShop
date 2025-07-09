import React, { useState } from 'react'
import ErrorPage from '../errorPage/ErrorPage';
import Loader from '../../shared/Loader';
import { useQuery } from '@tanstack/react-query';
import AxiosNotAuth from '../../api/AxiosNotAuth';
import { Link, useParams } from 'react-router';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Pagination, Rating, Typography } from '@mui/material';
import style from '../categoryProducts/categoryProducts.module.css'
export default function CategoryProducts() {
    const limit=4;
    const {id,name}=useParams('id');
    const[page,setPage]=useState(1);
    console.log('id is ',id);
     const handlePage =async (event, value) => {
     setPage( value);

     
    };

    const fetchCategoryProducts=async()=>{
        const {data}= await AxiosNotAuth.get(`categories/${id}/products`);
        return data;
    }

    const {data,isLoading,isError,error}=useQuery({
      queryKey:['categoryProducts'],
      queryFn:fetchCategoryProducts,
      staleTime:5000,
      retry:3
    });


    
    if(isError)return <ErrorPage/>
    if(isLoading)return <Loader/>
    
  return (
    <>
     {console.log(data)}
       <h2>{name}</h2> 
       <div className={`${style.productContent}`}>
     <Grid sx={{m:5}} container rowSpacing={4} columnSpacing={4} className={`${style.productSection}`}>
    {
    (data.slice((page-1)*limit,(page*limit))).map((product) =>
        <Grid  item xs={12} sm={4} md={3} lg={2} xl={2} >
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

     <Box spacing={2} >
        <Pagination color="primary" count={Math.ceil(data.length/limit)} page={page} onChange={handlePage} />
      </Box>
      </div>
    </>
   
  )
}
