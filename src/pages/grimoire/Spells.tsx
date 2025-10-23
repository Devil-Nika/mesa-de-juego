import { useState } from "react";
import { useSpells } from "../../hooks/useSpells";

export default function GrimorioSpells() {
    const [q, setQ] = useState("");
    const { spells, loading } = useSpells({ q });

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Conjuros</h2>
            <input className="border rounded px-3 py-2" placeholder="Buscar…" value={q} onChange={(e)=>setQ(e.target.value)} />
            {loading && <p className="opacity-70">Cargando…</p>}
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {spells.map(s => (
                    <li key={s.pk} className="border rounded p-4 bg-white shadow-sm">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold">{s.name}</h3>
                            <span className="text-sm opacity-70">Nivel {s.level}</span>
                        </div>
                        <p className="text-sm opacity-80">{s.school}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
