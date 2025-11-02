import { useLocale } from "@contexts/useLocale";

export default function ComingSoon({ labelKey }: { labelKey: string }) {
    const { t } = useLocale();
    return (
        <section className="max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold mb-2">{t(labelKey)}</h2>
            <div className="p-4 rounded border bg-white shadow-sm">
                <p className="opacity-75">{t("common.comingSoon")}</p>
            </div>
        </section>
    );
}
