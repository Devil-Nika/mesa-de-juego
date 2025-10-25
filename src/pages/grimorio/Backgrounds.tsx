import type { Background as BackgroundType } from "../../domain/types";
import { useBackgrounds } from "../../hooks";

export default function Backgrounds() {
    const { system, backgrounds, isLoading, error } = useBackgrounds();

    if (isLoading) return <p className="opacity-70">Cargando trasfondos…</p>;
    if (error) return <p className="text-red-600">Error cargando trasfondos</p>;

    return (
        <>
            <h2 className="text-lg font-semibold mb-3">Trasfondos ({system})</h2>
            {backgrounds.length === 0 ? (
                <p className="opacity-70">No hay trasfondos cargados.</p>
            ) : (
                <ul className="space-y-3">
                    {backgrounds.map((b: BackgroundType) => (
                        <li key={b.pk} className="border rounded p-3">
                            <div className="font-medium">{b.name}</div>
                            {b.feat && <div className="text-sm opacity-80">Feat: {b.feat}</div>}
                            <div className="text-xs opacity-60">{b.source ?? "SRD"}</div>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
