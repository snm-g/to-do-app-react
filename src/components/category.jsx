import { useState, useEffect } from "react";
import { getAll, create, update, remove, getOne } from "../services/category.service";
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
  const [isReadOnly, setIsReadOnly] = useState(false);

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
    setIsReadOnly(false);
    setIsModalOpen(true);
  };
  const abrirModalEditar = (categoriaSeleccionada) => {
    setCategoriaEditando(categoriaSeleccionada);
    setNombre(categoriaSeleccionada.name);
    setIsReadOnly(false);
    setIsModalOpen(true);
  };
  const abrirModalVer = async (categoriaSeleccionada) => {
    try {
      const respuesta = await getOne(categoriaSeleccionada.id);
      const categoriaDetalle = respuesta.data ? respuesta.data : respuesta;
      setCategoriaEditando(categoriaDetalle);
      setNombre(categoriaDetalle.name);
      setIsReadOnly(true);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error al traer el detalle de la categoría:", error);
    }
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
    setIsReadOnly(false);
  };

  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar esta categoría?");

    if (confirmar) {
      try {
        await remove(id);
        const categoriasRestantes = categorias.filter((cat) => cat.id !== id);
        setCategorias(categoriasRestantes);
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
    }
  };

  let tituloModal = `NUEVA ${texto.toUpperCase()}`;
  if (categoriaEditando) {
    tituloModal = isReadOnly ? `VER ${texto.toUpperCase()}` : `EDITAR ${texto.toUpperCase()}`;
  }
  return (
    <>
      <AddButton texto={texto} onClick={abrirModalCrear} />

      <TableCategoryTag data={categorias} onEdit={abrirModalEditar} onDelete={handleEliminar} onView={abrirModalVer} />

      <Modal isOpen={isModalOpen} onClose={cerrarModal} texto={tituloModal}>
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
              disabled={isReadOnly}
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="button-cancel" onClick={cerrarModal}>
              {isReadOnly ? "Cerrar" : "Cancelar"}
            </button>
            {!isReadOnly && (
              <button type="submit" className="button-save">
                {categoriaEditando ? "Actualizar" : "Guardar"}
              </button>
            )}
          </div>
        </form>
      </Modal>
    </>
  );
}

export default Category;
