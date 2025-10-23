// src/pages/grimorio/Monsters.tsx
import { useMonsters } from "../../hooks";

export default function Monsters() {
    const { system, monsters, isLoading, error } = useMonsters(); // <- sin args

    if (isLoading) return <p className="opacity-70">Cargando monstruos…</p>;
    if (error) return <p className="text-red-600">Error cargando monstruos</p>;

    return (
        <>
            <h2 className="text-lg font-semibold mb-3">Monstruos ({system})</h2>
            {monsters.length === 0 ? (
                <p className="opacity-70">No hay monstruos cargados.</p>
            ) : (
                <ul className="list-disc pl-6">
                    {monsters.map((m: { pk: string; name: string }) => (
                        <li key={m.pk}>{m.name}</li>
                    ))}
                </ul>
            )}
        </>
    );
}
