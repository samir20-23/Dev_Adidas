// src/layouts/Layout.tsx
import { Outlet, useLocation } from "react-router-dom"
import Navbar from "../components/navbar"
import Footer from "../components/footer"
import "./css_layouts/main.css"
import Menubar from "../components/menubar"
function Layout() {
    const location = useLocation()

    // paths where we hide navbar/footer
    const hideNavPaths = ["/login", "/register", "/settings", "/load"]
    const hideFooterPaths = ["/settings", "/register"]
    const hideMenuPaths = ["/cart", "/product"]

    // check if current path starts with any hide path (supports dynamic routes)
    const showNav = !hideNavPaths.some(path => location.pathname.startsWith(path))
    const showFooter = hideFooterPaths.some(path => location.pathname.startsWith(path))
    const showMenu = hideMenuPaths.some(path => location.pathname.startsWith(path))

    return (
        <div className="layout">
            {showNav && <Navbar />}
            <main className="main">
                <Outlet />
            </main>
            {showFooter && <Footer />}
            {showMenu && <Menubar />}
        </div>
    )
}

export default Layout
