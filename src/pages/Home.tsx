import { Link } from "react-router-dom";
import { useSystem } from "@contexts/useSystem";
import { useLocale } from "@contexts/useLocale";

export default function Home() {
    const { system, systemLabel } = useSystem();
    const { t } = useLocale();

    return (
        <main
            className="max-w-4xl mx-auto p-6 text-neutral-900"
            aria-labelledby="home-title"
        >
            <header className="mb-6">
                <h1 id="home-title" className="text-3xl font-bold tracking-tight">
                    {t("home.title", "Welcome")}
                </h1>
                <p className="mt-2 text-neutral-600">
                    {t("home.subtitle", "Select a section from the top navigation.")}
                </p>
                <p className="mt-1 text-sm text-neutral-500">
          <span className="font-medium">
            {t("common.currentSystem", "Current system")}:
          </span>{" "}
                    {systemLabel ?? system}
                </p>
            </header>

            {/* Acciones rápidas */}
            <section aria-label={t("home.quickActions", "Quick actions")}>
                <ul className="grid gap-4 sm:grid-cols-2">
                    <li>
                        <Link
                            to={`/${system}/grimoire`}
                            className="block rounded-xl border border-neutral-200 bg-white/80 p-5 shadow-sm hover:shadow-md hover:border-neutral-300 transition"
                        >
                            <div className="text-lg font-semibold">
                                {t("home.goGrimoire", "Open Grimoire")}
                            </div>
                            <p className="mt-1 text-sm text-neutral-600">
                                {t(
                                    "home.goGrimoireDesc",
                                    "Browse classes, origins, feats, equipment, spells, monsters and toolbox."
                                )}
                            </p>
                        </Link>
                    </li>

                    <li>
                        <Link
                            to={`/${system}/options`}
                            className="block rounded-xl border border-neutral-200 bg-white/80 p-5 shadow-sm hover:shadow-md hover:border-neutral-300 transition"
                        >
                            <div className="text-lg font-semibold">
                                {t("home.goOptions", "Options")}
                            </div>
                            <p className="mt-1 text-sm text-neutral-600">
                                {t(
                                    "home.goOptionsDesc",
                                    "Change language and system preferences."
                                )}
                            </p>
                        </Link>
                    </li>
                </ul>
            </section>

            {/* Placeholder para hoja de personaje (futuro) */}
            <section className="mt-8 rounded-xl bg-gradient-to-br from-indigo-50 to-sky-50 border border-indigo-100 p-5">
                <h2 className="text-sm font-medium text-indigo-700">
                    {t("home.characterSheetSoon", "Character sheet (coming soon)")}
                </h2>
                <p className="mt-1 text-sm text-indigo-800/80">
                    {t(
                        "home.characterSheetSoonDesc",
                        "This space will host your character builder and sheet."
                    )}
                </p>
            </section>
        </main>
    );
}
