import { Routes, Route, Navigate } from "react-router-dom";
import GrimorioLayout from "./pages/grimorio/GrimorioLayout";

// Páginas
import Spells from "./pages/grimorio/Spells";
import Species from "./pages/grimorio/Species";
import Items from "./pages/grimorio/Items";
import Monsters from "./pages/grimorio/Monsters";
import Actions from "./pages/grimorio/Actions";
import Classes from "./pages/grimorio/Classes";
import Subclasses from "./pages/grimorio/Subclasses";
import Backgrounds from "./pages/grimorio/Backgrounds";
import Feats from "./pages/grimorio/Feats";
import MagicItems from "./pages/grimorio/MagicItems";
import Rules from "./pages/grimorio/Rules";

function Home() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-3">Mesa de Juego</h1>
            <p className="opacity-80">Abrí el Grimorio para explorar el contenido.</p>
            <div className="mt-4">
                <a href="/grimoire" className="underline">Ir al Grimorio →</a>
            </div>
        </div>
    );
}

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />

            <Route path="grimoire" element={<GrimorioLayout />}>
                <Route index element={<Navigate to="actions" replace />} />
                {/* Orden alfabético */}
                <Route path="actions" element={<Actions />} />
                <Route path="backgrounds" element={<Backgrounds />} />
                <Route path="classes" element={<Classes />} />
                <Route path="feats" element={<Feats />} />
                <Route path="items" element={<Items />} />
                <Route path="magic-items" element={<MagicItems />} />
                <Route path="monsters" element={<Monsters />} />
                <Route path="rules" element={<Rules />} />
                <Route path="species" element={<Species />} />
                <Route path="spells" element={<Spells />} />
                <Route path="subclasses" element={<Subclasses />} />
            </Route>

            {/* 404 simple */}
            <Route path="*" element={<div className="p-6">Página no encontrada.</div>} />
        </Routes>
    );
}
