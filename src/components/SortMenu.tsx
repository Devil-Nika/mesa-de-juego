type Option = { value: string; label: string };

type Props = {
    value: string;
    onChange: (next: string) => void;
    options: Option[];
    label?: string;
};

export default function SortMenu({ value, onChange, options, label = "Sort" }: Props) {
    return (
        <label className="inline-flex items-center gap-2">
            <span className="text-sm opacity-75 text-neutral-700 dark:text-neutral-300">
                {label}
            </span>
            <select
                className="border rounded px-2 py-1 text-sm bg-white shadow-sm outline-none
                           border-neutral-300 text-neutral-900
                           focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
                           dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-50"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                {options.map((o) => (
                    <option key={o.value} value={o.value}>
                        {o.label}
                    </option>
                ))}
            </select>
        </label>
    );
}
