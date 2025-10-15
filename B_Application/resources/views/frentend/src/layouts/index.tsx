// src/layouts/Layout.tsx
import { Outlet, useLocation } from "react-router-dom"
import Navbar from "../components/navbar"
import Footer from "../components/footer"
import "./css_layouts/main.css" 

function Layout() {
    const location = useLocation()

    // paths where we hide navbar/footer
    const hideNavPaths = ["/login", "/register", "/settings", "/load"]
    const hideFooterPaths = ["/settings", "/register"]

    // check if current path starts with any hide path (supports dynamic routes)
    const showNav = !hideNavPaths.some(path => location.pathname.startsWith(path))
    const showFooter = hideFooterPaths.some(path => location.pathname.startsWith(path))

    return (
        <div className="layout">
            {showNav && <Navbar />}
            <main className="main">
                <Outlet />
            </main>
            {showFooter && <Footer />}
        </div>
    )
}

export default Layout
