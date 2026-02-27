import { fetchAPI } from "./api";

export const getAll = async (page = 1) => {
  return await fetchAPI(`/tags?page=${page}`);
};

export const create = async (nuevaEtiqueta) => {
  return await fetchAPI("/tags", {
    method: "POST",
    body: JSON.stringify(nuevaEtiqueta),
  });
};

export const update = async (id, etiquetaActualizada) => {
  return await fetchAPI(`/tags/${id}`, {
    method: "PUT",
    body: JSON.stringify(etiquetaActualizada),
  });
};

export const remove = async (id) => {
  await fetchAPI(`/tags/${id}`, {
    method: "DELETE",
  });
  return true;
};

export const getOne = async (id) => {
  return await fetchAPI(`/tags/${id}`);
};
