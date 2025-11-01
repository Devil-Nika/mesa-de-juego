import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { SystemProvider } from "./contexts/SystemContext";
import "./index.css"; // tu hoja global

// Montaje seguro del root
const container = document.getElementById("root");
if (!container) {
    throw new Error("No se encontró el elemento #root en index.html");
}

const root = createRoot(container);

// Render principal
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <SystemProvider>
                <App />
            </SystemProvider>
        </BrowserRouter>
    </React.StrictMode>
);
