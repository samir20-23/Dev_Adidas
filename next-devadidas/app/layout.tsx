import type { Metadata } from "next";
import "./globals.css";
import "./css/main.css";
import "./i18n/i18n";
import { ThemeProvider } from "./contexts/ThemeContext";
import MainLayout from "./components/MainLayout";
import Script from "next/script";

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
        {/* Font Awesome stylesheet */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      {/* suppressHydrationWarning prevents React from complaining about small attribute differences */}
      <body suppressHydrationWarning>
        <ThemeProvider>
          <MainLayout>{children}</MainLayout>
        </ThemeProvider>

        <Script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js" strategy="afterInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/v4-shims.min.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
