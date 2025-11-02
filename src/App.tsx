import { Routes, Route, Navigate } from "react-router-dom";
import SystemGuard from "./routes/SystemGuard";
import ShellLayout from "@components/ShellLayout";
import Home from "@pages/Home";
import ComingSoon from "@pages/ComingSoon";

// Grimorio (ya existente)
import GrimorioLayout from "@pages/grimorio/GrimorioLayout";
import GrimorioHub from "@pages/grimorio/GrimorioHub";
import ClassesIndex from "@pages/grimorio/classes/ClassesIndex";
import OriginsIndex from "@pages/grimorio/origins/OriginsIndex";
import FeatsIndex from "@pages/grimorio/feats/FeatsIndex";
import EquipmentIndex from "@pages/grimorio/equipment/EquipmentIndex";
import Spells from "@pages/grimorio/Spells";
import Monsters from "@pages/grimorio/Monsters";
import ToolboxIndex from "@pages/grimorio/toolbox/ToolboxIndex";
import Rules from "@pages/grimorio/Rules";

import OptionsPage from "@pages/Options";

export default function App() {
    return (
        <Routes>
            {/* Arranque general → al sistema por defecto */}
            <Route path="/" element={<Navigate to="/dnd5e" replace />} />

            {/* Guard por sistema + layout con header */}
            <Route path=":system" element={<SystemGuard />}>
                <Route element={<ShellLayout />}>
                    {/* Home vacía con solo el header visible */}
                    <Route index element={<Home />} />

                    {/* En desarrollo */}
                    <Route path="encounter" element={<ComingSoon labelKey="nav.encounter" />} />
                    <Route path="builder" element={<ComingSoon labelKey="nav.builder" />} />

                    {/* Grimorio (hub + secciones) */}
                    <Route path="grimoire" element={<GrimorioLayout />}>
                        <Route index element={<GrimorioHub />} />
                        <Route path="class" element={<ClassesIndex />} />
                        <Route path="origins" element={<OriginsIndex />} />
                        <Route path="feats" element={<FeatsIndex />} />
                        <Route path="equipment" element={<EquipmentIndex />} />
                        <Route path="spells" element={<Spells />} />
                        <Route path="monsters" element={<Monsters />} />
                        <Route path="toolbox" element={<ToolboxIndex />} />
                        <Route path="rules" element={<Rules />} />
                    </Route>

                    {/* Opciones */}
                    <Route path="options" element={<OptionsPage />} />
                </Route>
            </Route>

            <Route path="*" element={<Navigate to="/dnd5e" replace />} />
        </Routes>
    );
}
