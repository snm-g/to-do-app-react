import { NavLink } from "react-router-dom";
import "../stylesheets/navigation.css";
import LogoutButton from "../components/logoutButton";
function Navigation() {
  return (
    <>
      <div className="title-div">
        <h1>LISTA DE TAREAS</h1>
        <LogoutButton />
      </div>

      <nav className="navigation-div">
        <ul>
          <li>
            <NavLink to="/task">Tareas</NavLink>
          </li>
          <li>
            <NavLink to="/category">Categorías</NavLink>
          </li>
          <li>
            <NavLink to="/tag">Etiquetas</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navigation;
