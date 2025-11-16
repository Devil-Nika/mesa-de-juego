import { useMonstersDnd5e } from "@hooks/dnd5e/useMonstersDnd5e";
import type { Monster } from "@domain/dnd5e";
import { useLocale } from "@contexts/useLocale";
import { useSystem } from "@contexts/useSystem";
import EntryCard from "@components/EntryCard";
import ListPage, { type SortOption } from "@components/list/ListPage";

export default function MonstersPage() {
    const { system } = useSystem();
    const { locale, t } = useLocale();
    const { data, isLoading, error } = useMonstersDnd5e();

    const parseCR = (cr?: string) => {
        if (!cr) return 0;
        if (cr.includes("/")) {
            const [a, b] = cr.split("/").map(Number);
            return b ? a / b : 0;
        }
        const n = Number(cr);
        return Number.isFinite(n) ? n : 0;
    };

    const sortOptions: SortOption[] = [
        { value: "name-asc", label: t("sort.nameAsc") },
        { value: "cr-asc", label: t("sort.crAsc") },
        { value: "cr-desc", label: t("sort.crDesc") },
    ];

    const sortFn = (items: Monster[], sortId: string): Monster[] => {
        if (sortId === "name-asc") {
            return [...items].sort((a, b) =>
                (a.name ?? "").localeCompare(b.name ?? "", locale)
            );
        }
        if (sortId === "cr-asc") {
            return [...items].sort((a, b) => parseCR(a.cr) - parseCR(b.cr));
        }
        if (sortId === "cr-desc") {
            return [...items].sort((a, b) => parseCR(b.cr) - parseCR(a.cr));
        }
        return items;
    };

    const searchPredicate = (m: Monster, term: string): boolean => {
        return (
            (m.name ?? "").toLowerCase().includes(term) ||
            (m.type ?? "").toLowerCase().includes(term)
        );
    };

    return (
        <ListPage<Monster>
            title={t("grimorio.monsters")}
            systemLabel={system}
            data={(data as Monster[]) ?? []}
            isLoading={isLoading}
            error={error}
            searchPlaceholder={t("search.monsters")}
            emptyMessage={t("empty.monsters")}
            loadingLabel={t("loading.monsters")}
            errorLabel={t("error.monsters")}
            sortOptions={sortOptions}
            initialSort="name-asc"
            searchPredicate={searchPredicate}
            sortFn={sortFn}
            getKey={(m: Monster) => m.pk}
            renderItem={(m: Monster) => (
                <EntryCard
                    title={m.name}
                    subtitle={[
                        m.type ?? "",
                        m.cr ? `• CR ${m.cr}` : "",
                        m.ac !== undefined ? `• AC ${m.ac}` : "",
                        m.hp !== undefined ? `• HP ${m.hp}` : "",
                    ]
                        .join(" ")
                        .trim()}
                    footer={
                        m.source ? `${t("common.source")}: ${m.source}` : undefined
                    }
                >
                    {m.description}
                </EntryCard>
            )}
        />
    );
}
