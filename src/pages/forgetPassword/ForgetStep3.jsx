import React from 'react'
import registerimg from '../../assets/register.png'
import style from '../forgetPassword/forget.module.css'
import { Box, Button, InputAdornment, TextField } from '@mui/material'
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ToastContainer,Bounce, Slide, toast } from 'react-toastify';

export default function ForgetStep3() {
 const {register,handleSubmit}=useForm();
 const navigate=useNavigate();
 let code="";
 let email="";
 let setPassword={
    "email":"",
    "code":"",
    "password":"",
    "ConfirmPassword":""
 }
  const resetPassword= async (values)=>{
    console.log(values)
    code=localStorage.getItem("code");
    email=localStorage.getItem("email");
    console.log(code)
    console.log(email)
    setPassword.email=email;
    setPassword.code=code;
    setPassword.password=values.password;
    setPassword.ConfirmPassword=values.confirmPassword;
    console.log(setPassword);

       const response= await axios.patch(`http://mytshop.runasp.net/api/Account/SendCode`,setPassword);
      if(response.status==200){

   toast.success('Your password changed successfully', {
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
    navigate('/login');
  }
    console.log(response);
  }
  return (
    <>
    <div  className={`${style.row}`}>
    <img src={registerimg}/>
    <div className={`${style.rightSide}`} >
      <div>
      <h2>Step3</h2>
      <h2>Set a New Password</h2>
      <span>Create a strong password to secure your account.</span>
      </div>
      <Box component={'form'} className={`${style.registerForm}`} onSubmit={handleSubmit(resetPassword)}>
        <TextField
                {...register('password')}
                  helperText="Must be at least 8 characters long"
                  id="demo-helper-text-aligned-no-helper"
                  label="New Password"
                  type='password'
                  fullWidth
                />
                <TextField
                {...register('confirmPassword')}
                  helperText=" "
                  id="demo-helper-text-aligned-no-helper"
                  label="Confirm Password"
                  type='password'
                  fullWidth
                />



        <Button  type='submit' className={`${style.formButton}`} color='mainColor'  variant="contained">Reset Password</Button>

      
      </Box>
    </div>
    </div>
    <ToastContainer />
    </>
  )

}
