import type { Metadata } from "next";
import "./globals.css";
import "./css/main.css";
import "./i18n/i18n";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";
import MainLayout from "./components/MainLayout";

export const metadata: Metadata = {
    title: "Dev Adidas",
    description: "Adidas Store Application",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
                />
            </head>
            <body suppressHydrationWarning>
                <ThemeProvider>
                    <CartProvider>
                        <MainLayout>{children}</MainLayout>
                    </CartProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
