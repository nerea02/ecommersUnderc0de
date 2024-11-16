function ListaClientes({ clientes, onEditar, onAlta, onBaja }) {
    return (
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
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
              <td>{cliente.Estado === 1 ? "Activo" : "Inactivo"}</td>
              <td>
                <button onClick={() => onEditar(cliente)}>Editar</button>
                {cliente.Estado === 1 ? (
                  <button onClick={() => onBaja(cliente.IdCliente)}>Dar de baja</button>
                ) : (
                  <button onClick={() => onAlta(cliente.IdCliente)}>Dar de alta</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  