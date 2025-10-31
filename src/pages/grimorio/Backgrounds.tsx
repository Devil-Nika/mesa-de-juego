import { useBackgroundsDnd5e } from "../../hooks/dnd5e/useBackgrounds";
import type { Background } from "../../domain/dnd5e/Backgrounds";

export default function Backgrounds() {
    const { system, backgrounds, isLoading, error } = useBackgroundsDnd5e();
    if (isLoading) return <p className="opacity-70">Cargando trasfondos…</p>;
    if (error) return <p className="text-red-600">Error cargando trasfondos.</p>;

    return (
        <>
            <h2 className="text-lg font-semibold mb-3">Trasfondos ({system})</h2>
            {backgrounds.length === 0 ? (
                <p className="opacity-70">No hay trasfondos cargados.</p>
            ) : (
                <ul className="space-y-2">
                    {backgrounds.map((b: Background) => (
                        <li key={b.pk} className="p-3 rounded bg-neutral-100">
                            <div className="font-semibold">{b.name}</div>
                            {b.feat && <div className="text-sm opacity-80">Otorga: {b.feat}</div>}
                            {b.description && <p className="text-sm mt-1">{b.description}</p>}
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
