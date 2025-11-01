import { useBackgrounds } from "../../hooks";
import type { Background } from "../../domain/dnd5e";

export default function Backgrounds() {
    const { system, data, isLoading, error } = useBackgrounds();

    if (isLoading) return <p className="opacity-70">Cargando trasfondos…</p>;
    if (error) return <p className="text-red-600">Error cargando trasfondos.</p>;

    const backgrounds = data as Background[];

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Trasfondos ({system})</h2>
            {backgrounds.length === 0 ? (
                <p className="opacity-70">No hay trasfondos cargados.</p>
            ) : (
                <ul className="space-y-3">
                    {backgrounds.map(b => (
                        <li key={b.pk} className="border rounded p-3">
                            <div className="font-medium">{b.name}</div>
                            {b.feat && <div className="text-sm opacity-80">Dote: {b.feat}</div>}
                            {b.description && <p className="text-sm mt-2">{b.description}</p>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
