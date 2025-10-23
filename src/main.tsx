import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { SystemProvider } from "./contexts/SystemContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <SystemProvider>
                <App />
            </SystemProvider>
        </BrowserRouter>
    </React.StrictMode>
);
