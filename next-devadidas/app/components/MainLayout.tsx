"use client"
import { usePathname } from "next/navigation"
import Navbar from "./navbar"
import Footer from "./footer"
import Menubar from "./menubar"
import "../app/css/main.css"

function MainLayout({ children }: { children: React.ReactNode }) {
    const location = usePathname()

    // paths where we hide navbar/footer
    const hideNavPaths = ["/login", "/register", "/load","/settings"]
    const hideFooterPaths = ["/settings", "/register"]
    const hideMenuPaths = ["/login", "/register", "/load","/settings"];

    // check if current path starts with any hide path (supports dynamic routes)
    const showNav = !hideNavPaths.some(path => location.startsWith(path))
    const showFooter = hideFooterPaths.some(path => location.startsWith(path))
    const showMenu = !hideMenuPaths.some(path => location.startsWith(path));

    return (
        <div className="layout">
            {showNav && <Navbar />}
            <main className="main">
                {children}
            </main>
            {showFooter && <Footer />}
            {showMenu && <Menubar />}
        </div>
    )
}

export default MainLayout
