import { fetchAPI } from "./api";

export const getAll = async (page = 1) => {
  return await fetchAPI(`/tasks?page=${page}`);
};

export const create = async (nuevaTarea) => {
  return await fetchAPI("/tasks", {
    method: "POST",

    body: JSON.stringify(nuevaTarea),
  });
};

export const update = async (id, tareaActualizada) => {
  return await fetchAPI(`/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(tareaActualizada),
  });
};

export const remove = async (id) => {
  await fetchAPI(`/tasks/${id}`, {
    method: "DELETE",
  });

  return true;
};

export const getOne = async (id) => {
  return await fetchAPI(`/tasks/${id}`);
};
