import { useNavigate } from "react-router-dom";
import "../stylesheets/logoutButton.css";
function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <button onClick={handleLogout} className="button-logout">
      Cerrar Sesión
    </button>
  );
}

export default LogoutButton;
