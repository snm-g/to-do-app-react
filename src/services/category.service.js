const API_URL = "http://127.0.0.1:8000/api/categories";

export const getAll = async () => {
  const respuesta = await fetch(API_URL);
  return await respuesta.json();
};

export const create = async (nuevaCategoria) => {
  const respuesta = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevaCategoria),
  });
  return await respuesta.json();
};

export const update = async (id, categoriaActualizada) => {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoriaActualizada),
  });
  return await respuesta.json();
};

export const remove = async (id) => {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return respuesta.ok;
};
