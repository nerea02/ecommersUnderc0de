import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginModal = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ usuario: "", contraseña: "" });

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    // Aquí puedes agregar la lógica para autenticar al usuario
    handleClose(); // Cerrar el modal después del envío
  };

  return (
    <>
      {/* Botón para abrir el modal */}
      <button className="btn btn-primary" onClick={handleShow}>
        Iniciar Sesión
      </button>

      {/* Modal */}
      {show && (
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block", background: "rgba(0, 0, 0, 0.5)" }}
          onClick={handleClose}
        >
          <div
            className="modal-dialog"
            role="document"
            onClick={(e) => e.stopPropagation()} // Evitar cerrar al hacer clic dentro del modal
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Inicio de Sesión</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="usuario" className="form-label">
                      Usuario
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="usuario"
                      name="usuario"
                      value={formData.usuario}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="contraseña" className="form-label">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="contraseña"
                      name="contraseña"
                      value={formData.contraseña}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Iniciar Sesión
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;
