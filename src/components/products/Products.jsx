import axios from "axios";
import { useEffect, useState } from "react";
import style from '../products/products.module.css'
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { Link } from 'react-router';
export default function Category(){

    const [products,setProducts]=useState([]);
    const getProducts= async()=>{
        const response= await axios.get('http://mytshop.runasp.net/api/products');
        console.log(response.data); 
        setProducts(response.data); 
         
    }


    useEffect(()=>{
        getProducts();
       
    },[])
    
    return ( 
    <Grid sx={{m:5}} container rowSpacing={4} columnSpacing={45} className={`${style.productSection}`}>
    {
    products.map((product) =>
        <Grid item size={{ xs: 12, sm:4, md: 3 , lg:2, xl:2}} >
        <Card key={product.id} className={`${style.productDiv}`}>
            <CardMedia component={'img'} image={product.mainImg} className={`${style.productImg}`}  alt={product.description}>

            </CardMedia>
            <CardContent>
            <Typography component={'div'} variant="h6">
              {product.name}
            </Typography>
            <p className={`${style.description}`}>
              {product.description}
            </p>
            <span className={`${style.price}`}>
              {product.price}$
            </span>
           </CardContent>
           <CardActions>
            <Button size="small" component={Link} to={`/product/${product.id}`}>Details</Button>
           </CardActions>

       </Card>

        </Grid>
      
        )
}
    
    </Grid>
    )
}