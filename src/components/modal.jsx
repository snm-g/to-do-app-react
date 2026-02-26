import "../stylesheets/modal.css";

function Modal({ isOpen, onClose, texto, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{texto.toUpperCase()}</h5>
            <span className="close-create-cat" onClick={onClose}>
              &times;
            </span>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
