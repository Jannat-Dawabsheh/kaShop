import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import { Outlet } from 'react-router'
import CartContextProvider from '../context/CartContext'

export default function MainLayout() {
  return (
    <>
    {/* <CartContextProvider> */}
    <Navbar/>
    <Outlet/>
    <Footer/>
    {/* </CartContextProvider> */}
    </>
  )
}
