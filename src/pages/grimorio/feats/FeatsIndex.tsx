import { useMemo, useState } from "react";
import { useFeats } from "@hooks/dnd5e/useFeats";
import { useSystem } from "@contexts/useSystem";
import { useLocale } from "@contexts/useLocale";
import type { Feat } from "@domain/dnd5e";
import { matchAnyLocale } from "@utils/i18nSearch";
import { localeName } from "@utils/i18nSort";

const ORDER = ["Origin", "General", "Fighting Style", "Epic Boon"] as const;
type KnownCat = (typeof ORDER)[number];

export default function FeatsIndex() {
    const { system } = useSystem();
    const { locale, t } = useLocale();
    const { data, isLoading, error } = useFeats();

    const [query, setQuery] = useState("");
    const [cat, setCat] = useState<KnownCat | "All">("All");

    const feats = useMemo(() => {
        const rows = (data ?? []) as Feat[];
        const filtered = rows
            .filter((r) => (cat === "All" ? true : r.category === cat))
            .filter((r) => matchAnyLocale(r, query));
        return filtered.sort((a, b) =>
            localeName(a, locale).localeCompare(localeName(b, locale), locale, { sensitivity: "base" })
        );
    }, [data, query, cat, locale]);

    if (isLoading) return <p>{t("loading.feats")}</p>;
    if (error) return <p className="text-red-600">{t("error.feats")}</p>;

    const cats: Array<KnownCat | "All"> = ["All", ...ORDER];

    return (
        <section className="space-y-4">
            <header className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold">{t("grimorio.feats")} ({system})</h2>
                <div className="flex items-center gap-2">
                    <select value={cat} onChange={(e) => setCat(e.target.value as typeof cat)} className="border rounded px-2 py-1">
                        {cats.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={t("search.feats")}
                        className="border rounded px-2 py-1"
                    />
                </div>
            </header>

            <ul className="grid sm:grid-cols-2 gap-3">
                {feats.map((f) => (
                    <li key={f.pk} className="border rounded p-3 bg-white shadow-sm">
                        <div className="font-medium">{localeName(f, locale)}</div>
                        <div className="text-xs opacity-70">{f.category}</div>
                        {f.description && <p className="text-sm mt-1">{f.description}</p>}
                    </li>
                ))}
            </ul>
        </section>
    );
}
