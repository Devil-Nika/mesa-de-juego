// src/pages/grimorio/EquipmentSection.tsx
import { useParams } from "react-router-dom";
import { useLocale } from "@contexts/useLocale";
import { useItemsDnd5e } from "@hooks/dnd5e/useItemsDnd5e"; // ajusta el path al tuyo
import type { Item } from "@domain/dnd5e";

const COINS = [
    { id: "cp", nameKey: "coins.copper", short: "CP", factor: 1 },        // base
    { id: "sp", nameKey: "coins.silver", short: "SP", factor: 10 },
    { id: "ep", nameKey: "coins.electrum", short: "EP", factor: 50 },
    { id: "gp", nameKey: "coins.gold", short: "GP", factor: 100 },
    { id: "pp", nameKey: "coins.platinum", short: "PP", factor: 1000 },
];

export default function EquipmentSection() {
    const { sectionId } = useParams<{ sectionId: string }>();
//  const { t } = useLocale();

    if (!sectionId) return null;

    if (sectionId === "coins") {
        return <CoinsSection />;
    }

    if (sectionId === "weapons") {
        return <WeaponsSection />;
    }

    // más adelante: armors, gear, services, etc.
    return (
        <div className="border rounded-xl p-4 bg-white">
            <p className="opacity-70">
                WIP: {sectionId}
            </p>
        </div>
    );
}

// ---------- Sección monedas + calculadora ----------
function CoinsSection() {
    const { t } = useLocale();

    // calculadora simple: convertir desde una moneda a todas las demás
    const [fromCoin, setFromCoin] = useState("gp");
    const [amount, setAmount] = useState(1);

    const base = COINS.find((c) => c.id === fromCoin) ?? COINS[3]; // gp por defecto
    const baseInCp = amount * base.factor;

    return (
        <div className="border rounded-xl p-4 bg-white space-y-4">
            <h3 className="text-md font-semibold mb-2">
                {t("equipment.coins")}
            </h3>

            {/* tabla de monedas */}
            <table className="w-full text-sm border-collapse">
                <thead>
                <tr className="border-b">
                    <th className="text-left py-1">{t("coins.name")}</th>
                    <th className="text-left py-1">{t("coins.abbr")}</th>
                    <th className="text-left py-1">{t("coins.value_vs_cp")}</th>
                </tr>
                </thead>
                <tbody>
                {COINS.map((c) => (
                    <tr key={c.id} className="border-b last:border-none">
                        <td className="py-1">{t(c.nameKey)}</td>
                        <td className="py-1">{c.short}</td>
                        <td className="py-1">
                            {c.factor} {t("coins.cp_equiv")}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* calculadora */}
            <div className="space-y-2">
                <h4 className="font-medium">{t("coins.converter_title")}</h4>
                <div className="flex flex-wrap gap-2 items-center text-sm">
                    <input
                        type="number"
                        min={0}
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value) || 0)}
                        className="border rounded px-2 py-1 w-24"
                    />
                    <select
                        value={fromCoin}
                        onChange={(e) => setFromCoin(e.target.value)}
                        className="border rounded px-2 py-1"
                    >
                        {COINS.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.short}
                            </option>
                        ))}
                    </select>
                </div>

                <ul className="text-sm space-y-1 mt-2">
                    {COINS.map((c) => {
                        const value = baseInCp / c.factor;
                        return (
                            <li key={c.id}>
                                ≈ {value.toFixed(2)} {c.short}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

// ---------- Sección armas ----------
import { useState } from "react";

function WeaponsSection() {
    const { t } = useLocale();
    const { data, isLoading, error } = useItemsDnd5e();

    if (isLoading) {
        return <p className="opacity-70">{t("loading.weapons")}</p>;
    }
    if (error) {
        return <p className="text-red-600">{t("error.weapons")}</p>;
    }

    const weapons = (data as Item[]).filter((item) => item.category === "weapon");

    if (weapons.length === 0) {
        return (
            <p className="opacity-70">
                {t("empty.weapons")}
            </p>
        );
    }

    return (
        <div className="border rounded-xl p-4 bg-white space-y-3">
            <h3 className="text-md font-semibold mb-2">
                {t("equipment.weapons")}
            </h3>

            <ul className="space-y-2 text-sm">
                {weapons.map((w) => (
                    <li key={w.id} className="border rounded p-3">
                        <div className="font-medium">
                            {w.name}{" "}
                            {w.weapon?.kind && (
                                <span className="text-xs uppercase opacity-70 ml-2">
                  {w.weapon.kind} {w.weapon.category}
                </span>
                            )}
                        </div>
                        {w.weapon?.damage && (
                            <div className="text-xs mt-1">
                                {t("weapon.damage")}: {w.weapon.damage.dice}{" "}
                                ({w.weapon.damage.type})
                                {w.weapon.versatileDice && (
                                    <> · {t("weapon.versatile")}: {w.weapon.versatileDice}</>
                                )}
                            </div>
                        )}
                        {w.cost && (
                            <div className="text-xs mt-1">
                                {t("common.cost")}: {w.cost.amount} {w.cost.unit}
                            </div>
                        )}
                        {w.weight && (
                            <div className="text-xs mt-1">
                                {t("common.weight")}: {w.weight} {t("common.weight_unit")}
                            </div>
                        )}
                        {w.description && (
                            <p className="text-xs mt-1 opacity-80">{w.description}</p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
