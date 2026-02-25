const API_URL = 'http://127.0.0.1:8000/api/tasks';

export const create = async (nuevaTarea) => {
  const respuesta = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(nuevaTarea)
  });
  return await respuesta.json();
};

export const update = async (id, tareaActualizada) => {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: 'PUT', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(tareaActualizada)
  });
  return await respuesta.json();
};

export const remove = async (id) => {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  return respuesta.ok; 
};


