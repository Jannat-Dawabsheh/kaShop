import React from 'react'
import AxiosAuth from '../../api/AxiosAuth';
import { useQuery } from '@tanstack/react-query';
import ErrorPage from '../../pages/errorPage/ErrorPage';
import Loader from '../../shared/Loader';
import { Tab, Box, Tabs ,Card, CardActions, CardContent,Typography,Button, useMediaQuery, useTheme} from '@mui/material';
import { Link } from 'react-router';
import style from '../orders/orders.module.css'
import PropTypes from 'prop-types';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

export default function Orders() {
  const [value, setValue] = React.useState(0);
   const theme = useTheme();
   const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    const fetchUserOrders=async()=>{
        const response= await AxiosAuth.get(`Orders`);
        console.log(response);
        return response.data;
    }

    const {data,isLoading,isError,error,refetch}=useQuery({
      queryKey:['UserOrders'],
      queryFn:fetchUserOrders,
      staleTime:0,
       refetchOnWindowFocus:true,
      retry:3
    });


    if(isError)return <ErrorPage/>
    if(isLoading)return <Loader/>
  return (
    <>
    <h2>My Orders</h2>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs orientation={isSmall ?"vertical": "horizontal"  } value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="All" {...a11yProps(0)} />
          <Tab label="Pending" {...a11yProps(1)} />
          <Tab label="Completed" {...a11yProps(2)} />
          <Tab label="Cancelled" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel  className={`${style.panel}`}  value={value} index={0} >
        {
          data.length==0?<p>No order yet  </p>:
          data.map((order) =>
            <Card key={order.id} className={`${style.productDiv}`}>
          
            <CardContent>
              <div  className={`${style.row}`} >
                <DateRangeIcon/>
                <p >Order Date : </p>
                <p className={`${style.description}`} >{(order.orderDate).split('T')[0]}</p>
              </div>
           
              <div  className={`${style.row}`} >
                <PendingActionsIcon/>
                <p >Order Status : </p>
                 <p className={`${style.description}`}>
                  {order.orderStatus}
                </p>
              </div>
           
            </CardContent>
           <CardActions>
            <Button sx={{pl:2, pt:0}} size="small" component={Link} to={`/orderDetails/${order.id}`}>Details</Button>
           </CardActions>

       </Card>
          )
        }
        
      </CustomTabPanel>
      <CustomTabPanel className={`${style.panel}`} value={value} index={1}>
          {
          data.filter((order)=>order.orderStatus=="Pending").length==0?<p>No order yet  </p>:data.filter((order)=>order.orderStatus=="Pending").map((order) =>
            <Card key={order.id} className={`${style.productDiv}`}>
          
            <CardContent>
              <div  className={`${style.row}`} >
                <DateRangeIcon/>
                <p >Order Date : </p>
                <p className={`${style.description}`} >{(order.orderDate).split('T')[0]}</p>
              </div>
           
              <div  className={`${style.row}`} >
                <PendingActionsIcon/>
                <p >Order Status : </p>
                 <p className={`${style.description}`}>
                  {order.orderStatus}
                </p>
              </div>
           
            </CardContent>
           <CardActions>
            <Button sx={{pl:2, pt:0}} size="small" component={Link} to={`/orderDetails/${order.id}`}>Details</Button>
           </CardActions>

       </Card>
          )
        }
      </CustomTabPanel>
      <CustomTabPanel className={`${style.panel}`} value={value} index={2}>
        {
          data.filter((order)=>order.orderStatus=="Approved").length==0?<p>No order yet  </p>:data.filter((order)=>order.orderStatus=="Approved").map((order) =>
            <Card key={order.id} className={`${style.productDiv}`}>
          
            <CardContent>
              <div  className={`${style.row}`} >
                <DateRangeIcon/>
                <p >Order Date : </p>
                <p className={`${style.description}`} >{(order.orderDate).split('T')[0]}</p>
              </div>
           
              <div  className={`${style.row}`} >
                <PendingActionsIcon/>
                <p >Order Status : </p>
                 <p className={`${style.description}`}>
                  {order.orderStatus}
                </p>
              </div>
           
            </CardContent>
           <CardActions>
            <Button sx={{pl:2, pt:0}} size="small" component={Link} to={`/orderDetails/${order.id}`}>Details</Button>
           </CardActions>

       </Card>
          )
        }
      </CustomTabPanel>
      <CustomTabPanel className={`${style.panel}`} value={value} index={3}>
        {
          data.filter((order)=>order.orderStatus=="Cancelled").length==0?<p>No order yet  </p>:data.filter((order)=>order.orderStatus=="Cancelled").map((order) =>
            <Card key={order.id} className={`${style.productDiv}`}>
          
            <CardContent>
              <div  className={`${style.row}`} >
                <DateRangeIcon/>
                <p >Order Date : </p>
                <p className={`${style.description}`} >{(order.orderDate).split('T')[0]}</p>
              </div>
           
              <div  className={`${style.row}`} >
                <PendingActionsIcon/>
                <p >Order Status : </p>
                 <p className={`${style.description}`}>
                  {order.orderStatus}
                </p>
              </div>
           
            </CardContent>
           <CardActions>
            <Button sx={{pl:2, pt:0}} size="small" component={Link} to={`/orderDetails/${order.id}`}>Details</Button>
           </CardActions>

       </Card>
          )
        }
      </CustomTabPanel>
    </Box>
       
    </>
  )
}
