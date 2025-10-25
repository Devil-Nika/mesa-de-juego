import type { Spells as SpellType } from "../../domain/types";
import { useSpells } from "../../hooks";

function formatComponents(spell: SpellType): string {
    // Soporta el modelo { verbal, somatic, material: { hasM, text } | null }
    const parts: string[] = [];
    if ("components" in spell && spell.components) {
        const c = spell.components as {
            verbal?: boolean;
            somatic?: boolean;
            material?: { hasM?: boolean; text?: string } | null;
        };
        if (c.verbal) parts.push("V");
        if (c.somatic) parts.push("S");
        if (c.material?.hasM) parts.push(`M${c.material.text ? ` (${c.material.text})` : ""}`);
    }
    return parts.length ? parts.join(", ") : "—";
}

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
                <ul className="space-y-3">
                    {spells.map((s: SpellType) => (
                        <li key={s.pk} className="border rounded p-3">
                            <div className="font-medium">
                                {s.name}
                                {"level" in s && typeof s.level === "number" ? (
                                    <span className="ml-2 text-sm opacity-80">
                    {s.level === 0 ? " (Truco)" : ` (Nivel ${s.level})`}
                  </span>
                                ) : null}
                            </div>

                            <div className="mt-1 text-sm opacity-80">
                                {"school" in s && s.school ? s.school : "—"}
                                {"ritual" in s && s.ritual ? " · R" : ""}
                                {"concentration" in s && s.concentration ? " · C" : ""}
                            </div>

                            <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
                                {"castingTime" in s && s.castingTime ? (
                                    <div>Tiempo: {s.castingTime}</div>
                                ) : "casting" in s && (s as any).casting?.time ? (
                                    <div>Tiempo: {(s as unknown as { casting: { time: string } }).casting.time}</div>
                                ) : null}

                                {"range" in s && s.range ? <div>Alcance: {s.range}</div> : null}
                                <div>Componentes: {formatComponents(s)}</div>
                                {"duration" in s && s.duration ? <div>Duración: {s.duration}</div> : null}
                            </div>

                            {"description" in s && s.description ? (
                                <>
                                    <div className="mt-2 font-semibold">Descripción</div>
                                    <p className="text-sm leading-relaxed whitespace-pre-line">
                                        {s.description}
                                    </p>
                                </>
                            ) : null}

                            {"higherLevels" in s && s.higherLevels ? (
                                <>
                                    <div className="mt-2 font-semibold">A niveles superiores</div>
                                    <p className="text-sm leading-relaxed whitespace-pre-line">
                                        {s.higherLevels}
                                    </p>
                                </>
                            ) : null}

                            <div className="mt-2 text-xs opacity-60">{s.source ?? "SRD"}</div>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
