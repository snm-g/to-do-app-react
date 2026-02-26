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

  // EFECTOS
  useEffect(() => {
    const cargarEtiquetas = async () => {
      const datos = await getAll().catch((error) => {
        console.error("Error al traer las etiquetas:", error);
        return [];
      });
      setEtiquetas(datos);
    };
    cargarEtiquetas();
  }, []);

  const abrirModalCrear = () => {
    setEtiquetaEditando(null);
    setNombre("");
    setIsReadOnly(false);
    setIsModalOpen(true);
  };
  const abrirModalEditar = (etiquetaSeleccionada) => {
    setEtiquetaEditando(etiquetaSeleccionada);
    setNombre(etiquetaSeleccionada.name);
    setIsReadOnly(false);
    setIsModalOpen(true);
  };
  const abrirModalVer = async (etiquetaSeleccionada) => {
    try {
      const respuesta = await getOne(etiquetaSeleccionada.id);
      const etiquetaDetalle = respuesta.data ? respuesta.data : respuesta;
      setEtiquetaEditando(etiquetaDetalle);
      setNombre(etiquetaDetalle.name);
      setIsReadOnly(true);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error al traer el detalle de la etiqueta:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (etiquetaEditando) {
        const respuesta = await update(etiquetaEditando.id, { name: nombre });
        const etiquetasActualizadas = etiquetas.map((cat) => (cat.id === etiquetaEditando.id ? respuesta.data : cat));
        setEtiquetas(etiquetasActualizadas);
      } else {
        const nuevaEtiqueta = await create({ name: nombre });
        setEtiquetas([...etiquetas, nuevaEtiqueta.data]);
      }

      setNombre("");
      setEtiquetaEditando(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al guardar/actualizar:", error);
    }
  };

  const cerrarModal = () => {
    setIsModalOpen(false);
    setNombre("");
    setEtiquetaEditando(null);
    setIsReadOnly(false);
  };

  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar esta etiqueta?");

    if (confirmar) {
      try {
        await remove(id);
        const etiquetasRestantes = etiquetas.filter((cat) => cat.id !== id);
        setEtiquetas(etiquetasRestantes);
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
    }
  };

  let tituloModal = `NUEVA ${texto.toUpperCase()}`;
  if (etiquetaEditando) {
    tituloModal = isReadOnly ? `VER ${texto.toUpperCase()}` : `EDITAR ${texto.toUpperCase()}`;
  }
  return (
    <>
      <AddButton texto={texto} onClick={abrirModalCrear} />

      <TableCategoryTag data={etiquetas} onEdit={abrirModalEditar} onDelete={handleEliminar} onView={abrirModalVer} />

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
                {etiquetaEditando ? "Actualizar" : "Guardar"}
              </button>
            )}
          </div>
        </form>
      </Modal>
    </>
  );
}

export default Tag;
