import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Divider, Grid, IconButton, Typography ,TextField, FormControl, RadioGroup, FormControlLabel, FormLabel, Radio} from "@mui/material";
import axios from 'axios';
import style from '../checkout/checkout.module.css'
import { Link ,useNavigate} from 'react-router';
import Loader from '../../shared/Loader';
import { toast, ToastContainer, Zoom } from 'react-toastify';

export default function Checkout() {
    const [cart,setCart]=useState([]);
    const [loader,setLoader]=useState(true);
    const [totalPrice,setTotalPrice]=useState(0);
    const[paymentMethod,setPaymentMethod]=useState("Visa");
    const navigate=useNavigate();

     const getCart=async()=>{
        const userToken=localStorage.getItem('userToken')
        const response= await axios.get(`${import.meta.env.VITE_BURL}Carts`,
          {
              headers:{
                  AUTHORIZATION:`Bearer ${userToken}`
              }
          }
        );
           console.log(response.data); 
          setCart(response.data.cartResponse); 
          setTotalPrice(response.data.totalPrice); 
          setLoader(false);
      }

      const handelPaymentMethod=(event)=>{
        setPaymentMethod(event.target.value);
     
      }

      const handleCheckout=async()=>{
        const userToken=localStorage.getItem('userToken')
        const response= await axios.post(`${import.meta.env.VITE_BURL}CheckOuts/Pay`,
            {
              "PaymentMethod":paymentMethod
            },
            {
                headers:{
                    AUTHORIZATION:`Bearer ${userToken}`
                }
            }
        );
        console.log(response); 
        if(response.status==200){
            toast.success('Your payment done successfully', {
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

            if(paymentMethod=="Visa"){
            location.href=response.data.url;
        }

        
        }
            
        
      }

      
        useEffect(()=>{
            getCart();
        },[])
      
      
        if(loader){
            return <Loader/>
        }

  return (
    <>

    <h2>Checkout</h2>
    <Grid  sx={{m:3, }}container spacing={4}>
     
      <Grid  item size={{ xs: 12, md: 7}} >
        <Box component={'form'} className={`${style.registerForm}`} >
         
           <TextField 
          
             helperText=" "
             id="demo-helper-text-aligned-no-helper"
             label="First Name"
             fullWidth
           />
   
           <TextField 
           
             helperText=" "
             id="demo-helper-text-aligned-no-helper"
             label="Last Name"
             fullWidth
           />
         
   
           <TextField 
          
             helperText=" "
             id="demo-helper-text-aligned-no-helper"
             label="Email"
             type='email'
             fullWidth
           />


         <TextField 
           
             helperText=" "
             id="demo-helper-text-aligned-no-helper"
             label="Phone"
             type='number'
             fullWidth
           />
           
            <TextField 
           
             helperText=" "
             id="demo-helper-text-aligned-no-helper"
             label="City"
             fullWidth
           />
           <TextField 
           
             helperText=" "
             id="demo-helper-text-aligned-no-helper"
             label="Address"
             fullWidth
           />

           <TextField 
           
             helperText=" "
             id="demo-helper-text-aligned-no-helper"
             label="ZIP / Postal Code"
             fullWidth
           />
      
   
   
           
         
         </Box>

         <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Payment method</FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                row
                value={paymentMethod}
                onChange={handelPaymentMethod}
            >
                <FormControlLabel value="Visa" control={<Radio />} label="Visa" />
                <FormControlLabel value="Cash" control={<Radio />} label="Cash" />
                
            </RadioGroup>
            </FormControl>
     </Grid>


       <Grid item size={{ xs: 12, md: 5}} className={`${style.orderSummary}`}>
        <h3>Summary</h3>
        {cart.map((product) =>
        
        <Card key={product.id} className={`${style.productDiv}`} sx={{mb:2, display:'flex', alignItems:'center' , justifyContent:'flex-start', backgroundColor:'transparent', outline:'none' }}>
            <CardMedia component={'img'} image={product.mainImg} sx={{width:200, height:100, borderRadius:2}}  alt={product.description}>

            </CardMedia>
            <CardContent  sx={{width:600}}>
            <p>
              {product.name}
            </p>
            <p>
              {product.count}x
            </p>
            <span className={`${style.price}`}>
              {product.price}$
            </span>
           </CardContent>
           

       </Card>
    )}
        <Divider sx={{mb:2,}} ></Divider>
        <div className={`${style.summaryRow}`}>
          <span>Subtotal</span>
          <span className={`${style.price}`} >{totalPrice}$</span>
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
          <span className={`${style.price}`} >{totalPrice}$</span>
        </div>
        <p>Add a coupon</p>
        <div className={`${style.textFieldRow}`}>
        <TextField  className={`${style.textField}`}
          
          
          id="demo-helper-text-aligned-no-helper"
          label="coupon"
          
        />
       <Button  sx={{height:54,borderRadius:3}}  type='submit' className={`${style.formButton}`} color='darkColor'  variant="contained">Apply</Button>
        </div>
       <Button onClick={handleCheckout} fullWidth sx={{height:40, borderRadius:3}} component={Link} to={'/checkout'} className={`${style.formButton}`} color='mainColor'  variant="contained">Pay Now</Button>
         
      </Grid>
    </Grid>
<ToastContainer />
    </>
  )
}
