import { useEffect, useState } from "react";
import "./card.css";
import ModalAgregarCarrito from "./ModalAgregarCarrito";
import ComponenteSkeleton from "./SkeletonCard";

const Card = ({ image }) => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [estadoApi, setEstadoApi] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/ABMListar");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        
        // Mostrar los datos de la respuesta en consola
        console.log("Los datos son:", data);

        // Filtrar solo los productos con estado = 1
        const productosActivos = data.filter((producto) => producto.estado === 1);
        setProductos(productosActivos);

        const timeoutId = setTimeout(() => {
          setEstadoApi(true);
        }, 2000);
        return () => clearTimeout(timeoutId);
      } catch (error) {
        console.log("Error:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  if (!estadoApi) {
    return (
      <>
        <ComponenteSkeleton />
      </>
    );
  } else {
    return (
      <div className="row justify-content-evenly d-flex">
        {productos.map((producto) => (
          <div key={producto.codigoProducto} className="card col-3 m-2 d-flex align-items-sm-center">
          
            
            <img
              src={producto.imagen} 
              alt={producto.nombre ? producto.nombre : ""}
              className="image"
            />
            <div className="info align-items-sm-center d-flex flex-column">
              <h2>{producto.nombre ? producto.nombre : ""}</h2>
              <p className="price">${producto.precio}</p>
              <p className="price">{producto.descripcion}</p>

              <ModalAgregarCarrito 
                idProducto={producto.codigoProducto} 
                imagenProducto={producto.imagen}  
                nombreProducto={producto.nombre}  
              />
            </div>
          </div>
        ))}
      </div>
    );
  }
};

export default Card;