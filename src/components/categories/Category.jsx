import axios from "axios";
import { useEffect, useState } from "react";
import style from '../categories/category.module.css'
import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import useFetch from "../../hooks/useFetch";
import Loader from "../../shared/Loader";
import ErrorPage from "../../pages/errorPage/ErrorPage";
import AxiosNotAuth from "../../api/AxiosNotAuth";
import { useQuery } from "@tanstack/react-query";
export default function Category(){

    // const {error,loader,data:categories}=useFetch('categories');
    // if(loader)return <Loader/>
    // if(error)return <ErrorPage/>

    const fetchCategories=async()=>{
        const {data}= await AxiosNotAuth.get(`categories`);
        return data;
    }

    const {data,isLoading,isError,error}=useQuery({
      queryKey:['categories'],
      queryFn:fetchCategories,
      staleTime:1*60*60*1000,
      retry:3
    });

    if(isError)return <ErrorPage/>
    if(isLoading)return <Loader/>
    
    return ( 
    <Grid sx={{m:5}} container spacing={3} className={`${style.categorySection}`}>
    {
    data.map((category) =>
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