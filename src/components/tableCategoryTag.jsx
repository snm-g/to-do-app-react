import "../stylesheets/tableCategoryTag.css";
import Paginacion from "../components/paginacion";

function TableCategoryTag({ data, onEdit, onDelete, onView, paginaActual, totalPaginas, setPaginaActual }) {
  return (
    <div className="table-div">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NOMBRE</th>
            <th>ACCIONES</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                <button className="button-view" onClick={() => onView(item)}>
                  Ver
                </button>
                <button className="button-edit" onClick={() => onEdit(item)}>
                  Editar
                </button>
                <button className="button-delete" onClick={() => onDelete(item.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Paginacion paginaActual={paginaActual} totalPaginas={totalPaginas} cambiarPagina={setPaginaActual} />
    </div>
  );
}

export default TableCategoryTag;
