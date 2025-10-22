import { Navigate } from "react-router-dom";

interface ProtectedProps {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedProps) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
