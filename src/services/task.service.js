export const getAll = async () => {
  const respuesta = await fetch("http://127.0.0.1:8000/api");
  const tareas = await respuesta.json();
  return tareas;
};
