'use client';

import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import Menubar from "./menubar";
import React from "react";

interface MainLayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    const pathname = usePathname();

    // Pages that show NO layout at all (full-screen experiences)
    const fullscreenPaths = ["/", "/load", "/start"];

    // Pages that show NO top navbar
    const hideNavPaths = ["/login", "/register", "/settings", "/checkout"];

    // Pages that show NO bottom menubar
    const hideMenuPaths = ["/login", "/register", "/settings", "/checkout"];

    const isFullscreen = fullscreenPaths.includes(pathname);
    const showNav = !isFullscreen && !hideNavPaths.some(p => pathname.startsWith(p));
    const showMenu = !isFullscreen && !hideMenuPaths.some(p => pathname.startsWith(p));

    return (
        <div className="layout">
            {showNav && <Navbar />}
            <main className="main" style={isFullscreen ? { paddingTop: 0, paddingBottom: 0 } : undefined}>
                {children}
            </main>
            {showMenu && <Menubar />}
        </div>
    );
}