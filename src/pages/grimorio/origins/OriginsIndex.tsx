import { useMemo, useState } from "react";
import { useBackgrounds } from "@hooks/dnd5e/useBackgrounds";
import { useSpecies } from "@hooks/dnd5e/useSpecies";
import { useSystem } from "@contexts/useSystem";
import { useLocale } from "@contexts/useLocale";
import type { Background, Species } from "@domain/dnd5e";
import { matchAnyLocale } from "@utils/i18nSearch";
import { localeName } from "@utils/i18nSort";

type TabId = "backgrounds" | "species";

export default function OriginsIndex() {
    const { system } = useSystem();
    const { locale, t } = useLocale();
    const { data: bgData, isLoading: lbg, error: ebg } = useBackgrounds();
    const { data: spData, isLoading: lsp, error: esp } = useSpecies();

    const [tab, setTab] = useState<TabId>("backgrounds");
    const [query, setQuery] = useState("");

    const bgs = useMemo(() => {
        const rows = (bgData ?? []) as Background[];
        return rows
            .filter((r) => matchAnyLocale(r, query))
            .sort((a, b) => localeName(a, locale).localeCompare(localeName(b, locale), locale, { sensitivity: "base" }));
    }, [bgData, query, locale]);

    const species = useMemo(() => {
        const rows = (spData ?? []) as Species[];
        return rows
            .filter((r) => matchAnyLocale(r, query))
            .sort((a, b) => localeName(a, locale).localeCompare(localeName(b, locale), locale, { sensitivity: "base" }));
    }, [spData, query, locale]);

    const isLoading = lbg || lsp;
    const error = ebg || esp;

    if (isLoading) return <p>{t("loading.origins")}</p>;
    if (error) return <p className="text-red-600">{t("error.origins")}</p>;

    return (
        <section className="space-y-4">
            <header className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{t("grimorio.origins")} ({system})</h2>
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t("search.origins")}
                    className="border rounded px-2 py-1"
                />
            </header>

            <div className="inline-flex rounded-lg overflow-hidden border">
                <button
                    onClick={() => setTab("backgrounds")}
                    className={`px-3 py-1 text-sm ${tab === "backgrounds" ? "bg-indigo-600 text-white" : "bg-white"}`}
                >
                    {t("menu.backgrounds")}
                </button>
                <button
                    onClick={() => setTab("species")}
                    className={`px-3 py-1 text-sm ${tab === "species" ? "bg-indigo-600 text-white" : "bg-white"}`}
                >
                    {t("menu.species")}
                </button>
            </div>

            {tab === "backgrounds" ? (
                <ul className="grid sm:grid-cols-2 gap-3">
                    {bgs.map((b) => (
                        <li key={b.pk} className="border rounded p-3 bg-white shadow-sm">
                            <div className="font-medium">{localeName(b, locale)}</div>
                            {b.description && <p className="text-sm mt-1">{b.description}</p>}
                        </li>
                    ))}
                </ul>
            ) : (
                <ul className="grid sm:grid-cols-2 gap-3">
                    {species.map((s) => (
                        <li key={s.pk} className="border rounded p-3 bg-white shadow-sm">
                            <div className="font-medium">{localeName(s, locale)}</div>
                            {s.size && <div className="text-xs opacity-70">{s.size}</div>}
                            {s.description && <p className="text-sm mt-1">{s.description}</p>}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
