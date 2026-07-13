import { createBrowserRouter } from "react-router-dom";
import StartPage from "../pages/StartPage.tsx";
import LoadPageLogo from "../pages/LoadPageLogo.tsx";
import Home from "../pages/Home.tsx";
import SettingsPage from "../pages/SettingsPage.tsx";
import LoginPage from "../pages/auth/LoginPage.tsx";
import RegisterPage from "../pages/auth/RegisterPage.tsx";
import Layouts from "../layouts/index.tsx";
import ProductDetail from "../pages/ProductDetail.tsx";
import Detail from "../pages/Detail.tsx";
import Cart from "../pages/Cart.tsx";
import Payment from "../pages/Payment.tsx";
import ErrorBoundary from "../components/ErrorBoundary.tsx";
import NotificationsPage from "../pages/settings/NotificationsPage.tsx";
import PasswordPage from "../pages/settings/PasswordPage.tsx";
import AboutPage from "../pages/settings/AboutPage.tsx";
import HelpPage from "../pages/settings/HelpPage.tsx";
import ProfileEditPage from "../pages/settings/ProfileEditPage.tsx";

export const router = createBrowserRouter([
    {
        element: <Layouts />,
        errorElement: <ErrorBoundary />,
        children: [
            { path: "/settings", element: <SettingsPage /> },
            { path: "/settings/notifications", element: <NotificationsPage /> },
            { path: "/settings/password", element: <PasswordPage /> },
            { path: "/settings/about", element: <AboutPage /> },
            { path: "/settings/help", element: <HelpPage /> },
            { path: "/settings/profile", element: <ProfileEditPage /> },
            { path: "/home", element: <Home /> },
            { path: "/product/:id", element: <ProductDetail /> },
            { path: "/cart", element: <Cart /> },
            { path: "/detail", element: <Detail /> },
            { path: "/payment", element: <Payment /> },
        ],
    },
    { path: "/login", element: <LoginPage /> },
    { path: "/load", element: <LoadPageLogo /> },
    { path: "/register", element: <RegisterPage /> },
    { path: "/", element: <StartPage /> },
]);
