import React from 'react'
import loginimg from '../../assets/login.png'
import style from '../login/login.module.css'
import { Box, Button, InputAdornment, TextField } from '@mui/material'
import { Link, Navigate, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import axios from 'axios';
export default function Login() {

  const {register,handleSubmit}=useForm();
   const navigate=useNavigate();
  const loginUser= async (values)=>{
      const response= await axios.post(`http://mytshop.runasp.net/api/Account/Login`,values);
      console.log(response);
      if(response.status==200){
       navigate('/');
      }
  }
  return (
    <>
    <div  className={`${style.row}`}>
    <img src={loginimg}/>
    <div className={`${style.rightSide}`} >

      <h2>Login</h2>
      <span>Good to see you again!</span>

      <Box component={'form'} className={`${style.registerForm}`} onSubmit={handleSubmit(loginUser)}>
       

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
          helperText=""
          id="demo-helper-text-aligned-no-helper"
          label="Password"
          type='password'
          fullWidth
        />
        <Link className={`${style.forget}`} to={'/forgetStep1'}>Forget Password?</Link>
        
        <Button type='submit' className={`${style.formButton}`} color='mainColor'  variant="contained">Login</Button>
        <div>
          <span>Don’t Have an Account?</span>
          <Link to={'/register'}>Create Account</Link>
        </div>
      
      </Box>
    </div>
    </div>
    
    </>
  )
}
