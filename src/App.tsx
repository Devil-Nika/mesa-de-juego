import { useTranslation } from "react-i18next";

export default function App() {
    const { t, i18n } = useTranslation();

    return (
        <div className="min-h-screen bg-neutral-100 text-neutral-900">
            <header className="p-4 flex items-center justify-between bg-white shadow">
                <h1 className="text-xl font-semibold">{t("app.title")}</h1>
                <div className="flex gap-2">
                    <button
                        className={`px-3 py-1 rounded ${i18n.resolvedLanguage === "en" ? "bg-black text-white" : "bg-neutral-200"}`}
                        onClick={() => i18n.changeLanguage("en")}
                    >
                        {t("language.en")}
                    </button>
                    <button
                        className={`px-3 py-1 rounded ${i18n.resolvedLanguage === "es" ? "bg-black text-white" : "bg-neutral-200"}`}
                        onClick={() => i18n.changeLanguage("es")}
                    >
                        {t("language.es")}
                    </button>
                </div>
            </header>

            <main className="p-6">
                <p className="opacity-80">
                    {t("nav.grimoire")} • {t("nav.characters")} • {t("nav.encounters")} • {t("nav.config")}
                </p>
                <p className="mt-4">
                    Entorno listo. Próximo paso: base de datos local y primer listado (Grimorio).
                </p>
            </main>
        </div>
    );
}