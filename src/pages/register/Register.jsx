import React, { useState } from 'react'
import registerimg from '../../assets/register.png'
import style from '../register/register.module.css'
import { Box, Button, InputAdornment, TextField } from '@mui/material'
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ToastContainer,Bounce, Slide, toast } from 'react-toastify';
import AxiosValues from '../../api/AxiosValues';
export default function Register() {

  const {register,handleSubmit,formState:{errors}}=useForm({mode:'onChange'});
  const [loading,setLoading]=useState(false);
  const registerUser= async (values)=>{
    try{

      setLoading(true);
       const response= await AxiosValues.post(`Account/registe`,values);
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
  }catch(error){
   toast.error('Invalid data', {
          position: "top-right",
          autoClose:2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
          });
  }finally{
   setLoading(false);
  }
    // console.log(response);
  }
  return (
    <>
    <div  className={`${style.row}`}>
    <div className={`${style.leftSide}`}>
    <img src={registerimg}/>
    </div>
    <div className={`${style.rightSide}`} >
      <div>
      <h2>Create New Account</h2>
      <span>Join us to track orders, save favorites, and get special offers.</span>
      </div>
      <Box component={'form'} className={`${style.registerForm}`} onSubmit={handleSubmit(registerUser)}>
       <div className={`${style.row}`}>
        <TextField
         {...register('firstName',{required:"First Name is required",})}
          helperText={errors.firstName?errors.firstName.message:null}
          error={errors.firstName}
          id="demo-helper-text-aligned-no-helper"
          label="First Name"
        />

        <TextField 
        {...register('lastName',{required:"Last Name is required",})}
          helperText={errors.lastName?errors.lastName.message:null}
          error={errors.lastName}
          id="demo-helper-text-aligned-no-helper"
          label="Last Name"
        />
      </div>
        <TextField 
        {...register('userName',{required:"UserName is required",})}
          helperText={errors.userName?errors.userName.message:null}
          error={errors.userName}
          id="demo-helper-text-aligned-no-helper"
          label="User Name"
          fullWidth
        />

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
          })}
          helperText={errors.email?errors.email.message:null}
          error={errors.email}
          id="demo-helper-text-aligned-no-helper"
          label="Email"
          type='email'
          fullWidth
        />
        <TextField
        {...register('password',
          {required:"password is required",
           
            pattern:{
              value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:"Must be at least 8 characters long with capital,small,sympol and number"
            }
          })}
          helperText={errors.password?errors.password.message:null}
          error={errors.password}
          id="demo-helper-text-aligned-no-helper"
          label="Password"
          type='password'
          fullWidth
        />
        <TextField
        {...register('confirmPassword',
          {required:"password is required",
            
            pattern:{
              value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:"Must be at least 8 characters long with capital,small,sympol and number"
            }
          })}
          helperText={errors.confirmPassword?errors.confirmPassword.message:null}
          error={errors.confirmPassword}
          id="demo-helper-text-aligned-no-helper"
          label="Confirm Password"
          type='password'
          fullWidth
        />

        <TextField
        {...register('birthOfDate',{required:"BOD is required",})}
          helperText={errors.birthOfDate?errors.birthOfDate.message:null}
          error={errors.birthOfDate}
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
