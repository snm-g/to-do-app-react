const API_URL = "http://localhost:3000/api";

export const login = async (email, password) => {
  const respuesta = await fetch(`${API_URL}/users/login`, {
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

  const data = await respuesta.json();
  const tokenRecibido = data.token || data.access_token || data;
  if (tokenRecibido) {
    localStorage.setItem("token", tokenRecibido);
  }

  return data;
};
