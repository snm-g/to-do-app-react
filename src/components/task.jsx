import { useState, useEffect } from "react";
import { getAll } from "../services/category.service";

function Category() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const cargarCategorias = async () => {
      const datos = await getAll().catch((error) => {
        console.error("Error al traer las categorías:", error);
        return [];
      });
      setCategorias(datos);
    };

    cargarCategorias();
  }, []);

  return (
    <>
      <h2>Lista de Categorías </h2>

      <table border="1" style={{ width: "100%", textAlign: "left", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.id}>
              <td>{categoria.id}</td>
              <td>{categoria.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Category;
