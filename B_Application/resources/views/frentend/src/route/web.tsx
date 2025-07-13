import { createBrowserRouter } from "react-router-dom";
import StartPage from "../pages/StartPage.tsx";
import LoadPageLogo from "../pages/LoadPageLogo.tsx";
import Home from "../pages/home.tsx";
import SettingsPage from "../pages/SettingsPage.tsx";
import LoginPage from "../pages/auth/LoginPage.tsx";
import RegisterPage from "../pages/auth/RegisterPage.tsx";
import Layouts from "../layouts/index.tsx";

export const router = createBrowserRouter([
    {
        element: <Layouts />,
        children: [
            {
                path: "/settings",
                element: <SettingsPage />,
            },
        ],
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "load",
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
    {
        path: "/home",
        element: <Home />,
    }, 
]);
