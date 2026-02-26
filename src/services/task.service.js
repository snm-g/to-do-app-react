const API_URL = "http://127.0.0.1:8000/api/tasks";

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

export const update = async (id, tareaActualizada) => {};

export const remove = async (id) => {};

export const getOne = async (id) => {};
