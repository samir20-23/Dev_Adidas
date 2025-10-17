import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client"; 
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import './i18n';

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Suspense fallback="loading...">
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </Suspense>
    </StrictMode>
);
