// src/components/EntryCard.tsx
import type { ReactNode } from "react";

type EntryCardProps = {
    title: ReactNode;
    subtitle?: ReactNode;
    tag?: ReactNode;     // opcional, para una “pill” a la derecha
    meta?: ReactNode;    // opcional, info secundaria (ej: coste, nivel, etc.)
    footer?: ReactNode;  // texto al pie (ej: fuente)
    children?: ReactNode;
};

export default function EntryCard({
                                      title,
                                      subtitle,
                                      tag,
                                      meta,
                                      footer,
                                      children,
                                  }: EntryCardProps) {
    return (
        <article className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm transition-colors dark:border-neutral-800 dark:bg-neutral-900">
            {/* cabecera */}
            <header className="flex items-start justify-between gap-3">
                <div>
                    <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
                        {title}
                    </h3>
                    {subtitle && (
                        <p className="mt-0.5 text-xs text-neutral-700 dark:text-neutral-300">
                            {subtitle}
                        </p>
                    )}
                    {meta && (
                        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                            {meta}
                        </p>
                    )}
                </div>
                {tag && (
                    <span className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-100 px-2 py-0.5 text-xs text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
                        {tag}
                    </span>
                )}
            </header>

            {/* contenido */}
            {children && (
                <div className="mt-3 text-sm text-neutral-800 dark:text-neutral-200">
                    {children}
                </div>
            )}

            {/* footer */}
            {footer && (
                <footer className="mt-3 border-t border-neutral-100 pt-2 text-xs text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
                    {footer}
                </footer>
            )}
        </article>
    );
}
