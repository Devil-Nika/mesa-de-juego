import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSystem } from "./contexts/SystemContext";
import { seedIfNeeded } from "./services/seed";

import SystemGuard from "./pages/SystemGuard";
import GrimorioLayout from "./pages/grimoire/Layout";
import GrimorioSpells from "./pages/grimoire/Spells";
import GrimorioSpecies from "./pages/grimoire/Species";
import GrimorioItems from "./pages/grimoire/Items";

export default function App() {
    const { system } = useSystem();
    const [ready, setReady] = useState(false);

    useEffect(() => {
        (async () => {
            await seedIfNeeded(system);
            setReady(true);
        })();
    }, [system]);

    if (!ready) return <p className="p-6 opacity-70">Inicializando base local…</p>;

    return (
        <BrowserRouter>
            <header className="bg-white shadow p-4">
                <h1 className="text-xl font-semibold">Mesa de Juego</h1>
            </header>

            <Routes>
                <Route path="/" element={<Navigate to="/dnd5e/grimoire/spells" replace />} />
                <Route path="/:system/grimoire" element={<SystemGuard><GrimorioLayout /></SystemGuard>}>
                    <Route index element={<Navigate to="spells" replace />} />
                    <Route path="spells" element={<GrimorioSpells />} />
                    <Route path="species" element={<GrimorioSpecies />} />
                    <Route path="items" element={<GrimorioItems />} />
                </Route>
                <Route path="*" element={<Navigate to="/dnd5e/grimoire/spells" replace />} />
            </Routes>
        </BrowserRouter>
    );
}
