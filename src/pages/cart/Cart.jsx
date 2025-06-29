import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../../shared/Loader';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Divider, Grid, IconButton, Typography ,TextField} from "@mui/material";
import style from '../cart/cart.module.css'
import { Add, Remove, SafetyDivider, SafetyDividerOutlined } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link } from 'react-router';
import { CartContext } from '../../context/CartContext';
import AxiosAuth from '../../api/AxiosAuth';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import ErrorPage from '../errorPage/ErrorPage';


export default function Cart() {
  //  const {cartItems,setCartItems}=React.useContext(CartContext);
  const [cart,setCart]=useState([]);
  const [loader,setLoader]=useState(true);
  const [totalPrice,setTotalPrice]=useState(0);
const queryClient=  useQueryClient();
  const fetchCart=async()=>{
        const {data}= await AxiosAuth.get(`Carts`);
        return data;
    }

    const {data,isLoading,isError,error,refetch}=useQuery({
      queryKey:['cartItems'],
      queryFn:fetchCart,
      staleTime:1*60*60*1000,
      retry:3
    });

  // const getCart=async()=>{
   
  //   const response= await AxiosAuth.get('Carts');
  //      console.log(response.data); 
  //     setCart(response.data.cartResponse); 
  //     setTotalPrice(response.data.totalPrice); 
  //     setLoader(false);
  // }

  const increaseQty=async(id)=>{
   const response= await AxiosAuth.patch(`Carts/increaseCount/${id}`,{});
   if(response.status==200){
    refetch();
   }

    // const response= await AxiosAuth.patch(`Carts/increaseCount/${id}`,{});
    //    console.log(response); 
    //    if(response.status==200){
    //     const updatedProduct= cart.map((product)=>{
    //       if(product.id ==id){
    //         setTotalPrice(totalPrice+product.price)
    //         return {...product, count:product.count+1}
    //       }
    //       else{
    //         return product;
    //       }
    //     })
    //     setCart(updatedProduct);
    //     setCartItems(cartItems+1);
    //    }

  }


  const decreaseQty=async(id)=>{
  const response= await AxiosAuth.patch(`Carts/decreaseCount/${id}`,{});
   if(response.status==200){
    refetch();
   }
    // const response= await AxiosAuth.patch(`Carts/decreaseCount/${id}`,{});
    //    console.log(response); 
    //    if(response.status==200){
    //     let updatedProduct= cart.map((product)=>{
    //       if(product.id ==id){
    //         setTotalPrice(totalPrice-product.price)
    //         return {...product, count:product.count-1}
    //       }
    //       else{
    //         return product;
    //       }
    //     }).filter((product)=>product.count>0)
    //     setCart(updatedProduct);
    //     setCartItems(cartItems-1);
    //    }

  }

  const remove=async(id)=>{
    const response= await AxiosAuth.delete(`Carts/${id}`);
   if(response.status==200||response.status==204){
    refetch();
   }
    //  const response= await AxiosAuth.delete(`Carts/${id}`);
    
    //    console.log(response); 
    //    if(response.status==200 ||response.status==204 ){
    //     let updatedProduct= cart.filter((product)=>product.id!=id)
    //     let count=cart.find((product)=>product.id==id).count;
    //     setCart(updatedProduct);
    //     console.log(count)
    //     setCartItems(cartItems-count)
    //    }

  }

  const clearCart=async(id)=>{
   const response=  await AxiosAuth.delete(`Carts/clearCart`);
   if(response.status==200||response.status==204){
    refetch();
   }
      //  console.log(response); 
      //  if(response.status==200 ||response.status==204 ){
      //   setCart([]);
      //   setCartItems(0);
      //  }

  }


    if(isError)return <ErrorPage/>
     if(isLoading)return <Loader/>
  if(data.cartResponse.length==0){
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
      {  data.cartResponse.map((product) =>
        
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
        <h3>Order Summary</h3>
        <div className={`${style.summaryRow}`}>
          <span>Subtotal</span>
          <span className={`${style.price}`} >{data.totalPrice}$</span>
        </div>
        <div className={`${style.summaryRow}`}>
          <span>Delivery Charges</span>
          <span className={`${style.price}`} >0,00$</span>
        </div>
        <div className={`${style.summaryRow}`}>
          <span>V.A.T</span>
          <span className={`${style.price}`} >0,00$</span>
        </div>
        <div className={`${style.summaryRow}`}>
          <span>Discount</span>
          <span className={`${style.price}`} >0,00$</span>
        </div>
        <Divider ></Divider>
        <div className={`${style.summaryRow}`}>
          <h3>Total</h3>
          <span className={`${style.price}`} >{data.totalPrice}$</span>
        </div>
        <p>Add a coupon</p>
        <div className={`${style.textFieldRow}`}>
        <TextField  className={`${style.textField}`}
          
          
          id="demo-helper-text-aligned-no-helper"
          label="coupon"
          
        />
       <Button  sx={{height:54,borderRadius:3}}  type='submit' className={`${style.formButton}`} color='darkColor'  variant="contained">Apply</Button>
        </div>
       <Button fullWidth sx={{height:40, borderRadius:3}} component={Link} to={'/checkout'} className={`${style.formButton}`} color='mainColor'  variant="contained">Proceed to checkout</Button>
         
      </Grid>
    </Grid>

    <div className={`${style.clear}`}>
        <Button  onClick={()=>clearCart()} color='error' variant='contained' sx={{width:280,}} startIcon={<DeleteIcon />} >Clear Cart</Button>

    </div>
    </>
  )
}
