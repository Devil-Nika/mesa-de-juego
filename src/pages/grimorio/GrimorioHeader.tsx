import type { ChangeEvent } from "react";
import { useSystem } from "../../contexts/SystemContext"; // ✅ ruta correcta

interface GrimorioHeaderProps {
    title: string;
    search?: string;
    onSearchChange?: (value: string) => void;
}

export default function GrimorioHeader({ title, search = "", onSearchChange }: GrimorioHeaderProps) {
    const { system } = useSystem();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onSearchChange?.(e.target.value);
    };

    return (
        <div className="mb-4 flex items-center gap-3">
            <h2 className="text-lg font-semibold">
                {title} ({system})
            </h2>
            <input
                type="text"
                value={search}
                onChange={handleChange}
                placeholder="Buscar…"
                className="border rounded px-2 py-1"
            />
        </div>
    );
}
