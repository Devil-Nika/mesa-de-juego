import { Link } from "react-router-dom";
import { useLocale } from "@contexts/useLocale";

const tiles: Array<{ to: string; key: string; descKey: string }> = [
    { to: "class", key: "menu.class", descKey: "hub.class.desc" },
    { to: "origins", key: "menu.origins", descKey: "hub.origins.desc" },
    { to: "feats", key: "menu.feats", descKey: "hub.feats.desc" },
    { to: "equipment", key: "menu.equipment", descKey: "hub.equipment.desc" },
    { to: "spells", key: "menu.spells", descKey: "hub.spells.desc" },
    { to: "monsters", key: "menu.monsters", descKey: "hub.monsters.desc" },
    { to: "toolbox", key: "menu.toolbox", descKey: "hub.toolbox.desc" },
    { to: "rules", key: "menu.rules", descKey: "hub.rules.desc" },
];

export default function GrimorioHub() {
    const { t } = useLocale();
    return (
        <section>
            <h3 className="text-xl font-semibold mb-4">{t("hub.title")}</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {tiles
                    .map((tile) => ({ ...tile, label: t(tile.key), desc: t(tile.descKey) }))
                    .sort((a, b) => a.label.localeCompare(b.label))
                    .map((tile) => (
                        <Link
                            key={tile.to}
                            to={tile.to}
                            className="block rounded-xl border bg-white p-4 hover:shadow-md shadow-sm"
                        >
                            <div className="font-medium text-indigo-700">{tile.label}</div>
                            <p className="text-sm opacity-80 mt-1">{tile.desc}</p>
                        </Link>
                    ))}
            </div>
        </section>
    );
}