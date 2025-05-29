import React from 'react'
import registerimg from '../../assets/register.png'
import style from '../register/register.module.css'
import { Box, Button, InputAdornment, TextField } from '@mui/material'
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ToastContainer,Bounce, Slide, toast } from 'react-toastify';
export default function Register() {

  const {register,handleSubmit}=useForm();

  const registerUser= async (values)=>{
      const response= await axios.post(`http://mytshop.runasp.net/api/Account/register`,values);
      if(response.status==200){

   toast.success('You are registered successfully. Please verify your email', {
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
  }
    // console.log(response);
  }
  return (
    <>
    <div  className={`${style.row}`}>
    <img src={registerimg}/>
    <div className={`${style.rightSide}`} >
      <div>
      <h2>Create New Account</h2>
      <span>Join us to track orders, save favorites, and get special offers.</span>
      </div>
      <Box component={'form'} className={`${style.registerForm}`} onSubmit={handleSubmit(registerUser)}>
       <div className={`${style.row}`}>
        <TextField
         {...register('firstName')}
          helperText=" "
          id="demo-helper-text-aligned-no-helper"
          label="First Name"
        />

        <TextField 
        {...register('lastName')}
          helperText=" "
          id="demo-helper-text-aligned-no-helper"
          label="Last Name"
        />
      </div>
        <TextField 
        {...register('userName')}
          helperText=" "
          id="demo-helper-text-aligned-no-helper"
          label="User Name"
          fullWidth
        />

        <TextField
        {...register('email')}
          helperText=" "
          id="demo-helper-text-aligned-no-helper"
          label="Email"
          type='email'
          fullWidth
        />
        <TextField
        {...register('password')}
          helperText="Must be at least 8 characters long"
          id="demo-helper-text-aligned-no-helper"
          label="Password"
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

        <TextField
        {...register('birthOfDate')}
          helperText=" "
          id="demo-helper-text-aligned-no-helper"
          label=""
          type='date'
          fullWidth
        />

        <Button  type='submit' className={`${style.formButton}`} color='mainColor'  variant="contained">Create New Account</Button>
        <div>
          <span>Already have an Account?</span>
          <Link to={'/login'}>Login</Link>
        </div>
      
      </Box>
    </div>
    </div>
    <ToastContainer />
    </>
  )
}
