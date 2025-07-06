import React from 'react'
import style from '../checkout/checkout.module.css'
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import { Button } from '@mui/material';
import { Link } from 'react-router';
export default function CheckoutSuccess() {
 
     return<>
    <div className={`${style.emptyDiv}`} >
    <CheckCircleTwoToneIcon sx={{ fontSize: 60 , }} color='mainColor' />
    <p>Your order is confirmed!</p>
    <span>We’ve received your payment and will start processing your order shortly.You can check the email sent to you</span>
   <Button component={Link} to={'/'} color='mainColor' variant='contained' sx={{width:280,}}  >Shop now</Button>

    </div>
    </>
  
}
