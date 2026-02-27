const BASE_URL = "http://127.0.0.1:8000/api";

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
    window.location.href = "/login";
    throw new Error("Sesión expirada");
  }

  if (!response.ok) {
    throw new Error(`Error del servidor: ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return await response.json();
};
