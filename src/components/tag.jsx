import { useState, useEffect } from "react";
import { getAll, create, update, remove, getOne } from "../services/tag.service";
import AddButton from "../components/addButton";
import TableCategoryTag from "../components/tableCategoryTag";
import Modal from "../components/modal";

function Tag() {
  const texto = "etiqueta";

  // ESTADOS
  const [etiquetas, setEtiquetas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [etiquetaEditando, setEtiquetaEditando] = useState(null);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  const [modoEliminar, setModoEliminar] = useState(false);
  const [idAEliminar, setIdAEliminar] = useState(null);

  // EFECTOS
  useEffect(() => {
    const cargarEtiquetas = async () => {
      const datos = await getAll(paginaActual);

      setEtiquetas(datos?.data || datos || []);
      if (datos?.last_page) setTotalPaginas(datos.last_page);
    };
    cargarEtiquetas();
  }, [paginaActual]);

  const abrirModalCrear = () => {
    setEtiquetaEditando(null);
    setNombre("");
    setIsReadOnly(false);
    setModoEliminar(false);
    setIsModalOpen(true);
  };

  const abrirModalEditar = (etiquetaSeleccionada) => {
    setEtiquetaEditando(etiquetaSeleccionada);
    setNombre(etiquetaSeleccionada.name);
    setIsReadOnly(false);
    setModoEliminar(false);
    setIsModalOpen(true);
  };

  const abrirModalVer = async (etiquetaSeleccionada) => {
    try {
      const respuesta = await getOne(etiquetaSeleccionada.id);
      setEtiquetaEditando(respuesta);
      setNombre(respuesta.name);
      setIsReadOnly(true);
      setModoEliminar(false);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error al traer el detalle de la etiqueta:", error);
    }
  };

  const abrirModalEliminar = (id) => {
    setIdAEliminar(id);
    setModoEliminar(true);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (etiquetaEditando) {
        const respuesta = await update(etiquetaEditando.id, { name: nombre });
        const etiquetasActualizadas = etiquetas.map((tag) => (tag.id === etiquetaEditando.id ? respuesta.data : tag));
        setEtiquetas(etiquetasActualizadas);
      } else {
        const nuevaEtiqueta = await create({ name: nombre });
        setEtiquetas([...etiquetas, nuevaEtiqueta.data]);
      }
      cerrarModal();
    } catch (error) {
      console.error("Error al guardar/actualizar:", error);
    }
  };

  const cerrarModal = () => {
    setIsModalOpen(false);
    setNombre("");
    setEtiquetaEditando(null);
    setIsReadOnly(false);
    setModoEliminar(false);
    setIdAEliminar(null);
  };

  const confirmarEliminacion = async () => {
    try {
      await remove(idAEliminar);
      const etiquetasRestantes = etiquetas.filter((cat) => cat.id !== idAEliminar);
      setEtiquetas(etiquetasRestantes);
      cerrarModal();
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  let tituloModal = `NUEVA ${texto.toUpperCase()}`;
  if (modoEliminar) {
    tituloModal = `ELIMINAR ${texto.toUpperCase()}`;
  } else if (etiquetaEditando) {
    tituloModal = isReadOnly ? `VER ${texto.toUpperCase()}` : `EDITAR ${texto.toUpperCase()}`;
  }

  return (
    <>
      <AddButton texto={texto} onClick={abrirModalCrear} />

      <TableCategoryTag
        data={etiquetas}
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
              ¿Estás seguro de que deseas eliminar esta etiqueta? Esta acción no se puede deshacer.
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
                  {etiquetaEditando ? "Actualizar" : "Guardar"}
                </button>
              )}
            </div>
          </form>
        )}
      </Modal>
    </>
  );
}

export default Tag;
