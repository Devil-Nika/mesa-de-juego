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

function CoinsSection() {
    const { t } = useLocale();
    const [fromCoin, setFromCoin] = useState("gp");
    const [amount, setAmount] = useState(1);

    const base = COINS.find((c) => c.id === fromCoin) ?? COINS[3];
    const baseInCp = amount * base.factor;

    return (
        <div className="space-y-4 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <h3 className="text-md font-semibold text-neutral-900 dark:text-neutral-50 mb-1">
                {t("equipment.coins")}
            </h3>

            {/* tabla */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                    <thead>
                    <tr className="border-b border-neutral-200 dark:border-neutral-800">
                        <th className="py-1 text-left text-xs font-semibold uppercase text-neutral-600 dark:text-neutral-300">
                            {t("coins.name")}
                        </th>
                        <th className="py-1 text-left text-xs font-semibold uppercase text-neutral-600 dark:text-neutral-300">
                            {t("coins.abbr")}
                        </th>
                        <th className="py-1 text-left text-xs font-semibold uppercase text-neutral-600 dark:text-neutral-300">
                            {t("coins.value_vs_cp")}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {COINS.map((c) => (
                        <tr
                            key={c.id}
                            className="border-b border-neutral-100 last:border-none dark:border-neutral-800"
                        >
                            <td className="py-1 text-neutral-800 dark:text-neutral-100">
                                {t(c.nameKey)}
                            </td>
                            <td className="py-1 text-neutral-700 dark:text-neutral-200">
                                {c.short}
                            </td>
                            <td className="py-1 text-neutral-700 dark:text-neutral-200">
                                {c.factor} {t("coins.cp_equiv")}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* calculadora */}
            <div className="space-y-2 rounded-lg bg-neutral-50 p-3 text-sm dark:bg-neutral-950/40">
                <h4 className="font-medium text-neutral-800 dark:text-neutral-100">
                    {t("coins.converter_title")}
                </h4>
                <div className="flex flex-wrap items-center gap-2">
                    <input
                        type="number"
                        min={0}
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value) || 0)}
                        className="w-24 rounded-md border border-neutral-300 bg-white px-2 py-1 text-sm text-neutral-900 shadow-sm outline-none
                                   focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
                                   dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50"
                    />
                    <select
                        value={fromCoin}
                        onChange={(e) => setFromCoin(e.target.value)}
                        className="rounded-md border border-neutral-300 bg-white px-2 py-1 text-sm text-neutral-900 shadow-sm outline-none
                                   focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
                                   dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50"
                    >
                        {COINS.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.short}
                            </option>
                        ))}
                    </select>
                </div>
                <ul className="mt-2 space-y-1">
                    {COINS.map((c) => {
                        const value = baseInCp / c.factor;
                        return (
                            <li
                                key={c.id}
                                className="text-xs text-neutral-800 dark:text-neutral-200"
                            >
                                ≈ {value.toFixed(2)} {c.short}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}



import { useState } from "react";

function WeaponsSection() {
    const { t } = useLocale();
    const { data, isLoading, error } = useItemsDnd5e();

    if (isLoading) {
        return <p className="opacity-70 text-sm">{t("loading.weapons")}</p>;
    }
    if (error) {
        return <p className="text-sm text-red-600">{t("error.weapons")}</p>;
    }

    const weapons = (data as Item[]).filter((item) => item.category === "weapon");

    if (weapons.length === 0) {
        return (
            <p className="opacity-70 text-sm">
                {t("empty.weapons")}
            </p>
        );
    }

    return (
        <div className="space-y-3 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <h3 className="text-md font-semibold text-neutral-900 dark:text-neutral-50">
                {t("equipment.weapons")}
            </h3>

            <ul className="space-y-2 text-sm">
                {weapons.map((w) => (
                    <li
                        key={w.id}
                        className="rounded-lg border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-700 dark:bg-neutral-950/40"
                    >
                        <div className="font-medium text-neutral-900 dark:text-neutral-50">
                            {w.name}{" "}
                            {w.weapon?.kind && (
                                <span className="ml-2 text-xs uppercase text-neutral-500 dark:text-neutral-400">
                                    {w.weapon.kind} {w.weapon.category}
                                </span>
                            )}
                        </div>

                        {w.weapon?.damage && (
                            <div className="mt-1 text-xs text-neutral-700 dark:text-neutral-200">
                                {t("weapon.damage")}: {w.weapon.damage.dice} (
                                {w.weapon.damage.type})
                                {w.weapon.versatileDice && (
                                    <>
                                        {" "}
                                        · {t("weapon.versatile")}:{" "}
                                        {w.weapon.versatileDice}
                                    </>
                                )}
                            </div>
                        )}

                        {w.cost && (
                            <div className="mt-1 text-xs text-neutral-700 dark:text-neutral-200">
                                {t("common.cost")}: {w.cost.amount} {w.cost.unit}
                            </div>
                        )}

                        {w.weight && (
                            <div className="mt-1 text-xs text-neutral-700 dark:text-neutral-200">
                                {t("common.weight")}: {w.weight}{" "}
                                {t("common.weight_unit")}
                            </div>
                        )}

                        {w.description && (
                            <p className="mt-1 text-xs text-neutral-700 dark:text-neutral-200">
                                {w.description}
                            </p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}