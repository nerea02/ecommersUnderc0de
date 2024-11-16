import React, { useEffect, useState } from "react";
import { manejarEstado, manejarGuardar, obtenerClientes } from "./ClientesService";
import "./clientes.css";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

  useEffect(() => {
    obtenerClientes().then(setClientes);
  }, []);

  const guardarCliente = (cliente) => {
    manejarGuardar(cliente)
      .then(() => obtenerClientes().then(setClientes))
      .catch((error) => console.error("Error al guardar cliente:", error));
  };

  const cambiarEstadoCliente = (id, activar) => {
    manejarEstado(id, activar)
      .then(() => obtenerClientes().then(setClientes))
      .catch((error) => console.error("Error al cambiar estado:", error));
  };

  return (
    <div className="clientes-container">
      <h1 className="clientes-title">Gestión de Clientes</h1>
      <button
        className="nuevo-cliente-btn"
        onClick={() => setClienteSeleccionado({})}
      >
        Nuevo Cliente
      </button>
      <table className="clientes-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.IdCliente}>
              <td>{cliente.Nombre}</td>
              <td>{cliente.Apellido}</td>
              <td>{cliente.Email}</td>
              <td>{cliente.Tel}</td>
              <td>{cliente.Estado ? "Activo" : "Inactivo"}</td>
              <td className="clientes-actions">
                <button
                  className="editar-btn"
                  onClick={() => setClienteSeleccionado(cliente)}
                >
                  Editar
                </button>
                <button
                  className="estado-btn"
                  onClick={() =>
                    cambiarEstadoCliente(cliente.IdCliente, !cliente.Estado)
                  }
                >
                  {cliente.Estado ? "Desactivar" : "Activar"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {clienteSeleccionado && (
        <FormularioCliente
          cliente={clienteSeleccionado}
          onGuardar={guardarCliente}
          onCancelar={() => setClienteSeleccionado(null)}
        />
      )}
    </div>
  );
};

export default Clientes;
