import React, { useEffect, useState } from 'react'
import Product from '../../components/products/Products.jsx'
import style from '../products/products.module.css'
import { Box, TextField,Button, Card, CardActions, CardContent, CardMedia, createTheme, Grid, Rating, ThemeProvider, Typography  } from '@mui/material'
import { useQuery } from '@tanstack/react-query';
import AxiosNotAuth from '../../api/AxiosNotAuth.jsx';
import { useForm } from 'react-hook-form';
import ErrorPage from '../errorPage/ErrorPage.jsx';
import Loader from '../../shared/Loader.jsx';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from 'react-router';
import { toast, Zoom } from 'react-toastify';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
export default function Products() {

  const limit=4;
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 100,
      },
    },
  };

const filterBy = [
  'Price A-Z',
  'Price Z-A',
  'Name A-Z',
  'Name Z-A',

];
const [loading,setLoading]=useState(false);
const [errorvalue,setError]=useState("");
const {register,handleSubmit,formState:{errors}}=useForm({mode:'onChange', defaultValues: {search: "", }});
const [products,setProducts]=useState({
        "totalCount": 0,
        "page": 0,
        "limit": 0,
        "totalPages": 0,
        "data": []
      });
  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: limit,
    query: "",
    sortBy: "",
    order: "",
  });





  const handlePage =async (event, value) => {
     setQueryParams(prev => ({
    ...prev,
    page: value
  }));
  };

  const handleChange =async (event) => {

    const value=event.target.value;
    console.log('value',value)
      let sortBy = "";
      let order = "";

      if (value === 'Price A-Z') {
        sortBy = "price";
        order = "asc";
      } else if (value === 'Price Z-A') {
        sortBy = "price";
        order = "desc";
      } else if (value === 'Name A-Z') {
        sortBy = "name";
        order = "asc";
      } else if (value === 'Name Z-A') {
        sortBy = "name";
        order = "desc";
      }

      setQueryParams(prev => ({
        ...prev,
        sortBy,
        order,
        page: 1  
      }));
      };


 const fetchSearch= async (values)=>{
    
    setQueryParams(prev => ({
    ...prev,
      query: values.search,
      page: 1 
    }));
      
  }



useEffect(() => {
  const fetchData = async () => {
    const { page, limit, query, sortBy, order } = queryParams;
    let url = `products?page=${page}&limit=${limit}`;
    if (query) url += `&query=${query}`;
    if (sortBy) url += `&sortBy=${sortBy}&order=${order}`;

    try {
      setLoading(true);
      const response = await AxiosNotAuth.get(url);
      setProducts(response.data);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [queryParams]);


    if(errorvalue)return <ErrorPage/>
    if(loading)return <Loader/>
  return ( 
    <>
   
        <div className={`${style.row}`}>
           <h2>Our Products </h2>
           
        <Box component={'form'} className={`${style.searchForm}`} onSubmit={handleSubmit(fetchSearch)}>
        <div className={`${style.searchLarge}`}>
        <TextField 
        sx={{ m: 1, width: 240, mt: 3}}
        size="small"
        {...register('search',
          {required:"Search value is required",},
          
        )}
          helperText={errors.search?errors.search.message:null}
          error={errors.search}
          id="demo-helper-text-aligned-no-helper"
        />
        <Button type='submit' className={`${style.formButton} `} color='mainColor'  variant="contained" size="small" sx={{ mt: 3,p:1 }} ><SearchIcon/></Button>
        </div>
    <FormControl sx={{ m: 1, width: 120, mt: 3 }} size="small">
      
        <Select
          displayEmpty
          value={''}
          onChange={handleChange}
          input={<OutlinedInput />}
         Value={(selected) => {
            if (selected.length === 0) {
              return <em><div className={`${style.filterrow}`}><FilterListIcon/>Filters</div></em>;
            }

            return selected;
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="">
            <div className={`${style.filterrow}`}><FilterListIcon/>Filters</div>
          </MenuItem>
          {filterBy.map((filterType) => (
            <MenuItem key={filterType} value={filterType}>
              {filterType}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </Box>
        </div>

          
        <Box component={'form'} className={`${style.rowSmall}`} onSubmit={handleSubmit(fetchSearch)}>
        <TextField 
        sx={{ m: 1, width: 240, mt: 3}}
        size="small"
        {...register('search',
          {required:"Search value is required",},
          
        )}
          helperText={errors.search?errors.search.message:null}
          error={errors.search}
          id="demo-helper-text-aligned-no-helper"
        />
        <Button type='submit' className={`${style.formButton}`} color='mainColor'  variant="contained" size="small" sx={{ mt: 2,p:1 }} ><SearchIcon/></Button>
    
    
        </Box>
        

        <div className={`${style.productContent}`}>

        {<Grid sx={{m:5}} container rowSpacing={4} columnSpacing={4} className={`${style.productSection}`}>
             { products.data.length==0?<p>no Products</p>:
             (products.data).map((product) =>
                 <Grid  item  xs={12} sm={4} md={3} lg={2} xl={2} >
                 <Card key={product.id} className={`${style.productDiv}`}>
                     <CardMedia component={'img'} image={product.mainImg} className={`${style.productImg}`}  alt={product.description}>
         
                     </CardMedia>
                     <CardContent sx={{width:'100%'}}>
                     <Typography component={'div'} variant="h6">
                       {product.name}
                     </Typography>
                     <p className={`${style.description}`}>
                       {product.description}
                     </p>
                     <div className={`${style.row}`}>
                     <span className={`${style.price}`}>
                       {product.price}$
                     </span>
                      <Rating name="read-only" defaultValue={product.rate} precision={0.5}  readOnly />
                     </div>
                  
                    </CardContent>
                    <CardActions>
                     <Button size="small" component={Link} to={`/product/${product.id}`}>Details</Button>
                    </CardActions>
         
                </Card>
         
                 </Grid>
               
                 )
         }
             
             </Grid>
          
          
        }

        <Box spacing={2} >
          <Pagination color="primary" count={products.totalPages} page={queryParams.page} onChange={handlePage} />
        </Box>
        </div>
        </>
  )
}
