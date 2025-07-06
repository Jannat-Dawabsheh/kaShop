import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import LogoutIcon from '@mui/icons-material/Logout';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import AxiosAuth from '../../api/AxiosAuth';
import ErrorPage from '../errorPage/ErrorPage';
import Loader from '../../shared/Loader';
import { useState } from 'react';
import UserInfo from '../../components/userInfo/UserInfo';
import style from '../profile/profile.module.css'
import ChangePassword from '../../components/changePassword/ChangePassword';
import { useNavigate, useParams } from 'react-router';
import Orders from '../../components/orders/Orders';

  
const drawerWidth = 240;

export default function Profile() {
    const {index}=useParams('index');
    console.log('selected',index)
    const [page,setPage]=useState(index);
    console.log('page',page)
     const navigate=useNavigate();
    
    const handleLogout=()=>{
    localStorage.removeItem("userToken");

    navigate('/login');
    }
const fetchUser=async()=>{
        const {data}= await AxiosAuth.get(`Account/userinfo`);
        console.log(data);
        
        return data;
    }

    const {data,isLoading,isError,error,refetch}=useQuery({
      queryKey:['userProfile'],
      queryFn:fetchUser,
      staleTime:0,
       refetchOnWindowFocus:true,
      retry:3
    });

    React.useEffect(()=>{
      setPage(index);
    },[index])
    if(isError)return <ErrorPage/>
    if(isLoading)return <Loader/>
  return (
    
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
   
      <Drawer  className={`${style.drawer}`}
        variant="permanent"
        sx={{
           width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['My Profile', 'My Orders', 'change password'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton  onClick={()=>setPage(index)}>
                  <ListItemIcon >
                    {index ==0? <PermIdentityOutlinedIcon color='mainColor'/> :index ==1? <ShoppingCartOutlinedIcon color='mainColor'/>:<PasswordOutlinedIcon color='mainColor' />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Logout'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={handleLogout}>
                  <ListItemIcon>
                    {<LogoutIcon color='error' />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
       
          {
            page==0?<UserInfo data={data}/>:page==1?<Orders data={data}/>:page==2?<ChangePassword />:null
          }
      </Box>
    </Box>
  );
}