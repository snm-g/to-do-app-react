import "../stylesheets/addButton.css";
function AddButton({ texto, onClick }) {
  return (
    <div className="button-add-div">
      <button className="button-add" onClick={onClick}>
        Agregar nueva {texto}
      </button>
    </div>
  );
}

export default AddButton;
