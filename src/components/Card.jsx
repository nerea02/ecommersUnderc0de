import { useEffect, useState } from "react";
import { useCountStore } from "../store/ContadorCarrito";
import "./card.css";
import ModalAgregarCarrito from "./ModalAgregarCarrito";
import ComponenteSkeleton from "./SkeletonCard";

const Card = ({ image }) => {
  const [productos, setProductos] = useState([]); // Inicializa como array vacío
  const [error, setError] = useState(null); // Estado para errores
  const [estadoApi, setEstadoApi] = useState(false); // Estado para errores
  const [valor, setValor] = useState(0);
  const { sumar } = useCountStore();

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

    fetchData(); // Llama a la función fetchData
  }, []);

  // me verifica que la api me halla traido los datos espera unos segundo mostrando el skeleton y despues las imagenes
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
                sumar={sumar} 
                imagenProducto={image} // Pasamos la imagen al modal
                nombreProducto={producto.Nombre}  // Pasamos el nombre al modal
              />
            </div>
          </div>
        ))}
      </div>
    );
  }
};

export default Card;