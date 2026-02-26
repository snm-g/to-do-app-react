import { Navigate, Outlet } from "react-router-dom";
import Navigation from "./navigation";

function ProtectedRoute() {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <Navigation />
      <div className="contenido-principal">
        <Outlet />
      </div>
    </>
  );
}

export default ProtectedRoute;
