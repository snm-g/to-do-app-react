const API_URL = "http://127.0.0.1:8000/api";

export const login = async (email, password) => {
  const respuesta = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!respuesta.ok) {
    throw new Error("Correo o contraseña incorrectos");
  }
  return await respuesta.json();
};
