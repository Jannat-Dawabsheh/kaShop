import React from 'react'
import style from '../userInfo/userInfo.module.css'
import { Box, Button, InputAdornment, TextField } from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
export default function UserInfo({data}) {
    
 return (
    <>
    
    <div className={`${style.rightSide}`} >
      <h2>My Profile</h2>

      <Box component={'form'} className={`${style.registerForm}`} >
       <div className={`${style.row}`}>
        <TextField
          value={data.firstName}
          id="demo-helper-text-aligned-no-helper"
          label="First Name"
          fullWidth
        />

        <TextField 
           value={data.lastName}
          id="demo-helper-text-aligned-no-helper"
          label="Last Name"
          fullWidth
        />
      </div>
        <TextField 
           value={data.userName}
          id="demo-helper-text-aligned-no-helper"
          label="User Name"
          fullWidth
        />

        <TextField
    
          value={data.email}
          id="demo-helper-text-aligned-no-helper"
          label="Email"
          type='email'
          fullWidth
        />
        

        <TextField
          defaultValue={(data.birthOfDate).split('T')[0]}
          id="demo-helper-text-aligned-no-helper"
          label="Birth of date"
          type='date'
          fullWidth
        />

       <Box sx={{display:'flex', justifyContent:'space-between', gap:3, width:'100%'}} >
        <Button  className={`${style.formButton}`} color='white'  variant="contained" startIcon={<EditOutlinedIcon />}>Edit</Button>

        <Button  className={`${style.formButton}`} color='mainColor'  variant="contained">Save Changes</Button>
       </Box>
      
      </Box>
    </div>
    

    </>
  )
}
