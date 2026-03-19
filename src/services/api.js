const BASE_URL = "http://localhost:3000/api";

export const fetchAPI = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (response.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
    throw new Error("Sesión expirada");
  }

  // ==========================================
  // LA MAGIA: Leer el error real del backend
  // ==========================================
  if (!response.ok) {
    let mensajeError = `Error del servidor: ${response.status}`;
    try {
      const errorData = await response.json();
      if (errorData.error) {
        mensajeError = errorData.error; // Atrapamos el error que mandó Node.js
      }
    } catch (e) {
      // Si la respuesta no era un JSON, nos quedamos con el error genérico
    }
    throw new Error(mensajeError);
  }
  // ==========================================

  if (response.status === 204) {
    return null;
  }

  return await response.json();
};
