import { createBrowserRouter } from "react-router-dom";
import StartPage from "../pages/StartPage.tsx";
import LoadPageLogo from "../pages/LoadPageLogo.tsx";
import Home from "../pages/Home.tsx";
import SettingsPage from "../pages/SettingsPage.tsx";
import LoginPage from "../pages/auth/LoginPage.tsx";
import RegisterPage from "../pages/auth/RegisterPage.tsx";
import Layouts from "../layouts/index.tsx";
import ProductDetail from "../pages/ProductDetail.tsx";
import Cart from "../pages/Cart.tsx";
import Payment from "../pages/Payment.tsx";

export const router = createBrowserRouter([
    {
        element: <Layouts />,
        children: [
            {
                path: "/settings",
                element: <SettingsPage />,
            },
            {
                path: "/home",
                element: <Home />,
            },
            {
                path: "/product/:id",
                element: <ProductDetail />,
            },
            {
                path: "/cart",
                element: <Cart />,
            },
            {
                path: "/payment",
                element: <Payment />,
            },
        ],
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/load",
        element: <LoadPageLogo />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        path: "/",
        element: <StartPage />,
    },
]);
