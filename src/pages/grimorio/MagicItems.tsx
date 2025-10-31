import { useMagicItemsDnd5e } from "../../hooks/dnd5e/useMagicItems";
import type { MagicItem } from "../../domain/dnd5e/MagicItems";

export default function MagicItems() {
    const { system, magicItems, isLoading, error } = useMagicItemsDnd5e();
    if (isLoading) return <p className="opacity-70">Cargando objetos mágicos…</p>;
    if (error) return <p className="text-red-600">Error cargando objetos mágicos.</p>;

    return (
        <>
            <h2 className="text-lg font-semibold mb-3">Objetos mágicos ({system})</h2>
            {magicItems.length === 0 ? (
                <p className="opacity-70">No hay objetos mágicos cargados.</p>
            ) : (
                <ul className="space-y-2">
                    {magicItems.map((m: MagicItem) => (
                        <li key={m.pk} className="p-3 rounded bg-neutral-100">
                            <div className="font-semibold">{m.name}</div>
                            <div className="text-sm opacity-80">
                                {m.rarity ?? "—"}{m.requiresAttunement ? " • Requiere sintonía" : ""}
                            </div>
                            {m.description && <p className="text-sm mt-1">{m.description}</p>}
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
