import { fetchAPI } from "./api";
export const getAll = async (page = 1) => {
  return await fetchAPI(`/categories?page=${page}`);
};

export const create = async (nuevaCategoria) => {
  return await fetchAPI("/categories", {
    method: "POST",
    body: JSON.stringify(nuevaCategoria),
  });
};

export const update = async (id, categoriaActualizada) => {
  return await fetchAPI(`/categories/${id}`, {
    method: "PUT",
    body: JSON.stringify(categoriaActualizada),
  });
};

export const remove = async (id) => {
  await fetchAPI(`/categories/${id}`, {
    method: "DELETE",
  });
  return true;
};

export const getOne = async (id) => {
  return await fetchAPI(`/categories/${id}`);
};
