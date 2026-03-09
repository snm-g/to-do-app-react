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
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  const [modoEliminar, setModoEliminar] = useState(false);
  const [idAEliminar, setIdAEliminar] = useState(null);

  // EFECTOS
  useEffect(() => {
    const cargarCategorias = async () => {
      const datos = await getAll(paginaActual);
      setCategorias(datos?.data || datos || []);
      if (datos?.last_page) setTotalPaginas(datos.last_page);
    };
    cargarCategorias();
  }, [paginaActual]);

  const abrirModalCrear = () => {
    setCategoriaEditando(null);
    setNombre("");
    setIsReadOnly(false);
    setModoEliminar(false);
    setIsModalOpen(true);
  };

  const abrirModalEditar = (categoriaSeleccionada) => {
    setCategoriaEditando(categoriaSeleccionada);
    setNombre(categoriaSeleccionada.name);
    setIsReadOnly(false);
    setModoEliminar(false);
    setIsModalOpen(true);
  };

  const abrirModalVer = async (categoriaSeleccionada) => {
    try {
      const respuesta = await getOne(categoriaSeleccionada.id);
      setCategoriaEditando(respuesta);
      setNombre(respuesta.name);
      setIsReadOnly(true);
      setModoEliminar(false);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error al traer el detalle de la categoría:", error);
    }
  };

  const abrirModalEliminar = (id) => {
    setIdAEliminar(id);
    setModoEliminar(true);
    setIsModalOpen(true);
  };

  const confirmarEliminacion = async () => {
    try {
      await remove(idAEliminar);
      const categoriasRestantes = categorias.filter((cat) => cat.id !== idAEliminar);
      setCategorias(categoriasRestantes);
      cerrarModal();
    } catch (error) {
      console.error("Error al eliminar:", error);
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
      cerrarModal();
    } catch (error) {
      console.error("Error al guardar/actualizar:", error);
    }
  };

  const cerrarModal = () => {
    setIsModalOpen(false);
    setNombre("");
    setCategoriaEditando(null);
    setIsReadOnly(false);
    setModoEliminar(false);
    setIdAEliminar(null);
  };

  let tituloModal = `NUEVA ${texto.toUpperCase()}`;
  if (modoEliminar) {
    tituloModal = `ELIMINAR ${texto.toUpperCase()}`;
  } else if (categoriaEditando) {
    tituloModal = isReadOnly ? `VER ${texto.toUpperCase()}` : `EDITAR ${texto.toUpperCase()}`;
  }

  return (
    <>
      <AddButton texto={texto} onClick={abrirModalCrear} />

      <TableCategoryTag
        data={categorias}
        onEdit={abrirModalEditar}
        onDelete={abrirModalEliminar}
        onView={abrirModalVer}
        paginaActual={paginaActual}
        totalPaginas={totalPaginas}
        setPaginaActual={setPaginaActual}
      />

      <Modal isOpen={isModalOpen} onClose={cerrarModal} texto={tituloModal}>
        {modoEliminar ? (
          <div>
            <p style={{ margin: "20px 0", textAlign: "center", fontSize: "1.1rem" }}>
              ¿Estás seguro de que deseas eliminar esta categoría? Esta acción no se puede deshacer.
            </p>
            <div className="modal-footer">
              <button type="button" className="button-cancel" onClick={cerrarModal}>
                Cancelar
              </button>
              <button type="button" className="button-save" onClick={confirmarEliminacion}>
                Sí, Eliminar
              </button>
            </div>
          </div>
        ) : (
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
        )}
      </Modal>
    </>
  );
}

export default Category;
