import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Loader from '../../shared/Loader';
import { Box, Button, Card, CardActions, CardContent, CardMedia, colors, Grid, Rating, TextareaAutosize, Typography } from "@mui/material";
import style from '../product/product.module.css'
import StarRateIcon from '@mui/icons-material/StarRate';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import { CartContext } from '../../context/CartContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AxiosNotAuth from '../../api/AxiosNotAuth';
import AxiosAuth from '../../api/AxiosAuth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useForm ,Controller} from 'react-hook-form';
import AddCommentIcon from '@mui/icons-material/AddComment';
import AxiosValues from '../../api/AxiosValues';
export default function Product() {
    // const {cartItems,setCartItems}=React.useContext(CartContext);
    const {id}=useParams("id");
    const userToken=localStorage.getItem('userToken');
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0.0); 
    const {register,handleSubmit,formState:{errors},control}=useForm({mode:'onChange'});
    // const [product,setProduct]=useState();
    // const [loader,setLoader]=useState(true);
    // const getProduct=async()=>{
    //    const response= await axios.get(`${import.meta.env.VITE_BURL}products/${id}`);
    //     console.log(response.data); 
    //     setProduct(response.data); 
    //     setLoader(false);
    // }
     const queryClient=  useQueryClient();
    const fetchProduct=async()=>{
        const {data}= await AxiosNotAuth.get(`products/${id}`);
        return data;
    }

    const {data,isLoading,isError,error}=useQuery({
      queryKey:['product',id],
      queryFn:fetchProduct,
      staleTime:5000,
      refetchOnWindowFocus:true,
      retry:3
    });

    

    const addToCartMutation=useMutation({
      mutationFn:(productId)=>{
        return  AxiosAuth.post(`Carts/${productId}`,{},);
      },
      onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:['cartItems']})
        toast.success('This product added successfully to your cart', {
          position: "top-right",
          autoClose:2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Zoom,
          });
          console.log(sucess);
      },
      onError:()=>{
        console.log(`error...`,error.message);
      }
    })
    // const addToCart=async(id)=>{
    //     const userToken=localStorage.getItem('userToken')
    //  const response= await axios.post(`${import.meta.env.VITE_BURL}Carts/${id}`,{},
    //     {
    //         headers:{
    //             AUTHORIZATION:`Bearer ${userToken}`
    //         }
    //     }
    //  );
    //     console.log(response); 
    //     if(response.status==200){
    //       toast.success('This product added successfully to your cart', {
    //       position: "top-right",
    //       autoClose:2000,
    //       hideProgressBar: false,
    //       closeOnClick: false,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "dark",
    //       transition: Zoom,
    //       });

    //       setCartItems(cartItems+1);
    //     }
    // }
// const onSubmitReview = (values) => {
//   addReview.mutate({
//     values,
//     productId: id,
//   });
// };



    const addReview=  useMutation({
     
      
      mutationFn:async({values,productId})=>{
      if (!rating || rating < 0.5) {
      toast.error('Please select a valid rating before submitting.', {
          position: "top-right",
          autoClose:2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Zoom,
          });
      return;
      }
      const review={
      "Rate":rating,
      "Comment":values.comment
      }
      try{
      const resp= await AxiosAuth.post(`products/${productId}/Reviews/Create`,review,);
      toast.success('This product added successfully to your cart', {
          position: "top-right",
          autoClose:2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Zoom,
          });
      console.log(resp);
      if(resp.status==400){
        toast.error(`You have already comment to this product or didn't buy it before`, {
          position: "top-right",
          autoClose:2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Zoom,
          });
      }
    }catch(error){
      toast.error(`You have already comment to this product  or didn't buy it before`, {
          position: "top-right",
          autoClose:2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Zoom,
          });
    }
      // add ................
      },
      onSuccess:()=>{
        
          console.log(sucess);
      },
      onError:()=>{
        console.log(`error...`,error.message);
         toast.error('You have already comment to this product', {
          position: "top-right",
          autoClose:2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Zoom,
          });
      }
    })

    if(isError)return <ErrorPage/>
    if(isLoading)return <Loader/>
  return (
    <>
    <Card sx={{m:4,}} >
         <CardMedia component={'img'} image={data.mainImg}  alt={data.description}>
            </CardMedia>
            <CardContent>
            <Typography component={'div'} variant="h6">
              {data.name}
            </Typography>
            <p  className={`${style.description}`}>
              {data.description}
            </p>
            <p className={`${style.lable}`}>
              Rate
            </p>
             <div className={`${style.row}`}>
              <Rating name="read-only" defaultValue={data.rate} precision={0.5}  readOnly />
              {data.rate}
             </div>
              
           
            <p className={`${style.lable}`}>
              Price
            </p>
            <span  className={`${style.price}`}>
              {data.price}$
            </span>
           </CardContent>
           <CardActions>
            <Button size="small" color='mainColor'  variant="contained" onClick={()=>addToCartMutation.mutate(data.id)} disabled={addToCartMutation.isPending || !userToken}>
              {addToCartMutation.isPending?'Adding...':'Add to Cart'} 
              </Button>
              <p className={style.loginmsg}>{!userToken?'you must login to add..':null}</p>
           </CardActions>
    </Card>

    <h2>Reviews</h2>
    {(data.reviews).length==0?<p>no reviews yet</p>:(data.reviews).map((review)=>

      <Card sx={{mb:2,ml:4 , width:'70%'}} style={{backgroundColor:'rgb(239, 236, 236)'}} >
            <CardContent sx={{pt:0,pb:0 , pl:4}}>
              <div className={`${style.row}`}>

              <AccountCircleIcon/>
              <div className={`${style.column}`}>
              <p className={`${style.userName}`}>
                {review.reviewerName}
              </p>
               <p  className={`${style.description}`}>
              {review.reviewDate.split('T')[0]}
              </p>
              </div>
              </div>
            
            
            <p  className={`${style.comment}`}>
              <span>comment:</span> {review.comment}
            </p>
            <Rating name="read-only" defaultValue={review.rate} precision={0.5}  readOnly />

            
              
           </CardContent>
    </Card>
    )
    }



      {
       <Box component={'form'} className={`${style.commentForm}`} onSubmit={handleSubmit( (values)=> addReview.mutate({values, productId: data.id,}))}>
        <div className={`${style.row}`}>
        <AddCommentIcon/>
        <p className={`${style.header}`}>Add your review</p>
        </div>
        {/* <Controller
        name="description"
        control={control}
        rules={{ required: 'Description is required' }}
        render={({ field }) => (
          <TextareaAutosize
            {...field}
            minRows={4}
            placeholder="Enter description"
            style={{ width: '100%', padding: '8px' }}
          />
        )}
      /> */}
         <Controller
          name="comment"
          control={control}
          rules={{ required:"Comment is required",
         
          }}

          render={({ field }) => (
            <>
          <TextareaAutosize
          {...field}
        minRows={5}
        style={{width:'80%', border:'2px solid grey', borderRadius:'8px', }}
        placeholder="Your Review" 
        ></TextareaAutosize>
        {errors.comment && (
        <Typography color="error">{errors.comment.message}</Typography>
        )}
        </>
        )}
         />
          
           
          
        
         <div className={`${style.row}`}>
          <span>Your rating:</span>
         <Rating
            name="Rating"
            value={rating}
            precision={0.5}
            onChange={(event, newrating) => {
              setRating(newrating);
            }}
          />
        </div>
           <div className={`${style.row}`}>
          <Button size="small" color='mainColor'  variant="contained" type="submit" disabled={!userToken}>Submit Review</Button>
          <p className={style.loginmsg}>{!userToken?'you must login to add your review..':null}</p>
          </div>
        </Box>
      }
    

    <ToastContainer />
    </>
  )
}
