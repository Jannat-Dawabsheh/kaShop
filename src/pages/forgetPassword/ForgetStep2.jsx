import React from 'react'
import registerimg from '../../assets/register.png'
import style from '../forgetPassword/forget.module.css'
import { Box, Button, InputAdornment, TextField } from '@mui/material'
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ToastContainer,Bounce, Slide, toast } from 'react-toastify';

export default function ForgetStep2() {
 const {register,handleSubmit}=useForm();
 const navigate=useNavigate();
  const sendCode= async (values)=>{
    const {code}=values;
    console.log(code)
    localStorage.setItem("code",code)
     navigate('/forgetStep3')
    //    const response= await axios.post(`http://mytshop.runasp.net/api/Account/ForgotPassword`,values);
//       if(response.status==200){

//    toast.info('Please checkout your email', {
//     position: "bottom-right",
//     autoClose: 1500,
//     hideProgressBar: false,
//     closeOnClick: false,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "dark",
//     transition: Slide,
//     });
//   }
//     console.log(response);
  }
  return (
    <>
    <div  className={`${style.row}`}>
    <img src={registerimg}/>
    <div className={`${style.rightSide}`} >
      <div>
      <h2>Step2</h2>
      <h2>Enter Verification Code</h2>
      <span>We have sent OTP code via phone number to your email<br/> please enter it below to reset your password.</span>
      </div>
      <Box component={'form'} className={`${style.registerForm}`} onSubmit={handleSubmit(sendCode)}>
        <TextField
        {...register('code')}
          helperText=" "
          id="demo-helper-text-aligned-no-helper"
          label="Verification Code"
          type='number'
          fullWidth
        />

        <div className={`${style.resendCode}`}>
          <span>Didn’t get a code?</span>
          <Link to={'/forgetStep1'}>Resend code</Link>
        </div>

        <Button  type='submit' className={`${style.formButton}`} color='mainColor'  variant="contained">Continue</Button>
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
