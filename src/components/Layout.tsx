import type { ReactNode } from "react";
import { SystemSwitcher } from "./SystemSwitcher";

export function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-neutral-100 text-neutral-900">
            <header className="p-4 flex items-center justify-between bg-white shadow">
                <h1 className="text-xl font-semibold">Mesa de Juego</h1>
                <SystemSwitcher />
            </header>
            <main className="p-6">{children}</main>
        </div>
    );
}
