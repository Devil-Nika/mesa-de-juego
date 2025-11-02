import "./index.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import SystemProvider from "./contexts/SystemProvider";
import LocaleProvider from "./contexts/LocaleProvider";
import { seedSystem } from "./services/seed";

const container = document.getElementById("root");
if (!container) throw new Error("No se encontró #root");
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <LocaleProvider>         {/* 👈 primero Locale */}
                <SystemProvider>       {/* 👈 luego System */}
                    <App />
                </SystemProvider>
            </LocaleProvider>
        </BrowserRouter>
    </React.StrictMode>
);

// Seed en segundo plano
(async () => {
    try {
        console.time("seedSystem(dnd5e)");
        console.log("%c[seed] Iniciando seed de D&D 5e...", "color:#3af");
        await seedSystem("dnd5e");
        console.log("%c[seed] Seed de D&D 5e completado correctamente", "color:#3fa");
    } catch (err) {
        console.error("[seed] Falló el seed:", err);
    } finally {
        console.timeEnd("seedSystem(dnd5e)");
    }
})();
