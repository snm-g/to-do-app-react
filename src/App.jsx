import { useEffect } from "react";
import { getAll } from "./services/task.service";

function App() {
  useEffect(() => {
    const probarConexionAPI = async () => {
      const datos = await getAll().catch((error) => {
        console.error("Error: ", error);
        return [];
      });

      console.log("Aquí están los datos:", datos);
    };

    probarConexionAPI();
  }, []);

  return (
    <>
      <h1>Hello World</h1>
      <p>Prueba de conexión a la API</p>
    </>
  );
}

export default App;
