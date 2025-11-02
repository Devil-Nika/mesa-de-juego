import { Link } from "react-router-dom";
import { useLocale } from "@contexts/useLocale";

const SECTIONS: Array<{ id: string; i18n: string; hint: string }> = [
    { id: "coins", i18n: "equipment.coins", hint: "equipment.hint.coins" },
    { id: "weapons", i18n: "equipment.weapons", hint: "equipment.hint.weapons" },
    { id: "armors", i18n: "equipment.armors", hint: "equipment.hint.armors" },
    { id: "adventuring-gear", i18n: "equipment.adventuringGear", hint: "equipment.hint.adventuringGear" },
    { id: "mounts-vehicles", i18n: "equipment.mountsVehicles", hint: "equipment.hint.mountsVehicles" },
    { id: "services", i18n: "equipment.services", hint: "equipment.hint.services" },
    { id: "magic-items", i18n: "equipment.magicItems", hint: "equipment.hint.magicItems" },
    { id: "crafting", i18n: "equipment.crafting", hint: "equipment.hint.crafting" },
];

export default function EquipmentIndex() {
    const { t } = useLocale();
    return (
        <section>
            <h2 className="text-lg font-semibold mb-4">{t("grimorio.equipment")}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {SECTIONS.map((s) => (
                    <Link key={s.id} to={s.id} className="border rounded-xl p-4 bg-white hover:shadow-md shadow-sm block">
                        <div className="font-medium text-indigo-700">{t(s.i18n)}</div>
                        <p className="text-sm opacity-80 mt-1">{t(s.hint)}</p>
                    </Link>
                ))}
            </div>
        </section>
    );
}