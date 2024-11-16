import React, { useState } from "react";

const FormularioCliente = ({ cliente, onGuardar, onCancelar }) => {
  const [formData, setFormData] = useState(cliente);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input
          type="text"
          name="Nombre"
          value={formData.Nombre || ""}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Apellido:
        <input
          type="text"
          name="Apellido"
          value={formData.Apellido || ""}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="Email"
          value={formData.Email || ""}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Teléfono:
        <input
          type="text"
          name="Tel"
          value={formData.Tel || ""}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Guardar</button>
      <button type="button" onClick={onCancelar}>
        Cancelar
      </button>
    </form>
  );
};

export default FormularioCliente;
