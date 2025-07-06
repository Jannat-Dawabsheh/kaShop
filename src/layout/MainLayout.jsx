import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import { Outlet, useLocation } from 'react-router'
import CartContextProvider from '../context/CartContext'

export default function MainLayout() {
  const location=useLocation();
  const hiddenRouters=['/login','/register','/Login','/Register','/profile/0','/profile/1','/profile/2']
  const hideLayout=hiddenRouters.includes(location.pathname);
  return (
    <>
    {/* <CartContextProvider> */}
    <Navbar/>
    <Outlet/>
    {!hideLayout && <Footer/>}
    {/* </CartContextProvider> */}
    </>
  )
}
