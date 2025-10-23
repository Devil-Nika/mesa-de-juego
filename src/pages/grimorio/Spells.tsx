import { useSpells } from "../../hooks";

export default function Spells() {
    const { system, spells, isLoading, error } = useSpells();

    if (isLoading) return <p className="opacity-70">Cargando conjuros…</p>;
    if (error) return <p className="text-red-600">Error cargando conjuros</p>;

    return (
        <>
            <h2 className="text-lg font-semibold mb-3">Conjuros ({system})</h2>
            {spells.length === 0 ? (
                <p className="opacity-70">No hay conjuros cargados.</p>
            ) : (
                <ul className="list-disc pl-6">
                    {spells.map((s: { pk: string; name: string }) => (
                        <li key={s.pk}>{s.name}</li>
                    ))}
                </ul>
            )}
        </>
    );
}
