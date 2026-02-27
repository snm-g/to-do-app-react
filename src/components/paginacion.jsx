function Paginacion({ paginaActual, totalPaginas, cambiarPagina }) {
  if (totalPaginas <= 1) return null;

  return (
    <div
      className="paginacion-controles"
      style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "20px" }}
    >
      <button onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>
        ⬅️ Anterior
      </button>

      <span>
        Página {paginaActual} de {totalPaginas}
      </span>

      <button onClick={() => cambiarPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas}>
        Siguiente ➡️
      </button>
    </div>
  );
}

export default Paginacion;
