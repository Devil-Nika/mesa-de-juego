import { Navigate, Outlet, useParams } from "react-router-dom";
import { isSystemId } from "../systems";
import { useSystem } from "../contexts/SystemContext";

export default function SystemGuard() {
    const params = useParams();
    const routeSystem = params.system ?? "";
    const { system, setSystem } = useSystem();

    if (!isSystemId(routeSystem)) {
        return <Navigate to="/dnd5e" replace />;
    }
    if (system !== routeSystem) {
        setSystem(routeSystem);
    }
    return <Outlet />;
}
