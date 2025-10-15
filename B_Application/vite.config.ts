import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: true, // expose on your LAN / to VS Code port‑forwarding
        port: 3001, // ← your new port
        strictPort: true, // if 3001 is busy, Vite will error instead of falling back
        open: true, // optional: auto‑open the browser
    },
});
