import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ButtonHeader from "../../components/ButtonHeader";
import Footer from "../../components/Footer";
import TopHeader from "../../components/TopHeader";
import "./listar.css";

const Listar = () => {
  const [listar, setListar] = useState([]);
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [editar, setEditar]= useState();
const navigate = useNavigate();
  const EditarProducto = (productoEditar) => {
    
     navigate(`/Editar?id=${productoEditar}`);
    
  }

  const BajaProducto = async (idvariante) => {
    console.log("Baja Producto: " +idvariante);
    const producto = listar.find(p => p.codigoProducto === idvariante);
    if (!producto) {
      setMensaje("Producto no encontrado.");
      return;
    }
    if (producto.estado === 0) {
      setMensaje("Este producto ya está deshabilitado.");
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/BajaVarianteProducto', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: idvariante }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Error al deshabilitar el producto."); // Manejo de errores más robusto
        return;
      }

      setListar(listar.map(p => p.codigoProducto === idvariante ? { ...p, estado: 0 } : p));
      setMensaje("Producto deshabilitado correctamente.");
    } catch (error) {
      setError('Hubo un error al intentar deshabilitar el producto: ' + error.message);
    } finally {
      setTimeout(() => setMensaje(""), 3000); 
    }
  };

  const AltaProducto = async (idvariante) => {
    console.log("Alta Producto: " +idvariante);
    const producto = listar.find(p => p.codigoProducto === idvariante);
    console.log("se encontro: " +producto);
    if (!producto) {
      setMensaje("Producto no encontrado.");
      return;
    }
    if (producto.estado === 1) {
      setMensaje("Este producto ya está habilitado.");
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/AltaVarianteProducto', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: idvariante }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Error al habilitar el producto."); 
        return;
      }

      setListar(listar.map(p => p.codigoProducto === idvariante ? { ...p, estado: 1 } : p));
      setMensaje("Producto habilitado correctamente.");
    } catch (error) {
      setError('Hubo un error al intentar habilitar el producto: ' + error.message);
    } finally {
      setTimeout(() => setMensaje(""), 3000); 
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/ABMListar");
        if (!response.ok) {
          throw new Error('Error al obtener los productos');
        }
        const data = await response.json();
        console.log(data)
        setListar(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);


  return (
    <div className=" contenedorABM">
      <TopHeader />
      <ButtonHeader />
      <div>

   
      </div>
      <div className="container mt-5">
        <h2 className="text-center">Lista de Productos</h2>
        {mensaje && <div className="alert alert-info">{mensaje}</div>}
        {error && <div className="alert alert-danger">{error}</div>} 

        <table className="table table-striped">
          <thead>
            <tr>
              <th className="align-middle">#</th>
              <th className="align-middle">Nombre</th>
              <th className="align-middle">Descripción</th>
              <th className="align-middle">Precio</th>
              <th className="align-middle">Talle</th>
              <th className="align-middle">Color</th>
              <th className="align-middle">Imagen</th>
              <th className="align-middle">Calificación</th>
              <th className="align-middle">Estado</th>
              <th className="align-middle">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {listar.map((lista,i) => (
              <tr key={lista.codigoProducto}>
                <td className="align-middle">{i+1}</td> 
                <td className="align-middle">{lista.nombre}</td>
                <td className="align-middle">{lista.descripcion}</td>
                <td className="align-middle">{lista.precio}</td>
                <td className="align-middle">{lista.talle}</td>
                <td className="align-middle">{lista.color}</td>
                <td className="align-middle">
                  <img
                    src={lista.imagen || "https://via.placeholder.com/50"} 
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
                <td className="align-middle">{lista.calificacion}</td>
                <td className="align-middle">{lista.estado === 1 ? "Activo" : "Inactivo"}</td>
                <td className="align-middle">
                  {lista.estado === 1 ? 
                   <button className="btn btn-danger btn-sm" onClick={() => BajaProducto(lista.codigoProducto)}>
                   <i className="fa-solid fa-trash"></i> Deshabilitar
                 </button>
                 :
                 <button className="btn btn-success btn-sm me-2" onClick={() => AltaProducto(lista.codigoProducto)}>
                 <i className="fa-solid fa-check"></i> Habilitar
               </button>
                  
                
                }

              <button className="btn btn-danger btn-sm" onClick={() => EditarProducto(lista.codigoProducto)}>
                   <i className="fa-solid fa-trash"></i> Editar
                 </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="contenedorFooter">
        <Footer />
      </div>
    </div>
  );
};

export default Listar;