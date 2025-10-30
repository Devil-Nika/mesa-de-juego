import type { Actions } from "../../domain/dnd5e/Actions";
import { useActionsDnd5e } from "../../hooks/dnd5e/useActions";

type ActionView = {
    pk: string;
    id: string;
    system: string;
    name: string;
    type?: string;        // p.ej. "Action", "Bonus Action", "Reaction"
    tags?: string[];      // p.ej. ["Attack", "Movement"]
    text?: string;        // descripción
    source?: string;      // p.ej. "SRD 5.2.1"
};

export default function Actions() {
    const { system, actions, isLoading, error } = useActions();

    if (isLoading) return <p className="opacity-70">Cargando acciones…</p>;
    if (error) return <p className="text-red-600">Error cargando acciones.</p>;

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Acciones ({system})</h2>
            {actions.length === 0 ? (
                <p className="opacity-70">No hay acciones cargadas.</p>
            ) : (
                <ul className="space-y-3">
                    {actions.map((a: ActionView) => (
                        <li key={a.pk} className="border rounded p-3">
                            <div className="flex items-center justify-between">
                                <div className="font-medium">{a.name}</div>
                                <div className="text-xs opacity-70">{a.type ?? "-"}</div>
                            </div>
                            {a.tags && a.tags.length ? (
                                <div className="text-xs mt-1 opacity-80">
                                    {a.tags.join(" · ")}
                                </div>
                            ) : null}
                            {a.text ? <p className="mt-2 whitespace-pre-wrap">{a.text}</p> : null}
                            {a.source ? <div className="text-xs mt-1 opacity-60">Fuente: {a.source}</div> : null}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
