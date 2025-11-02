import { useEffect, useState } from "react";

type Props = {
    value: string;
    onChange: (next: string) => void;
    placeholder?: string;
};

export default function SearchBar({ value, onChange, placeholder }: Props) {
    const [q, setQ] = useState(value);

    // sync externo → interno
    useEffect(() => setQ(value), [value]);

    // debounce simple (250ms)
    useEffect(() => {
        const id = setTimeout(() => onChange(q), 250);
        return () => clearTimeout(id);
    }, [q, onChange]);

    return (
        <input
            className="w-full md:w-72 border rounded px-3 py-2 bg-white"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={placeholder ?? "Search…"}
        />
    );
}
