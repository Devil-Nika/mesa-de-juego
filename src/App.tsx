import { Routes, Route, Navigate } from "react-router-dom";

// 👇 OJO: carpeta "grimorio"
import GrimorioLayout from "./pages/grimorio/GrimorioLayout";
import Spells from "./pages/grimorio/Spells";
import Species from "./pages/grimorio/Species";
// Cuando los tengas listos, agregás:
// import Items from "./pages/grimorio/Items";
// import Monsters from "./pages/grimorio/Monsters";
// import Classes from "./pages/grimorio/Classes";
// import Subclasses from "./pages/grimorio/Subclasses";
// import Backgrounds from "./pages/grimorio/Backgrounds";
// import Feats from "./pages/grimorio/Feats";
// import MagicItems from "./pages/grimorio/MagicItems";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/grimorio" replace />} />
            <Route path="/grimorio" element={<GrimorioLayout />}>
                <Route index element={<Navigate to="spells" replace />} />
                <Route path="spells" element={<Spells />} />
                <Route path="species" element={<Species />} />
                {/*
        <Route path="items" element={<Items />} />
        <Route path="monsters" element={<Monsters />} />
        <Route path="classes" element={<Classes />} />
        <Route path="subclasses" element={<Subclasses />} />
        <Route path="backgrounds" element={<Backgrounds />} />
        <Route path="feats" element={<Feats />} />
        <Route path="magic-items" element={<MagicItems />} />
        */}
            </Route>
        </Routes>
    );
}
