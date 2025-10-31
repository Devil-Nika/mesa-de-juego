import { useFeatsDnd5e } from "../../hooks/dnd5e/useFeats";
import type { Feat } from "../../domain/dnd5e/Feats";

export default function Feats() {
    const { system, feats, isLoading, error } = useFeatsDnd5e();
    if (isLoading) return <p className="opacity-70">Cargando dotes…</p>;
    if (error) return <p className="text-red-600">Error cargando dotes.</p>;

    return (
        <>
            <h2 className="text-lg font-semibold mb-3">Dotes ({system})</h2>
            {feats.length === 0 ? (
                <p className="opacity-70">No hay dotes cargadas.</p>
            ) : (
                <ul className="space-y-2">
                    {feats.map((f: Feat) => (
                        <li key={f.pk} className="p-3 rounded bg-neutral-100">
                            <div className="font-semibold">{f.name}</div>
                            {f.category && <div className="text-sm opacity-80">Categoría: {f.category}</div>}
                            {f.description && <p className="text-sm mt-1">{f.description}</p>}
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}

