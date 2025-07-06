import React, { useEffect, useState } from 'react'
import style from '../changePassword/changePassword.module.css'
import { Box, Button, TextField } from '@mui/material'
import { useForm } from 'react-hook-form';
import ErrorPage from '../../pages/errorPage/ErrorPage';
import Loader from '../../shared/Loader';
import AxiosAuth from '../../api/AxiosAuth';
import { useQuery } from '@tanstack/react-query';
import { toast ,Slide} from 'react-toastify';
export default function ChangePassword(props) {
const [loader,setLoader]=useState(false);
const [error,seterror]=useState('');
 const {register,handleSubmit,setValue}=useForm();
  const changePassword=async(values)=>{
    try{
       setLoader(true);
        const response= await AxiosAuth.patch(`Account/ChangePassword`,{
          
        "OldPassword":values.OldPassword,
        "NewPassword":values.NewPassword,
        "ConfirmNewPassword":values.ConfirmNewPassword,
          
        });
        console.log(response)
        if(response.status==200){

          toast.success('Your password changed successfully', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
            });
           setValue("OldPassword",'');
            setValue("NewPassword",'');
            setValue("ConfirmNewPassword",'');
          }
      }catch(error){
          toast.error('invalid data', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
            });
         seterror(error)
      }
      finally{
        setLoader(false);
      }
    }

    useEffect(()=>{
      changePassword
    },[])

    if(error)return <ErrorPage/>
    if(loader)return <Loader/>

  
   return (
    <>
  
    <div className={`${style.rightSide}`} >

      <h2>Change Password</h2>

      <Box component={'form'} className={`${style.registerForm}`} onSubmit={handleSubmit(changePassword)}>
        <TextField
          {...register('OldPassword')}
            helperText="Must be at least 8 characters long"
            id="demo-helper-text-aligned-no-helper"
            label="old Password"
            type='password'
            fullWidth
          />

          <TextField
          {...register('NewPassword')}
            helperText="Must be at least 8 characters long"
            id="demo-helper-text-aligned-no-helper"
            label="New Password"
            type='password'
            fullWidth
          />
          <TextField
          {...register('ConfirmNewPassword')}
            helperText=" "
            id="demo-helper-text-aligned-no-helper"
            label="Confirm Password"
            type='password'
            fullWidth
          />



        <Button  type='submit' className={`${style.formButton}`} color='mainColor'  variant="contained">change Password</Button>

      
      </Box>
    </div>
</>

  )
}
