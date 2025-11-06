// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "@components/Header";
import SystemGuard from "./routes/SystemGuard";
import GrimorioLayout from "@pages/grimorio/GrimorioLayout";
import OptionsPage from "@pages/Options";
import Home from "@pages/Home";

// ⬇️ TUS nombres de componentes/páginas
import GrimoireHub from "@pages/grimorio/GrimorioHub";
import EquipmentIndex from "@pages/grimorio/EquipmentIndex";
import ToolboxIndex from "@pages/grimorio/ToolboxIndex";
import OriginsIndex from "@pages/grimorio/OriginsIndex";

// hojas existentes
import Spells from "@pages/grimorio/Spells";
import Species from "@pages/grimorio/Species";
import Items from "@pages/grimorio/Items";
import Monsters from "@pages/grimorio/Monsters";
import Actions from "@pages/grimorio/Actions";
import Classes from "@pages/grimorio/Classes";
import Backgrounds from "@pages/grimorio/Backgrounds";
import Feats from "@pages/grimorio/Feats";
import MagicItems from "@pages/grimorio/MagicItems";
import Rules from "@pages/grimorio/Rules";

export default function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Navigate to="/dnd5e" replace />} />

                <Route path=":system" element={<SystemGuard />}>
                    <Route index element={<Home />} />

                    <Route path="encounter" element={<div className="p-6 opacity-60">WIP: Encounter</div>} />
                    <Route path="builder" element={<div className="p-6 opacity-60">WIP: Builder</div>} />

                    <Route path="grimoire" element={<GrimorioLayout />}>
                        <Route index element={<GrimoireHub />} />
                        <Route path="overview" element={<GrimoireHub />} />

                        {/* hubs/categorías */}
                        <Route path="class" element={<Classes />} />
                        <Route path="origins" element={<OriginsIndex />} />
                        <Route path="equipment" element={<EquipmentIndex />} />
                        <Route path="toolbox" element={<ToolboxIndex />} />

                        {/* hojas */}
                        <Route path="spells" element={<Spells />} />
                        <Route path="species" element={<Species />} />
                        <Route path="items" element={<Items />} />
                        <Route path="monsters" element={<Monsters />} />
                        <Route path="actions" element={<Actions />} />
                        <Route path="backgrounds" element={<Backgrounds />} />
                        <Route path="feats" element={<Feats />} />
                        <Route path="magic-items" element={<MagicItems />} />
                        <Route path="rules" element={<Rules />} />
                    </Route>

                    <Route path="options" element={<OptionsPage />} />
                </Route>

                <Route path="*" element={<Navigate to="/dnd5e" replace />} />
            </Routes>
        </>
    );
}
