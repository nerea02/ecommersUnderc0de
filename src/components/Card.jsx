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
        const response = await fetch("http://localhost:4000/api/productos");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setProductos(data);

        const timeoutId = setTimeout(() => {
          setEstadoApi(true);
        }, 2000);
        return () => clearTimeout(timeoutId);
      } catch (error) {
        console.log("error");
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
        {productos.map((producto, i) => (
          <div key={i} className="card col-3 m-2 d-flex align-items-sm-center">
            <img
              src={image} // Cambia a imagen dinámica
              alt={producto.Nombre ? producto.Nombre : ""}
              className="image"
            />
            <div className="info align-items-sm-center d-flex flex-column">
              <h2>{producto.Nombre ? producto.Nombre : ""}</h2>
              <p className="price">${producto.Precio}</p>
              <p className="price">{producto.Descripcion}</p>

              <ModalAgregarCarrito 
                idProducto={producto.IdProducto} // Pasamos solo el `idProducto`
                imagenProducto={image} 
                nombreProducto={producto.Nombre}  
              />
            </div>
          </div>
        ))}
      </div>
    );
  }
};

export default Card;
