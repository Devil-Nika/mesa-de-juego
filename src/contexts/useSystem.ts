import { useContext } from "react";
import { SystemContext } from "./SystemContext";

export function useSystem() {
    const ctx = useContext(SystemContext);
    if (!ctx) throw new Error("useSystem must be used inside <SystemProvider>");
    return ctx;
}
