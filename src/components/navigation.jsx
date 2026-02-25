import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav>
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
  );
}

export default Navigation;
