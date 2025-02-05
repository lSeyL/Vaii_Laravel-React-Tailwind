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
import AdminMain from "../pages/Admin/AdminMain";
import AdminOrders from "../pages/Admin/AdminOrders";
import AdminUsers from "../pages/Admin/AdminUsers";
import AdminProducts from "../pages/Admin/AdminProducts";
import ProtectedRoute from "../pages/Admin/ProtectedRoute";
import { useStateContext } from "../providers/userContext";
import AdminSummary from "../pages/Admin/AdminSummary";
import AdminAddProductForm from "../pages/Admin/AdminAddProductForm";
import AdminEditProductForm from "../pages/Admin/AdminEditProductForm";

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
            { path: "", element: <UserAccountSettings /> },
            { path: "my-orders", element: <UserOrders /> },
            { path: "my-favourites", element: <UserFavourites /> },
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
      element: <ProtectedRoute requiredRole="admin" />,
      children: [
        {
          path: "",
          element: <AdminMain />,
          children: [
            { path: "", element: <AdminSummary /> },
            { path: "orders", element: <AdminOrders /> },
            { path: "users", element: <AdminUsers /> },
            { path: "products", element: <AdminProducts /> },
            { path: "add-product", element: <AdminAddProductForm /> },
            { path: "edit/:productId", element: <AdminEditProductForm /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default AppRoutes;
