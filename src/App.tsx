import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import SystemGuard from "./routes/SystemGuard";
import GrimorioLayout from "./pages/grimorio/GrimorioLayout";

import Spells from "./pages/grimorio/Spells";
import Species from "./pages/grimorio/Species";
import Items from "./pages/grimorio/Items";
import Monsters from "./pages/grimorio/Monsters";
import Actions from "./pages/grimorio/Actions";

import { ensureSeeded } from "./services/seed";

export default function App() {
    // Ejecuta el seed al iniciar la app
    useEffect(() => {
        void ensureSeeded();
    }, []);

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Navigate to="/dnd5e" replace />} />
                <Route path="/:system" element={<SystemGuard />}>
                    <Route index element={<Navigate to="grimorio/spells" replace />} />
                    <Route path="grimorio" element={<GrimorioLayout />}>
                        <Route index element={<Navigate to="spells" replace />} />
                        <Route path="spells" element={<Spells />} />
                        <Route path="species" element={<Species />} />
                        <Route path="items" element={<Items />} />
                        <Route path="monsters" element={<Monsters />} />
                        <Route path="actions" element={<Actions />} />
                    </Route>
                </Route>
                <Route path="*" element={<Navigate to="/dnd5e/grimoire/spells" replace />} />
            </Routes>
        </Layout>
    );
}