import { StrictMode, Suspense, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import './i18n';
import Loading from "./components/loading.tsx";

function Root() {
    const [showApp, setShowApp] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowApp(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Suspense fallback={<Loading />}>
            <ThemeProvider>
                {showApp ? <App /> : <Loading />}
            </ThemeProvider>
        </Suspense>
    );
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Root />
    </StrictMode>
);
