import { useState } from "react";
import { login } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import "../stylesheets/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 1. Intentamos iniciar sesión
      const data = await login(email, password);

      // 🎤 MICRÓFONO: Vamos a ver qué nos mandó Laravel
      console.log("Respuesta del Login:", data);

      // 2. Guardamos el token de forma segura
      // (Si tu token se llama diferente, aquí lo descubriremos)
      const tokenRecibido = data.token || data.access_token || data;

      localStorage.setItem("token", tokenRecibido);

      // 3. Te vas a tu página de inicio como querías
      navigate("/");
    } catch (err) {
      // Si falla la contraseña o el servidor, mostramos el error en rojo en tu pantalla
      setError("Credenciales incorrectas o error de conexión.");
      console.error("Falló el login:", err);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Iniciar Sesión</h2>

      {error && <div className="login-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="login-form-group">
          <label>CORREO ELECTRÓNICO</label>
          <input
            type="email"
            className="login-input"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ejemplo@correo.com"
          />
        </div>

        <div className="login-form-group">
          <label>CONTRASEÑA</label>
          <input
            type="password"
            className="login-input"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
          />
        </div>

        <button type="submit" className="login-button">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
