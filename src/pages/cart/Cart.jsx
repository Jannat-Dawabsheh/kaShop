import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../../shared/Loader';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Typography } from "@mui/material";
import style from '../cart/cart.module.css'
import { Add, Remove } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link } from 'react-router';
export default function Cart() {
  const [cart,setCart]=useState([]);
  const [loader,setLoader]=useState(true);

  const getCart=async()=>{
    const userToken=localStorage.getItem('userToken')
    const response= await axios.get(`http://mytshop.runasp.net/api/Carts`,
      {
          headers:{
              AUTHORIZATION:`Bearer ${userToken}`
          }
      }
    );
       console.log(response.data.cartResponse); 
      setCart(response.data.cartResponse); 
      setLoader(false);
  }

  const increaseQty=async(id)=>{
    const userToken=localStorage.getItem('userToken')
    const response= await axios.patch(`http://mytshop.runasp.net/api/Carts/increaseCount/${id}`,{},
      {
          headers:{
              AUTHORIZATION:`Bearer ${userToken}`
          }
      }
    );
       console.log(response); 
       if(response.status==200){
        const updatedProduct= cart.map((product)=>{
          if(product.id ==id){
            return {...product, count:product.count+1}
          }
          else{
            return product;
          }
        })
        setCart(updatedProduct);
       }

  }


  const decreaseQty=async(id)=>{
    const userToken=localStorage.getItem('userToken')
    const response= await axios.patch(`http://mytshop.runasp.net/api/Carts/decreaseCount/${id}`,{},
      {
          headers:{
              AUTHORIZATION:`Bearer ${userToken}`
          }
      }
    );
       console.log(response); 
       if(response.status==200){
        let updatedProduct= cart.map((product)=>{
          if(product.id ==id){
            return {...product, count:product.count-1}
          }
          else{
            return product;
          }
        }).filter((product)=>product.count>0)
        setCart(updatedProduct);
       }

  }

  const remove=async(id)=>{
    const userToken=localStorage.getItem('userToken')
    const response= await axios.delete(`http://mytshop.runasp.net/api/Carts/${id}`,
      {
          headers:{
              AUTHORIZATION:`Bearer ${userToken}`
          }
      }
    );
       console.log(response); 
       if(response.status==200 ||response.status==204 ){
        let updatedProduct= cart.filter((product)=>product.id!=id)
        setCart(updatedProduct);
       }

  }

  const clearCart=async(id)=>{
    const userToken=localStorage.getItem('userToken')
    const response= await axios.delete(`http://mytshop.runasp.net/api/Carts/clearCart`,
      {
          headers:{
              AUTHORIZATION:`Bearer ${userToken}`
          }
      }
    );
       console.log(response); 
       if(response.status==200 ||response.status==204 ){
        setCart([]);
       }

  }


  useEffect(()=>{
      getCart();
  },[])


  if(loader){
      return <Loader/>
  }
  if(cart.length==0){
    return<>
    <div className={`${style.emptyDiv}`} >
    <ShoppingCartOutlinedIcon sx={{ fontSize: 40 }} />
    <p>Your cart is empty</p>
    <span>Looks like you haven’t added anything yet. Let’s fix that!</span>
   <Button component={Link} to={'/'} color='mainColor' variant='contained' sx={{width:280,}}  >Shop now</Button>

    </div>
    </>
  }
  return (
    <>

    <h2>Cart</h2>
    <Grid  sx={{m:3, }}container spacing={4}>
     
      <Grid  item size={{ xs: 12, md: 8}} >
      {  cart.map((product) =>
        
        <Card key={product.id} className={`${style.productDiv}`} sx={{mb:5, display:'flex', alignItems:'center' , justifyContent:'flex-start' }}>
            <CardMedia component={'img'} image={product.mainImg} sx={{width:300, height:200, borderRadius:2}}  alt={product.description}>

            </CardMedia>
            <CardContent  sx={{width:600}}>
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
           
           <div  className={`${style.iconsDiv}`} >
            <div>
            <IconButton onClick={()=>remove(product.id)}  color='error'><DeleteIcon /></IconButton>
             <IconButton color='mainColor'><FavoriteIcon/></IconButton>
           </div>
           <div className={`${style.countDiv}`} >
            <IconButton  onClick={()=>decreaseQty(product.id)} color='mainColor'><Remove/></IconButton>
            <span>{product.count}</span>
             <IconButton onClick={()=>increaseQty(product.id)} color='mainColor'><Add/></IconButton>
           </div>
           </div>
          

       </Card>

       
    )
  }
     </Grid>


       <Grid item size={{ xs: 12, md: 4}} className={`${style.orderSummary}`}>
        Order Summary
      </Grid>
    </Grid>

    <div className={`${style.clear}`}>
        <Button onClick={()=>clearCart()} color='error' variant='contained' sx={{width:280,}} startIcon={<DeleteIcon />} >Clear Cart</Button>

    </div>
    </>
  )
}
