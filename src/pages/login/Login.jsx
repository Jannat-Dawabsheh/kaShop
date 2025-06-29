import React, { useState } from 'react'
import loginimg from '../../assets/login.png'
import style from '../login/login.module.css'
import { Box, Button, colors, InputAdornment, TextField } from '@mui/material'
import { Link, Navigate, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast, Zoom } from 'react-toastify';
import { Mode } from '@mui/icons-material';
import AxiosValues from '../../api/AxiosValues';
export default function Login() {

  const {register,handleSubmit,formState:{errors}}=useForm({mode:'onChange'});
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
   const navigate=useNavigate();
  const loginUser= async (values)=>{
    
    try{
      setLoading(true);
      const response= await AxiosValues.post(`Account/Login`,values);
      console.log(response);
      if(response.status==200){
       localStorage.setItem("userToken",response.data.token)
       navigate('/');
      }
    }catch(error){
      console.log(error);
      toast.error('Invalid data', {
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
    }finally{
      setLoading(false);
    }
      
  }
  return (
    <>
    <div  className={`${style.row}`}>
    <div className={`${style.leftSide}`}>
    <img src={loginimg}/>
    </div>
    <div className={`${style.rightSide}`} >

      <h2>Login</h2>
      <span>Good to see you again!</span>

      <Box component={'form'} className={`${style.registerForm}`} onSubmit={handleSubmit(loginUser)}>
       

        <TextField
        {...register('email',
          {required:"Email is required",
            minLength:{
              value:5,
              message:"Email must be at least 5 characters"
            },
            pattern:{
              value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message:"Invalid email address"
            }


          },
          
        )}
          helperText={errors.email?errors.email.message:null}
          error={errors.email}
          id="demo-helper-text-aligned-no-helper"
          label="Email"
          type='email'
          fullWidth
        />
        <TextField
        {...register('password',
          {required:"Password is required",
            pattern:{
              value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:"Invalid password"
            }

          })}
          helperText={errors.password?errors.password.message:null}
          error={errors.password}
          id="demo-helper-text-aligned-no-helper"
          label="Password"
          type='password'
          fullWidth
        />
        <Link className={`${style.forget}`} to={'/forgetStep1'}>Forget Password?</Link>
        
        <Button type='submit' className={`${style.formButton}`} color='mainColor'  variant="contained" disabled={loading}>{loading?"Loading...":"Login"} </Button>
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
