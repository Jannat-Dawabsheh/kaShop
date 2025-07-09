import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from 'react-router';
import kaLogo from '../../assets/darkLogo.png';
import { CartContext } from '../../context/CartContext';
import { ModeContext } from '../../context/ModeContext';
import { DarkMode, LightMode, Style } from '@mui/icons-material';
import AxiosAuth from '../../api/AxiosAuth';
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import style from '../navbar/navbar.module.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const pagesGuest = ['Register', 'Login','Categories','Products','About us','Contact us'];
const pagesAuth = ['Cart','Categories','Products','About','Contact'];
const pagesGuestMenu = ['register', 'Login','Categories','Products','About','Contact'];
const pagesAuthMenu = ['Cart','Categories','Products','About','Contact','My profile', 'My order','change Password','logout'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar() {
    const isLogedin=Boolean(localStorage.getItem("userToken"));
   

  // const {cartItems}=React.useContext(CartContext);
  const queryClient= useQueryClient();
  const fetchCartItems=async()=>{
     const {data}=await AxiosAuth.get('Carts');
    return data;
    }


  useQuery({
    queryKey:['cartItems'],
    queryFn:fetchCartItems,
    staleTime:0,
    refetchOnWindowFocus:true,
    retry:3
  })

   const data=queryClient.getQueryData(['cartItems']);
   console.log(data);
    const  cartItems=data?.cartResponse.length;

  
  const {mode,toggleTheme}=React.useContext(ModeContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate=useNavigate();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
 
  };
  const handleOpenUserMenu = (event) => {
     setAnchorElUser(event.currentTarget);
   
  };

  const handleCloseNavMenu = () => {
    console.log('anchorElNav')
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
    const handleOpenProfile=()=>{
    navigate('/profile/0');
  }

  const handleLogout=()=>{
    localStorage.removeItem("userToken");

    navigate('/login');
  }

  return (
    <AppBar position="sticky" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <img className={style.logoImg} src={kaLogo}></img>
          <Typography
            variant="h6"
            noWrap
            component={Link} 
            to={`/`}
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 600,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            KA STORE
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {(isLogedin?pagesAuthMenu:pagesGuestMenu).map((page,index) => (
                <MenuItem key={page} onClick={()=>{if(page=='logout')handleLogout(); handleCloseNavMenu(); }} component={Link} to={page=='logout'?`/login`:page=='Cart'?`/${page}`:page=='Categories'?`/${page}`:page=='Products'?`/${page}`:page=='About'?`/${page}`:page=='Contact'?`/${page}`:page=='register'?`/${page}`:`/profile/${index-5}`}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <img className={style.logoImgsmall} src={kaLogo}></img>
          <Typography
            variant="h5"
            noWrap
            component={Link} 
            to={`/`}
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            KA STORE
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent:'center' } }}>
            {(isLogedin?pagesAuth:pagesGuest).map((page) => (
              <Button
                component={Link}
                to={`/${page}`}
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color:"inherit", display: 'block' }}
              >
                {page =='Cart'?`Cart (${cartItems})`:page}
              </Button>
            ))}
            {/* {
              isLogedin?
              <Button 
              onClick={handleLogout}
              sx={{ my: 2, color: 'inherit', display: 'block' }}
              >Logout</Button>
              :null
            } */}
          </Box>
          <Box sx={{ flexGrow: 0 }} className={style.userBox} >
            <Box className={style.profile}>
            <IconButton onClick={toggleTheme}>
              {mode=='light'? <DarkMode/> : <LightMode/>}
            </IconButton>
            <AccountCircleIcon  onClick={handleOpenProfile} sx={{p:0, width:30 ,height:30}}/>
            </Box>
         
            <Tooltip title="Open settings">
              {/* <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton> */}
            
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
