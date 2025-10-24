// src/pages/grimorio/Spells.tsx
import { useSpells } from "../../hooks";
import type { Spells } from "../../domain/types";

// Extiende tu tipo base con los campos opcionales que vienen del JSON
type SpellLike = Spells & {
    school?: string;
    casting_time?: string;
    range?: string;
    duration?: string;
    ritual?: boolean;
    concentration?: boolean;
    description?: string;
    components?:
        | string[]
        | {
        verbal?: boolean;
        somatic?: boolean;
        material?: { hasM?: boolean; text?: string } | null;
    };
};

// Soporta componentes como array ["V","S","M"] o como objeto { verbal, somatic, material }
function componentsToText(
    components: SpellLike["components"]
): string | null {
    if (!components) return null;

    if (Array.isArray(components)) {
        return components.join(", ");
    }

    const parts: string[] = [];
    if (components.verbal) parts.push("V");
    if (components.somatic) parts.push("S");
    if (components.material?.hasM) {
        parts.push(
            components.material.text
                ? `M (${components.material.text})`
                : "M"
        );
    }
    return parts.length ? parts.join(", ") : null;
}

export default function Spells() {
    const { system, spells, isLoading, error } = useSpells();

    if (isLoading) return <p className="opacity-70">Cargando conjuros…</p>;
    if (error) return <p className="text-red-600">Error cargando conjuros</p>;

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Conjuros ({system})</h2>

            {spells.length === 0 ? (
                <p className="opacity-70">No hay conjuros cargados.</p>
            ) : (
                <ul className="grid gap-4 md:grid-cols-2">
                    {spells.map((s) => {
                        const spell = s as SpellLike; // 👈 solo para ampliar campos opcionales (sin any)
                        const comps = componentsToText(spell.components);

                        return (
                            <li key={spell.pk} className="rounded border bg-white shadow-sm p-4">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <h3 className="font-semibold text-base">{spell.name}</h3>
                                        <p className="text-sm opacity-80">
                                            Nivel {spell.level ?? 0} · {spell.school ?? "-"}
                                        </p>
                                    </div>
                                    <span className="text-xs px-2 py-0.5 rounded bg-neutral-100 border">
                    {spell.ritual ? "Ritual" : "Acción"}
                  </span>
                                </div>

                                <div className="mt-2 grid text-sm gap-1">
                                    {spell.casting_time && (
                                        <div>
                                            <span className="opacity-70">Tiempo: </span>
                                            {spell.casting_time}
                                        </div>
                                    )}
                                    {spell.range && (
                                        <div>
                                            <span className="opacity-70">Alcance: </span>
                                            {spell.range}
                                        </div>
                                    )}
                                    {comps && (
                                        <div>
                                            <span className="opacity-70">Componentes: </span>
                                            {comps}
                                        </div>
                                    )}
                                    {spell.duration && (
                                        <div>
                                            <span className="opacity-70">Duración: </span>
                                            {spell.duration}
                                            {spell.concentration ? " (Concentración)" : ""}
                                        </div>
                                    )}
                                </div>

                                {spell.description && (
                                    <details className="mt-3">
                                        <summary className="cursor-pointer text-sm underline">Descripción</summary>
                                        <p className="mt-2 text-sm leading-relaxed whitespace-pre-wrap">
                                            {spell.description}
                                        </p>
                                    </details>
                                )}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
