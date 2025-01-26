import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About/About";
import NotFound from "../pages/NotFound";
import Layout from "../components/Layout/Layout";
import Products from "../pages/Products/Products";
import Contact from "../pages/About/Contact";
import ProductDetails from "../pages/Products/ProductDetails";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Cart/Checkout";
import OrderConfirmation from "../pages/Cart/OrderConfirmation";
import Login from "../pages/Login/Login";
import Signup from "../pages/Login/Signup";
import Faq from "../pages/About/Faq";
import UserProfile from "../pages/UserProfile";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/products",
                element: <Products />,
            },
            {
                path: "/faq",
                element: <Faq />,
            },
            {
                path: "/products/:category/:productName",
                element: <ProductDetails />,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
            {
                path: "/cart",
                element: <Cart />,
            },
            {
                path: "/checkout",
                element: <Checkout />,
            },
            {
                path: "/profile",
                element: <UserProfile />,
            },
            {
                path: "/order-confirmation",
                element: <OrderConfirmation />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

function AppRoutes() {
    return <RouterProvider router={router} />;
}

export default AppRoutes;
