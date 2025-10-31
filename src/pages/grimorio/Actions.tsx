import { useActionsDnd5e } from "../../hooks/dnd5e/useActions";
import type { Actions } from "../../domain/dnd5e/Actions";

export default function ActionsPage() {
    const { system, actions, isLoading, error } = useActionsDnd5e();
    if (isLoading) return <p className="opacity-70">Cargando acciones…</p>;
    if (error) return <p className="text-red-600">Error cargando acciones.</p>;

    return (
        <>
            <h2 className="text-lg font-semibold mb-3">Acciones ({system})</h2>
            {actions.length === 0 ? (
                <p className="opacity-70">No hay acciones cargadas.</p>
            ) : (
                <ul className="space-y-2">
                    {actions.map((a: Actions) => (
                        <li key={a.pk} className="p-3 rounded bg-neutral-100">
                            <div className="font-semibold">{a.name}</div>
                            <div className="text-sm opacity-80">{a.tag}</div>
                            {a.text && <p className="text-sm mt-1">{a.text}</p>}
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
