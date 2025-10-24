// src/pages/grimorio/Items.tsx
import { useItems } from "../../hooks";


export default function Items() {
    const { system, items, isLoading, error } = useItems(); // <- sin args

    if (isLoading) return <p className="opacity-70">Cargando objetos…</p>;
    if (error) return <p className="text-red-600">Error cargando objetos</p>;

    return (
        <>
            <h2 className="text-lg font-semibold mb-3">Objetos ({system})</h2>
            {items.length === 0 ? (
                <p className="opacity-70">No hay objetos cargados.</p>
            ) : (
                <ul className="list-disc pl-6">
                    {items.map((i: { pk: string; name: string }) => (
                        <li key={i.pk}>{i.name}</li>
                    ))}
                </ul>
            )}
        </>
    );
}
