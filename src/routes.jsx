import { createBrowserRouter } from "react-router";
import MainLayout from "./layout/MainLayout";
import ErrorPage from "./pages/errorPage/ErrorPage";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Cart from "./pages/cart/Cart";
import Shop from "./pages/shop/Shop";
import ForgetStep1 from "./pages/forgetPassword/ForgetStep1";
import ForgetStep2 from "./pages/forgetPassword/ForgetStep2";
import ForgetStep3 from "./pages/forgetPassword/ForgetStep3";
import Product from "./pages/product/Product";
import Checkout from "./pages/checkout/Checkout";
import ProtectedRouter from "./components/protectedRouter/ProtectedRouter";
const routes=createBrowserRouter([
    {
        path:'/',
        element:<MainLayout/>,
        errorElement:<ErrorPage/>,
        children:[
            {
                index:true,
                element:<Home/>
            },
            {
                path:'/shop',
                element:<Shop/>
            },
            {
                path:'/cart',
                element:<ProtectedRouter><Cart/></ProtectedRouter>
            },
            {
                path:'/login',
                element:<Login/>
            },
            {
                path:'/register',
                element:<Register/>
            },
            {
                path:'/forgetStep1',
                element:<ForgetStep1/>
            },
            {
                path:'/forgetStep2',
                element:<ForgetStep2/>
            },
            {
                path:'/forgetStep3',
                element:<ForgetStep3/>
            },
            {
                path:'/product/:id',
                element:<Product/>
            },
            {
                path:'/checkout',
                element:<ProtectedRouter><Checkout/></ProtectedRouter>
            },
        ]

        
    }
]);

export default routes;