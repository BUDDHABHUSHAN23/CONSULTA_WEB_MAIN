import { Navigate, useLocation } from "react-router-dom";
import { terSession } from "../lib/terSession";

export default function RequireAuth({ children, role }) {
  const s = terSession.load();
  const loc = useLocation();

  // support new { erp: { token } } and legacy { token }
  const token = s?.erp?.token || s?.token;
  if (!token) return <Navigate to="/ter/login" state={{ from: loc }} replace />;

  const userRole = s?.erp?.user?.role ?? s?.user?.role;
  if (role && ![role, "admin"].includes(userRole)) {
    return <Navigate to="/ter/submit" replace />;
  }
  return children;
}
