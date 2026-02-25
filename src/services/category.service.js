const API_URL = "http://127.0.0.1:8000/api/categories";

export const getAll = async () => {
  const respuesta = await fetch(API_URL);
  return await respuesta.json();
};

export const create = async (nuevaCategoria) => {

};

export const update = async (id, categoriaActualizada) => {

};

export const remove = async (id) => {

};
