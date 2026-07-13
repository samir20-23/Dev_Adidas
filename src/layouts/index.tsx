// src/layouts/Layout.tsx
import { Outlet, useLocation } from "react-router-dom"
import Navbar from "../components/navbar"
import "./css_layouts/main.css"
import Menubar from "../components/menubar"

function Layout() {
    const location = useLocation()
    const path = location.pathname;

    // These pages never show the top navbar or bottom menubar at all
    // (they are full-screen standalone pages handled outside this layout)
    // Everything inside this layout ALWAYS gets navbar + menubar
    return (
        <div className="layout">
            <Navbar />
            <main className="main">
                <Outlet />
            </main>
            <Menubar />
        </div>
    )
}

export default Layout
