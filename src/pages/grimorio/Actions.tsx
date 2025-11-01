import { useActions } from "../../hooks";
import type { Actions as ActionRow } from "../../domain/dnd5e/Actions";

export default function Actions() {
    const { system, data, isLoading, error } = useActions();

    if (isLoading) return <p className="opacity-70">Cargando acciones…</p>;
    if (error) return <p className="text-red-600">Error cargando acciones.</p>;

    const actions = data as ActionRow[];

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Acciones ({system})</h2>
            {actions.length === 0 ? (
                <p className="opacity-70">No hay acciones cargadas.</p>
            ) : (
                <ul className="space-y-3">
                    {actions.map(a => (
                        <li key={a.pk} className="border rounded p-3">
                            <div className="font-medium">{a.name}</div>
                            {a.tag && (
                                <div className="text-xs inline-block mt-1 px-2 py-0.5 rounded bg-neutral-200">
                                    {a.tag}
                                </div>
                            )}
                            {a.summary && <p className="text-sm mt-2 opacity-80">{a.summary}</p>}
                            {a.text && <p className="text-sm mt-2 whitespace-pre-wrap">{a.text}</p>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
