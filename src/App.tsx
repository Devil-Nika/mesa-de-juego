import { Routes, Route, Navigate } from "react-router-dom";
import SystemGuard from "./routes/SystemGuard";
import GrimorioLayout from "./pages/grimorio/GrimorioLayout";
import OptionsPage from "./pages/Options";

import Spells from "./pages/grimorio/Spells";
import Species from "./pages/grimorio/Species";
import Items from "./pages/grimorio/Items";
import Monsters from "./pages/grimorio/Monsters";
import Actions from "./pages/grimorio/Actions";
import Classes from "./pages/grimorio/Classes";
// ❌ import Subclasses from "./pages/grimorio/Subclasses";
import Backgrounds from "./pages/grimorio/Backgrounds";
import Feats from "./pages/grimorio/Feats";
import MagicItems from "./pages/grimorio/MagicItems";
import Rules from "./pages/grimorio/Rules";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/dnd5e/grimoire/spells" replace />} />

            <Route path=":system" element={<SystemGuard />}>
                <Route path="grimoire" element={<GrimorioLayout />}>
                    <Route index element={<Navigate to="spells" replace />} />
                    <Route path="spells" element={<Spells />} />
                    <Route path="species" element={<Species />} />
                    <Route path="items" element={<Items />} />
                    <Route path="monsters" element={<Monsters />} />
                    <Route path="actions" element={<Actions />} />
                    <Route path="classes" element={<Classes />} /> {/* 👈 subclases van dentro */}
                    {/* ❌ <Route path="subclasses" element={<Subclasses />} /> */}
                    <Route path="backgrounds" element={<Backgrounds />} />
                    <Route path="feats" element={<Feats />} />
                    <Route path="magic-items" element={<MagicItems />} />
                    <Route path="rules" element={<Rules />} />
                </Route>

                {/* ⚙️ Opciones (cambiar idioma) */}
                <Route path="options" element={<OptionsPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/dnd5e/grimoire/spells" replace />} />
        </Routes>
    );
}
