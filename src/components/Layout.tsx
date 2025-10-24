import { SystemSwitcher } from "./SystemSwitcher";

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="p-4 border-b flex justify-between items-center">
                <h1 className="text-xl font-semibold">Mesa de Juego</h1>
                <SystemSwitcher /> {/* 👈 aquí */}
            </header>
            <main className="flex-1 p-6 bg-neutral-50">{children}</main>
        </div>
    );
}
