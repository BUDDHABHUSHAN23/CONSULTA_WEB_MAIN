import { Navigate, useLocation } from "react-router-dom";
import { terSession } from "../lib/terSession";

export default function RequireAuth({ children, role }) {
  const s = terSession.load();
  const loc = useLocation();

  if (!s?.token) return <Navigate to="/ter/login" state={{ from: loc }} replace />;

  if (role && ![role, "admin"].includes(s.user.role)) {
    return <Navigate to="/ter/submit" replace />;
  }
  return children;
}
