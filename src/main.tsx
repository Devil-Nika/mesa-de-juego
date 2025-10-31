// src/main.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { SystemProvider } from "./contexts/SystemContext";
import { seedSystem } from "./services/seed";

const container = document.getElementById("root");
if (!container) {
    throw new Error("No se encontró el elemento #root en index.html");
}

const root = createRoot(container);

// 1️⃣ Renderiza la app inmediatamente
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <SystemProvider>
                <App />
            </SystemProvider>
        </BrowserRouter>
    </React.StrictMode>
);

// 2️⃣ Ejecuta el seed en segundo plano
(async () => {
    try {
        console.time("seedSystem(dnd5e)");
        console.log("%c[seed] Iniciando seed de D&D 5e...", "color: #3af");
        await seedSystem("dnd5e");
        console.log("%c[seed] Seed de D&D 5e completado correctamente", "color: #3fa");
    } catch (err) {
        console.error("[seed] Falló el seed:", err);
    } finally {
        console.timeEnd("seedSystem(dnd5e)");
    }
})();
