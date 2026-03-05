import { useState, useEffect } from "react";
import { getAll, create, update } from "../services/category.service";
import AddButton from "../components/addButton";
import TableCategoryTag from "../components/tableCategoryTag";
import Modal from "../components/modal";

function Category() {
  const texto = "categoría";

  // ESTADOS
  const [categorias, setCategorias] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [categoriaEditando, setCategoriaEditando] = useState(null);

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

  const abrirModalCrear = () => {
    setCategoriaEditando(null);
    setNombre("");
    setIsModalOpen(true);
  };
  const abrirModalEditar = (categoriaSeleccionada) => {
    setCategoriaEditando(categoriaSeleccionada);
    setNombre(categoriaSeleccionada.name);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (categoriaEditando) {
        const respuesta = await update(categoriaEditando.id, { name: nombre });
        const categoriasActualizadas = categorias.map((cat) =>
          cat.id === categoriaEditando.id ? respuesta.data : cat,
        );
        setCategorias(categoriasActualizadas);
      } else {
        const nuevaCategoria = await create({ name: nombre });
        setCategorias([...categorias, nuevaCategoria.data]);
      }

      setNombre("");
      setCategoriaEditando(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al guardar/actualizar:", error);
    }
  };

  const cerrarModal = () => {
    setIsModalOpen(false);
    setNombre("");
    setCategoriaEditando(null);
  };

  return (
    <>
      <AddButton texto={texto} onClick={abrirModalCrear} />

      <TableCategoryTag data={categorias} onEdit={abrirModalEditar} />

      <Modal
        isOpen={isModalOpen}
        onClose={cerrarModal}
        texto={categoriaEditando ? `EDITAR ${texto.toUpperCase()}` : `NUEVA ${texto.toUpperCase()}`}
      >
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
            <button type="button" className="button-cancel" onClick={cerrarModal}>
              Cancelar
            </button>
            <button type="submit" className="button-save">
              {categoriaEditando ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default Category;
