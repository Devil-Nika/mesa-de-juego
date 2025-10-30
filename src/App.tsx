//*import { useEffect, Suspense, lazy } from "react";
//*import { Routes, Route, Navigate } from "react-router-dom";
//*import { Layout } from "./components/Layout";
//*import SystemGuard from "./routes/SystemGuard";
//*import GrimorioLayout from "./pages/grimorio/GrimorioLayout";
//*import { Routes, Route, Navigate } from "react-router-dom";
//*import GrimorioLayout from "./pages/grimoire/GrimorioLayout";

// páginas básicas (crea el resto igual)
import Spells from "./pages/grimoire/Spells";
import Species from "./pages/grimoire/Species";
// TODO: Items, Monsters, Classes, Subclasses, Backgrounds, Feats, MagicItems

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/grimoire" replace />} />
            <Route path="/grimoire" element={<GrimorioLayout />}>
                <Route index element={<Navigate to="spells" replace />} />
                <Route path="spells" element={<Spells />} />
                <Route path="species" element={<Species />} />
                {/* Agregar otras rutas cuando pegues las páginas */}
                {/* <Route path="items" element={<Items />} /> */}
                {/* <Route path="monsters" element={<Monsters />} /> */}
                {/* ... */}
            </Route>
        </Routes>
    );
}
