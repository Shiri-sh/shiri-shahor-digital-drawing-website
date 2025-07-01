// ProtectedRoute.jsx
import { useContext } from "react";
import { useParams, Navigate } from "react-router-dom";
import { ContextUser } from "./contextUser";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(ContextUser);
  const { id } = useParams();

  if (!user) return <Navigate to="/gallery" replace />;

  if (parseInt(id) !== user.id && user.role !== "admin") {
    return <Navigate to="/gallery" replace />;
  }

  return children;
}
