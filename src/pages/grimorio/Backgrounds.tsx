import { useBackgrounds } from "../../hooks/dnd5e";

type BackgroundView = {
    pk: string;
    name: string;
    feat?: string;
    skills?: string[];
    tool?: string;
    equipment?: string;
    text?: string;
    source?: string;
};

export default function Backgrounds() {
    const { system, backgrounds, isLoading, error } = useBackgrounds();

    if (isLoading) return <p className="opacity-70">Cargando trasfondos…</p>;
    if (error) return <p className="text-red-600">Error cargando trasfondos.</p>;

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Trasfondos ({system})</h2>
            {backgrounds.length === 0 ? (
                <p className="opacity-70">No hay trasfondos cargados.</p>
            ) : (
                <ul className="space-y-3">
                    {backgrounds.map((b: BackgroundView) => (
                        <li key={b.pk} className="border rounded p-3">
                            <div className="font-medium">{b.name}</div>
                            <div className="text-sm mt-1">
                                {b.feat ? <span className="mr-3"><strong>Feat:</strong> {b.feat}</span> : null}
                                {b.skills && b.skills.length ? (
                                    <span className="mr-3"><strong>Skills:</strong> {b.skills.join(", ")}</span>
                                ) : null}
                                {b.tool ? <span className="mr-3"><strong>Herramienta:</strong> {b.tool}</span> : null}
                            </div>
                            {b.equipment ? (
                                <div className="text-sm mt-1"><strong>Equipo:</strong> {b.equipment}</div>
                            ) : null}
                            {b.text ? <p className="mt-2 whitespace-pre-wrap">{b.text}</p> : null}
                            {b.source ? <div className="text-xs mt-1 opacity-70">Fuente: {b.source}</div> : null}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
