import React from 'react'
import registerimg from '../../assets/register.png'
import style from '../forgetPassword/forget.module.css'
import { Box, Button, InputAdornment, TextField } from '@mui/material'
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ToastContainer,Bounce, Slide, toast } from 'react-toastify';

export default function ForgetStep1() {
 const {register,handleSubmit}=useForm();
 const navigate=useNavigate();
  const sendCode= async (values)=>{

    console.log(values)
       const response= await axios.post(`http://mytshop.runasp.net/api/Account/ForgotPassword`,values);
      if(response.status==200){

   toast.info('Please checkout your email', {
    position: "bottom-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Slide,
    });
     localStorage.setItem("email",values.email)
    navigate('/forgetStep2');
  }
    console.log(response);
  }
  return (
    <>
    <div  className={`${style.row}`}>
    <div className={`${style.leftSide}`}>
    <img src={registerimg}/>
    </div>
    <div className={`${style.rightSide}`} >
      <div>
      <h2>Step1</h2>
      <h2>Forget Password</h2>
      <span>Please enter your email and we’ll send you a recovery code.</span>
      </div>
      <Box component={'form'} className={`${style.registerForm}`} onSubmit={handleSubmit(sendCode)}>
        <TextField
        {...register('email')}
          helperText=" "
          id="demo-helper-text-aligned-no-helper"
          label="Email"
          type='email'
          fullWidth
        />



        <Button  type='submit' className={`${style.formButton}`} color='mainColor'  variant="contained">Send Code</Button>
        <div>
          <span>Remembered your password?</span>
          <Link to={'/login'}>Login</Link>
        </div>
      
      </Box>
    </div>
    </div>
    <ToastContainer />
    </>
  )

}
