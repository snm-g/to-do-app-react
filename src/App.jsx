import AppRouter from "./AppRouter";
import { useEffect } from "react";
import "./stylesheets/App.css";

function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);
  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
