import type { Feat as FeatType } from "../../domain/types";
import { useFeats } from "../../hooks";

export default function Feats() {
    const { system, feats, isLoading, error } = useFeats();

    if (isLoading) return <p className="opacity-70">Cargando dotes…</p>;
    if (error) return <p className="text-red-600">Error cargando dotes</p>;

    return (
        <>
            <h2 className="text-lg font-semibold mb-3">Dotes ({system})</h2>
            {feats.length === 0 ? (
                <p className="opacity-70">No hay dotes cargadas.</p>
            ) : (
                <ul className="space-y-3">
                    {feats.map((f: FeatType) => (
                        <li key={f.pk} className="border rounded p-3">
                            <div className="font-medium">{f.name}</div>
                            {f.category && <div className="text-sm opacity-80">Categoría: {f.category}</div>}
                            <div className="text-xs opacity-60">{f.source ?? "SRD"}</div>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
