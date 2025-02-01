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

import Login from "../pages/Login/Login";
import Signup from "../pages/Login/Signup";
import Faq from "../pages/About/Faq";
import UserProfile from "../pages/User/UserProfile";
import UserOrders from "../pages/User/UserOrders";
import UserFavourites from "../pages/User/UserFavourites";
import UserAccountSettings from "../pages/User/UserAccountSettings";
import UserLogout from "../pages/User/UserLogout";
import AdminMain from "../pages/Admin/AdminMain";
import ProtectedRoute from "../pages/Admin/ProtectedRoute";
import { useStateContext } from "../providers/userContext";

function AppRoutes() {
  const { user } = useStateContext();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/products", element: <Products /> },
        { path: "/faq", element: <Faq /> },
        { path: "/products/:category/:slug", element: <ProductDetails /> },
        { path: "/contact", element: <Contact /> },
        { path: "/cart", element: <Cart /> },
        {
          path: "/profile",
          element: <UserProfile />,
          children: [
            { path: "my-orders", element: <UserOrders /> },
            { path: "my-favourites", element: <UserFavourites /> },
            { path: "account-settings", element: <UserAccountSettings /> },
            { path: "logout", element: <UserLogout /> },
          ],
        },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/checkout", element: <Checkout /> },
    { path: "*", element: <NotFound /> },
    {
      path: "/admin",
      element:
        user?.role === "admin" ? (
          <ProtectedRoute requiredRole="admin" />
        ) : (
          <NotFound />
        ),
      children: [
        { path: "", element: <AdminMain /> },
        { path: "product-form", element: <UserOrders /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default AppRoutes;
