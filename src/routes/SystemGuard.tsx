import { Navigate, Outlet, useParams } from "react-router-dom";
import { isSystemId, markScopeUsed, type SystemId } from "../systems/registry";
import { useSystem } from "../contexts/useSystem";

export default function SystemGuard() {
    const params = useParams();
    const routeSystem = (params.system ?? "") as string;
    const { system, setSystem } = useSystem();

    if (!isSystemId(routeSystem)) {
        return <Navigate to="/dnd5e" replace />;
    }

    if (system !== routeSystem) {
        setSystem(routeSystem as SystemId);
        markScopeUsed(routeSystem as SystemId);
    }

    return <Outlet />;
}
