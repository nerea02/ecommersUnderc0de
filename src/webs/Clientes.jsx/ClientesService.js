export const obtenerClientes = async () => {
    const res = await fetch("/clientes");
    return res.json();
  };
  
  export const crearCliente = async (cliente) => {
    const res = await fetch("/nuevoCliente", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente),
    });
    return res.json();
  };
  
  export const actualizarCliente = async (id, cliente) => {
    const res = await fetch(`/actualizarCliente/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente),
    });
    return res.json();
  };
  
  export const cambiarEstadoCliente = async (id, activo) => {
    const url = activo ? "/AltaLogicaClientes" : "/BajaLogicaCliente";
    const res = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    return res.json();
  };
  