const API_URL = "https://tu-api-de-ejemplo.com/api/tasks";

export const getAll = async () => {
  const respuesta = await fetch(API_URL);
  return await respuesta.json();
};

export const create = async (nuevaTarea) => {
  const respuesta = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevaTarea),
  });
  return await respuesta.json();
};

export const update = async (id, tareaActualizada) => {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tareaActualizada),
  });
  return await respuesta.json();
};

export const remove = async (id) => {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return respuesta.ok;
};
