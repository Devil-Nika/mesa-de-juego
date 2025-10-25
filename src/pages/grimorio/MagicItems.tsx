import type { MagicItem as MagicItemType } from "../../domain/types";
import { useMagicItems } from "../../hooks";

export default function MagicItems() {
    const { system, magicItems, isLoading, error } = useMagicItems();

    if (isLoading) return <p className="opacity-70">Cargando objetos mágicos…</p>;
    if (error) return <p className="text-red-600">Error cargando objetos mágicos</p>;

    return (
        <>
            <h2 className="text-lg font-semibold mb-3">Objetos mágicos ({system})</h2>
            {magicItems.length === 0 ? (
                <p className="opacity-70">No hay objetos mágicos cargados.</p>
            ) : (
                <ul className="space-y-3">
                    {magicItems.map((mi: MagicItemType) => (
                        <li key={mi.pk} className="border rounded p-3">
                            <div className="font-medium">{mi.name}</div>
                            {mi.rarity && <div className="text-sm opacity-80">Rareza: {mi.rarity}</div>}
                            {"requiresAttunement" in mi && (
                                <div className="text-sm opacity-80">
                                    Sintonización: {mi.requiresAttunement ? "sí" : "no"}
                                </div>
                            )}
                            <div className="text-xs opacity-60">{mi.source ?? "SRD"}</div>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
