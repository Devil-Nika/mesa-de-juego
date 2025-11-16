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
            className="w-full md:w-72 border rounded px-3 py-2 bg-white text-sm shadow-sm outline-none
                       border-neutral-300 text-neutral-900
                       focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
                       dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-50 dark:placeholder-neutral-500"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={placeholder ?? "Search…"}
        />
    );
}
