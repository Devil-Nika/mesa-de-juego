import { useMagicItems } from "../../hooks";
import type { MagicItem } from "../../domain/dnd5e/MagicItems";

export default function MagicItems() {
    const { system, data, isLoading, error } = useMagicItems();

    if (isLoading) return <p className="opacity-70">Cargando objetos mágicos…</p>;
    if (error) return <p className="text-red-600">Error cargando objetos mágicos.</p>;

    const magicItems = data as MagicItem[];

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Objetos mágicos ({system})</h2>
            {magicItems.length === 0 ? (
                <p className="opacity-70">No hay objetos mágicos cargados.</p>
            ) : (
                <ul className="space-y-3">
                    {magicItems.map(mi => (
                        <li key={mi.pk} className="border rounded p-3">
                            <div className="font-medium">{mi.name}</div>
                            {mi.rarity && <div className="text-sm opacity-80">Rareza: {mi.rarity}</div>}
                            {mi.requiresAttunement !== undefined && (
                                <div className="text-sm opacity-80">
                                    Sintonización: {mi.requiresAttunement ? "Requiere" : "No requiere"}
                                </div>
                            )}
                            {mi.description && <p className="text-sm mt-2">{mi.description}</p>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
