import { useState, useEffect } from "react";
import {
  getAll as getAllTasks,
  create as createTask,
  update as updateTask,
  getOne as getTask,
  remove as removeTask,
} from "../services/task.service";
import { getAll as getAllCategories } from "../services/category.service";
import { getAll as getAllTags } from "../services/tag.service";

import AddButton from "../components/addButton";
import Modal from "../components/modal";
import "../stylesheets/Task.css";

function Task() {
  const texto = "tarea";

  const [tareas, setTareas] = useState([]);
  const [categoriasLista, setCategoriasLista] = useState([]);
  const [etiquetasLista, setEtiquetasLista] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [tareaEditando, setTareaEditando] = useState(null);

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [etiquetasSeleccionadas, setEtiquetasSeleccionadas] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const cargarTodo = async () => {
      try {
        const tareasData = await getAllTasks();
        const categoriasData = await getAllCategories();
        const etiquetasData = await getAllTags();

        setTareas(tareasData.data ? tareasData.data : tareasData);
        setCategoriasLista(categoriasData.data ? categoriasData.data : categoriasData);
        setEtiquetasLista(etiquetasData.data ? etiquetasData.data : etiquetasData);
      } catch (error) {
        console.error("Error al cargar los datos iniciales:", error);
      }
    };
    cargarTodo();
  }, []);

  const abrirModalCrear = () => {
    setTareaEditando(null);
    setTitulo("");
    setDescripcion("");
    setCategoriaId("");
    setEtiquetasSeleccionadas([]);
    setIsCompleted(false);
    setIsReadOnly(false);
    setIsModalOpen(true);
  };

  const abrirModalEditar = (tarea) => {
    setTareaEditando(tarea);
    setTitulo(tarea.title);
    setDescripcion(tarea.description || "");
    setCategoriaId(tarea.category_id);
    setEtiquetasSeleccionadas(tarea.tags ? tarea.tags.map((t) => t.id) : []);
    setIsCompleted(tarea.is_completed === 1 || tarea.is_completed === true);
    setIsReadOnly(false);
    setIsModalOpen(true);
  };

  const abrirModalVer = async (tareaSeleccionada) => {
    try {
      const respuesta = await getTask(tareaSeleccionada.id);
      const tareaDetalle = respuesta.data ? respuesta.data : respuesta;

      setTareaEditando(tareaDetalle);
      setTitulo(tareaDetalle.title);
      setDescripcion(tareaDetalle.description || "");
      setCategoriaId(tareaDetalle.category_id);
      setEtiquetasSeleccionadas(tareaDetalle.tags ? tareaDetalle.tags.map((t) => t.id) : []);
      setIsCompleted(tareaDetalle.is_completed === 1 || tareaDetalle.is_completed === true);

      setIsReadOnly(true);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error al traer el detalle de la tarea:", error);
    }
  };

  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar esta tarea?");
    if (confirmar) {
      try {
        await removeTask(id);

        setTareas(tareas.filter((t) => t.id !== id));
      } catch (error) {
        console.error("Error al eliminar la tarea:", error);
      }
    }
  };

  const handleAgregarEtiqueta = (e) => {
    const id = parseInt(e.target.value);
    if (id && !etiquetasSeleccionadas.includes(id)) {
      setEtiquetasSeleccionadas([...etiquetasSeleccionadas, id]);
    }
  };

  const handleQuitarEtiqueta = (idParaQuitar) => {
    setEtiquetasSeleccionadas(etiquetasSeleccionadas.filter((id) => id !== idParaQuitar));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: titulo,
        description: descripcion,
        category_id: categoriaId,
        tags: etiquetasSeleccionadas,
        is_completed: isCompleted ? 1 : 0,
      };

      if (tareaEditando) {
        const respuesta = await updateTask(tareaEditando.id, payload);
        const tareaActualizada = respuesta.data ? respuesta.data : respuesta;
        setTareas(tareas.map((t) => (t.id === tareaEditando.id ? tareaActualizada : t)));
      } else {
        const nuevaTarea = await createTask(payload);
        const tareaInsertar = nuevaTarea.data ? nuevaTarea.data : nuevaTarea;
        setTareas([...tareas, tareaInsertar]);
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al guardar la tarea:", error);
    }
  };

  let tituloModal = `NUEVA ${texto.toUpperCase()}`;
  if (tareaEditando) {
    tituloModal = isReadOnly ? `VER ${texto.toUpperCase()}` : `EDITAR ${texto.toUpperCase()}`;
  }

  return (
    <>
      <AddButton texto={texto} onClick={abrirModalCrear} />

      <div className="table-div">
        <table>
          <thead>
            <tr>
              <th>TÍTULO</th>
              <th>CATEGORÍA</th>
              <th>ETIQUETAS</th>
              <th>ESTADO</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {tareas.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.category ? item.category.name : "Sin categoría"}</td>
                <td>
                  {item.tags && item.tags.length > 0 ? (
                    item.tags.map((t) => t.name).join(", ")
                  ) : (
                    <span className="no-tags-text">Sin etiquetas</span>
                  )}
                </td>
                <td>
                  {item.is_completed ? (
                    <span className="status-completed">Completada</span>
                  ) : (
                    <span className="status-pending">Pendiente</span>
                  )}
                </td>
                <td>
                  <button className="button-view" onClick={() => abrirModalVer(item)}>
                    Ver
                  </button>
                  <button className="button-edit" onClick={() => abrirModalEditar(item)}>
                    Editar
                  </button>
                  <button className="button-delete" onClick={() => handleEliminar(item.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} texto={tituloModal}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>TÍTULO *</label>
            <input
              type="text"
              className="form-input"
              required
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              disabled={isReadOnly}
            />
          </div>

          <div className="form-group">
            <label>DESCRIPCIÓN</label>
            <textarea
              className="form-input"
              rows="3"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              disabled={isReadOnly}
            ></textarea>
          </div>

          <div className="form-group">
            <label>CATEGORÍA *</label>
            <select
              className="form-input"
              required
              value={categoriaId}
              onChange={(e) => setCategoriaId(e.target.value)}
              disabled={isReadOnly}
            >
              <option value="">Seleccione una categoría...</option>
              {categoriasLista.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>ETIQUETAS</label>
            {!isReadOnly && (
              <select className="form-input" onChange={handleAgregarEtiqueta} value="">
                <option value="" disabled>
                  Seleccione una etiqueta para agregar...
                </option>
                {etiquetasLista
                  .filter((tag) => !etiquetasSeleccionadas.includes(tag.id))
                  .map((tag) => (
                    <option key={tag.id} value={tag.id}>
                      {tag.name}
                    </option>
                  ))}
              </select>
            )}

            <div className="tags-container">
              {etiquetasSeleccionadas.length === 0 && (
                <span className="no-tags-selected">Ninguna etiqueta seleccionada.</span>
              )}
              {etiquetasSeleccionadas.map((tagId) => {
                const tagCompleta = etiquetasLista.find((t) => t.id === tagId);
                if (!tagCompleta) return null;

                return (
                  <span key={tagId} className="tag-badge">
                    {tagCompleta.name}
                    {!isReadOnly && (
                      <button type="button" onClick={() => handleQuitarEtiqueta(tagId)} className="tag-remove-button">
                        &times;
                      </button>
                    )}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={isCompleted}
                onChange={(e) => setIsCompleted(e.target.checked)}
                className="checkbox-input"
                disabled={isReadOnly}
              />
              Marcar como Completada
            </label>
          </div>

          <div className="modal-footer">
            <button type="button" className="button-cancel" onClick={() => setIsModalOpen(false)}>
              {isReadOnly ? "Cerrar" : "Cancelar"}
            </button>
            {!isReadOnly && (
              <button type="submit" className="button-save">
                {tareaEditando ? "Actualizar" : "Guardar"}
              </button>
            )}
          </div>
        </form>
      </Modal>
    </>
  );
}

export default Task;
