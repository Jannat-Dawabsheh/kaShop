import React from 'react'
import Category from '../../components/categories/Category'
import Product from '../../components/products/Products.jsx'
import CarouselSection from '../../components/carouselSection/CarouselSection.jsx'

export default function Home() {
  return (
    <>
    <CarouselSection/>
    <Category/>
    <Product/>
    </>
  )
}
