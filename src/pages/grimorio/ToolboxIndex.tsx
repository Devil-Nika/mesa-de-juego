import { Link } from "react-router-dom";
import { useLocale } from "@contexts/useLocale.ts";

const TOOLS: Array<{ id: string; i18n: string; hint: string }> = [
    { id: "travel-places", i18n: "toolbox.travelPlaces", hint: "toolbox.hint.travelPlaces" },
    { id: "curses-contagions", i18n: "toolbox.cursesContagions", hint: "toolbox.hint.cursesContagions" },
    { id: "environmental-effects", i18n: "toolbox.environmentalEffects", hint: "toolbox.hint.environmentalEffects" },
    { id: "fear-stress", i18n: "toolbox.fearStress", hint: "toolbox.hint.fearStress" },
    { id: "poisons", i18n: "toolbox.poisons", hint: "toolbox.hint.poisons" },
    { id: "traps", i18n: "toolbox.traps", hint: "toolbox.hint.traps" },
];

export default function ToolboxIndex() {
    const { t } = useLocale();
    return (
        <section>
            <h2 className="text-lg font-semibold mb-4">{t("grimorio.toolbox")}</h2>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {TOOLS.map((x) => (
                    <li key={x.id}>
                        <Link
                            to={x.id}
                            className="border rounded-xl p-4 bg-white shadow-sm block hover:shadow-md"
                        >
                            <div className="font-medium text-indigo-700">{t(x.i18n)}</div>
                            <p className="text-sm opacity-80 mt-1">{t(x.hint)}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}
