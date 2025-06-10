import axios from "axios";
import { useEffect, useState } from "react";
import style from '../categories/category.module.css'
import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
export default function Category(){

    const [categories,setCategories]=useState([]);
    const getCategories= async()=>{
        const response= await axios.get('http://mytshop.runasp.net/api/categories');
        console.log(response.data); 
        setCategories(response.data); 
         
    }


    useEffect(()=>{
        getCategories();
       
    },[])
    
    return ( 
    <Grid sx={{m:5}} container spacing={4} className={`${style.categorySection}`}>
    {
    categories.map((category) =>
        <Grid item size={{ xs: 12, sm:4, md: 3 , lg:2, xl:2}} >
        <div key={category.id} className={`${style.categoryDiv}`}>
            <Typography component={'div'} variant="h6">
              {category.name}
            </Typography>
       
       
            <Button size="small">Details</Button>
        

       </div>

        </Grid>
      
        )
}
    
    </Grid>
    )
}