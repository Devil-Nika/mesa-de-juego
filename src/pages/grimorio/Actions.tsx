// src/pages/grimorio/Actions.tsx
import { useActions } from "../../hooks";

export default function Actions() {
    const { system, actions, isLoading, error } = useActions();
    if (isLoading) return <p className="opacity-70">Cargando acciones…</p>;
    if (error) return <p className="text-red-600">Error cargando acciones</p>;

    return (
        <>
            <h2 className="text-lg font-semibold mb-3">Acciones ({system})</h2>
            {actions.length === 0 ? (
                <p className="opacity-70">No hay acciones cargadas.</p>
            ) : (
                <ul className="list-disc pl-6">
                    {actions.map((a) => <li key={a.pk}>{a.name}</li>)}
                </ul>
            )}
        </>
    );
}
