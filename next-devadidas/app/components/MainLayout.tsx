'use client';

import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import Footer from "./footer";
import Menubar from "./menubar";
import React from "react";

interface MainLayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    const pathname = usePathname();

    // Exact paths to hide components on
    const hideOnExactPaths = ["/", "/load", "/start"];

    const hideNavPaths = ["/login", "/register", "/settings"];
    const hideFooterPaths = ["/settings", "/register"];
    const hideMenuPaths = ["/login", "/register", "/settings"];

    // Check for exact path match or if the path starts with one of the prefixes
    const showNav = !hideOnExactPaths.includes(pathname) && !hideNavPaths.some(path => pathname.startsWith(path));
    const showFooter = hideFooterPaths.some(path => pathname.startsWith(path));
    const showMenu = !hideOnExactPaths.includes(pathname) && !hideMenuPaths.some(path => pathname.startsWith(path));

    return (
        <div className="layout">
            {showNav && <Navbar />}
            <main className="main">
                {children}
            </main>
            {showFooter && <Footer />}
            {showMenu && <Menubar />}
        </div>
    );
}