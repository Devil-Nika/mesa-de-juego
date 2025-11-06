import { Link, useParams } from "react-router-dom";
import { useSystem } from "@contexts/useSystem";
import { useLocale } from "@contexts/useLocale";

export default function Home() {
    const { system } = useSystem();
    const { t } = useLocale();
    const params = useParams();
    const sys = (params.system ?? system) as string;

    return (
        <section className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-semibold mb-2">{t("home.title")}</h1>
            <p className="opacity-75 mb-6">
                {t("home.subtitle")} ({sys})
            </p>

            <div className="flex flex-wrap gap-3">
                <Link
                    to={`/${sys}/grimoire`}
                    className="px-4 py-2 rounded-md bg-neutral-900 text-white hover:bg-black"
                >
                    {t("home.openGrimoire")}
                </Link>

                <Link
                    to={`/${sys}/options`}
                    className="px-4 py-2 rounded-md bg-neutral-200 hover:bg-neutral-300"
                >
                    {t("home.openOptions")}
                </Link>
            </div>
        </section>
    );
}