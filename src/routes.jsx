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
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";
import Profile from "./pages/profile/Profile";
import OrderDetails from "./pages/order/OrderDetails";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Products from "./pages/products/Products";
import Categories from "./pages/categories/Categories";
import CategoryProducts from "./pages/categoryProducts/CategoryProducts";
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
            {
                path:'/checkoutSuccess',
                element:<ProtectedRouter><CheckoutSuccess/></ProtectedRouter>
            },
             
            {
                path:'/profile/:index',
                element:<ProtectedRouter><Profile/></ProtectedRouter>
            },
            {
                path:'/orderDetails/:id',
                element:<ProtectedRouter><OrderDetails/></ProtectedRouter>
            },
             {
                path:'/About',
                element:<About/>
            },
             {
                path:'/Contact',
                element:<Contact/>
            },
             {
                path:'/Products',
                element:<Products/>
            },
             {
                path:'/Categories',
                element:<Categories/>
            },
             {
                path:'/CategoryProducts/:name/:id',
                element:<CategoryProducts/>
            },
        ]

        
    }
]);

export default routes;