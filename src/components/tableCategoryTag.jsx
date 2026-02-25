import "../stylesheets/tableCategoryTag.css";

function TableCategoryTag({ data, onEdit }) {
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
                <button className="button-edit" onClick={() => onEdit(item)}>
                  Editar
                </button>
                <button className="button-delete">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableCategoryTag;
