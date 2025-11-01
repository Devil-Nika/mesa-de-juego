import { useFeats } from "../../hooks";
import type { Feat } from "../../domain/dnd5e/Feats";

export default function Feats() {
    const { system, data, isLoading, error } = useFeats();

    if (isLoading) return <p className="opacity-70">Cargando dotes…</p>;
    if (error) return <p className="text-red-600">Error cargando dotes.</p>;

    const feats = data as Feat[];

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Dotes ({system})</h2>
            {feats.length === 0 ? (
                <p className="opacity-70">No hay dotes cargadas.</p>
            ) : (
                <ul className="space-y-3">
                    {feats.map(f => (
                        <li key={f.pk} className="border rounded p-3">
                            <div className="font-medium">{f.name}</div>
                            {f.category && (
                                <div className="text-xs inline-block mt-1 px-2 py-0.5 rounded bg-neutral-200">
                                    {f.category}
                                </div>
                            )}
                            {f.prerequisite && (
                                <div className="text-sm mt-1 opacity-80">Requisito: {f.prerequisite}</div>
                            )}
                            {f.description && <p className="text-sm mt-2">{f.description}</p>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
