import { useRules } from "../../hooks/dnd5e/useRules";
import type { Rule } from "../../domain/dnd5e/Rules";

export default function Rules() {
    const { system, data: rules, isLoading, error } = useRules();

    if (isLoading) return <p className="opacity-70">Cargando reglas…</p>;
    if (error) return <p className="text-red-600">Error cargando reglas.</p>;

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Reglas ({system})</h2>

            {rules.length === 0 ? (
                <p className="opacity-70">No hay reglas cargadas.</p>
            ) : (
                <ul className="space-y-3">
                    {rules.map((r: Rule) => (
                        <li key={r.pk} className="border rounded p-3">
                            <div className="font-medium">{r.name}</div>
                            {r.tag ? (
                                <div className="text-xs inline-block mt-1 px-2 py-0.5 rounded bg-neutral-200">
                                    {r.tag}
                                </div>
                            ) : null}
                            {r.summary ? (
                                <p className="text-sm mt-2 opacity-80">{r.summary}</p>
                            ) : null}
                            {r.text ? (
                                <p className="text-sm mt-2 whitespace-pre-wrap">{r.text}</p>
                            ) : null}
                            {r.source ? (
                                <div className="text-xs mt-2 opacity-60">Fuente: {r.source}</div>
                            ) : null}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
