import { useFeats } from "../../hooks/dnd5e";

type FeatView = {
    pk: string;
    name: string;
    category?: "Origin" | "General" | "Fighting Style" | "Epic Boon" | string;
    text?: string;
    source?: string;
};

export default function Feats() {
    const { system, feats, isLoading, error } = useFeats();

    if (isLoading) return <p className="opacity-70">Cargando dotes…</p>;
    if (error) return <p className="text-red-600">Error cargando dotes.</p>;

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Dotes ({system})</h2>
            {feats.length === 0 ? (
                <p className="opacity-70">No hay dotes cargadas.</p>
            ) : (
                <ul className="space-y-3">
                    {feats.map((f: FeatView) => (
                        <li key={f.pk} className="border rounded p-3">
                            <div className="font-medium">{f.name}</div>
                            <div className="text-sm opacity-80">{f.category ?? "-"}</div>
                            {f.text ? <p className="mt-2 whitespace-pre-wrap">{f.text}</p> : null}
                            {f.source ? <div className="text-xs mt-1 opacity-70">Fuente: {f.source}</div> : null}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
