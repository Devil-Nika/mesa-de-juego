import { useMagicItems } from "../../hooks/dnd5e";

type MagicItemView = {
    pk: string;
    name: string;
    rarity?: string;
    requiresAttunement?: boolean;
    text?: string;
    source?: string;
};

export default function MagicItems() {
    const { system, magicItems, isLoading, error } = useMagicItems();

    if (isLoading) return <p className="opacity-70">Cargando objetos mágicos…</p>;
    if (error) return <p className="text-red-600">Error cargando objetos mágicos.</p>;

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Objetos mágicos ({system})</h2>
            {magicItems.length === 0 ? (
                <p className="opacity-70">No hay objetos mágicos cargados.</p>
            ) : (
                <ul className="space-y-3">
                    {magicItems.map((mi: MagicItemView) => (
                        <li key={mi.pk} className="border rounded p-3">
                            <div className="font-medium">{mi.name}</div>
                            <div className="text-sm opacity-80">
                                {mi.rarity ?? "-"}{mi.requiresAttunement ? " · requiere sintonización" : ""}
                            </div>
                            {mi.text ? <p className="mt-2 whitespace-pre-wrap">{mi.text}</p> : null}
                            {mi.source ? <div className="text-xs mt-1 opacity-70">Fuente: {mi.source}</div> : null}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
