import { useState, useEffect } from "react";
import { getAll, create } from "../services/category.service";
import AddButton from "../components/addButton";
import TableCategoryTag from "../components/tableCategoryTag";
import Modal from "../components/modal";

function Category() {
  const texto = "categoría";
  // ESTADOS
  const [categorias, setCategorias] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  // EFECTOS
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const nuevaCategoria = await create({ name: nombre });

      // LA MAGIA ESTÁ AQUÍ: Agregamos el ".data" al final
      setCategorias([...categorias, nuevaCategoria.data]);

      setNombre("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  return (
    <>
      <AddButton texto={texto} onClick={() => setIsModalOpen(true)} />
      <TableCategoryTag data={categorias} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} texto={texto}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>NOMBRE</label>
            <input
              type="text"
              name="name"
              className="form-input"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="button-cancel" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </button>
            <button type="submit" className="button-save">
              Guardar
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default Category;
