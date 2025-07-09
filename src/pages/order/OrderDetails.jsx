import React from 'react'
import { useParams } from 'react-router'
import AxiosAuth from '../../api/AxiosAuth';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../shared/Loader';
import ErrorPage from '../errorPage/ErrorPage';
import { Card, CardActions, CardContent,} from '@mui/material';
import style from '../order/order.module.css'
import DateRangeIcon from '@mui/icons-material/DateRange';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import PaymentIcon from '@mui/icons-material/Payment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
export default function OrderDetails() {
    const {id}= useParams('id');
    console.log(id);
     const fetchOrder=async()=>{
        const response= await AxiosAuth.get(`Orders/${id}`);
        console.log(response);
        return response.data;
    }

    const {data,isLoading,isError,error,refetch}=useQuery({
      queryKey:['Order',id],
      queryFn:fetchOrder,
      staleTime:0,
       refetchOnWindowFocus:true,
      retry:3
    });

    if(isError)return <ErrorPage/>
    if(isLoading)return <Loader/>
  return (
    <>
          <Card sx={{ boxShadow: 3  }} key={data.id} className={`${style.productDiv}`}>
          
            <CardContent  className={`${style.section}`}>

           <div className={`${style.details}`}>
              <div  className={`${style.row}`} >
                <DateRangeIcon/>
                <p >Order Date : </p>
                <p className={`${style.description}`} >{(data.orderDate).split('T')[0]}</p>
              </div>
           
              <div  className={`${style.row}`} >
                <PendingActionsIcon/>
                <p >Order Status : </p>
                 <p className={`${style.description}`}>
                  {data.orderStatus}
                </p>
              </div>

              <div  className={`${style.row}`} >
                <PaymentIcon/>
                <p >Payment method : </p>
                 <p className={`${style.description}`}>
                  {data.paymentMethodType}
                </p>
              </div>

              <div  className={`${style.row}`} >
                <AttachMoneyIcon/>
                <p >Order Price : </p>
                 <p className={`${style.description}`}>
                  {data.totalPrice}
                </p>
              </div>

              
               
                 <TableContainer sx={{width:'100%', mt:5}} style={{backgroundColor:'rgb(191, 241, 241)'}} component={Paper}>
                <Table   aria-label="simple table">
                    <TableHead>
                    <TableRow >
                    <span className={`${style.tableHead}`}>Order items</span>
                     
                    </TableRow>
                    <TableRow>
                        <TableCell>Product name</TableCell>
                        <TableCell align="right">Total Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {data.items.map((product)=> (
                        <TableRow
                        key={product.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {product.productName}
                        </TableCell>
                        <TableCell align="right">{`$${product.totalPrice}`}</TableCell>
                        
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
           </div>
            </CardContent>

       </Card>
    </>
  )
}
