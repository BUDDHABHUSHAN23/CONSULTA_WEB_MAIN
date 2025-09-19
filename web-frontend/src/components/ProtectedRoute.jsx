// src/components/RequireAuth.jsx
import { Navigate, useLocation } from "react-router-dom";
import terSession from "../lib/terSession";   // <-- here

export default function RequireAuth({ children, role }) {
  const loc = useLocation();
  const session = terSession.load();          // <-- and here

  // not logged in → send to login, remember where user came from
  if (!session?.token) {
    return <Navigate to="/ter/login" state={{ from: loc }} replace />;
  }

  // role-gated routes (e.g., manager queue)
  if (role && session.user?.role !== role) {
    return <Navigate to="/ter/login" replace />;
  }

  return children;
}
