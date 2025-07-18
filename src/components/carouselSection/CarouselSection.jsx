import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import speackers from '../../assets/speackers.png';
import style from '../carouselSection/carouselSection.module.css'
import { Button } from '@mui/material';
export default function CarouselSection() {
  return (
            <Carousel   
                showThumbs={false}
                showStatus={false}
                infiniteLoop
                autoPlay
                interval={3000}
                transitionTime={500}
                showIndicators={true}
                dynamicHeight={false}
                emulateTouch 
                 >
                <div className={`${style.imgDiv}`}>
                    
                        <div className={`${style.column}`} >
                            <h1>Feel Every Beat.<br/> Hear the Difference.</h1>
                            <span className={`${style.description}`}>Experience immersive sound with our premium speaker collection</span>
                            <Button style={{backgroundColor:'white'}}   variant="contained">Buy Now</Button>
                        </div>
                    <div className={`${style.imgcontainer}`}><img  className={`${style.img}`} src={speackers}></img></div>
                    

                    
                    
                </div>
                <div className={`${style.imgDiv}`}>
                    
                        <div className={`${style.column}`} >
                            <h1>Feel Every Beat.<br/> Hear the Difference.</h1>
                            <span className={`${style.description}`}>Experience immersive sound with our premium speaker collection</span>
                            <Button style={{backgroundColor:'white'}}   variant="contained">Buy Now</Button>
                        </div>
                    <div className={`${style.imgcontainer}`}><img  className={`${style.img}`} src={speackers}></img></div>
                    

                    
                    
                </div>
                <div className={`${style.imgDiv}`}>
                    
                        <div className={`${style.column}`} >
                            <h1>Feel Every Beat.<br/> Hear the Difference.</h1>
                            <span className={`${style.description}`}>Experience immersive sound with our premium speaker collection</span>
                            <Button style={{backgroundColor:'white'}}   variant="contained">Buy Now</Button>
                        </div>
                    <div className={`${style.imgcontainer}`}><img  className={`${style.img}`} src={speackers}></img></div>
                    

                    
                    
                </div>
            </Carousel>
  )
}

