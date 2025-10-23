import { useState } from "react";
import { useItems } from "../../hooks/useItems";

export default function GrimorioItems() {
    const [q, setQ] = useState("");
    const { items, loading } = useItems(q);

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Objetos</h2>
            <input className="border rounded px-3 py-2" placeholder="Buscar…" value={q} onChange={(e)=>setQ(e.target.value)} />
            {loading && <p className="opacity-70">Cargando…</p>}
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {items.map(it => (
                    <li key={it.pk} className="border rounded p-4 bg-white shadow-sm">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold">{it.name}</h3>
                            <span className="text-sm opacity-70">{it.type}</span>
                        </div>
                        <p className="text-sm">Coste: {it.cost ?? "-"}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
