import Btn from "./Btn";
import { useState, useEffect } from "react";
import "./card.css";
import ComponenteSkeleton from "./SkeletonCard";

const Card = ({ image }) => {
  const [productos, setProductos] = useState([]); // Inicializa como array vacío
  const [error, setError] = useState(null); // Estado para errores
  const [estadoApi, setEstadoApi] = useState(false); // Estado para errores
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
        setEstadoApi(true);
      } catch (error) {
        console.log("error");
        setError(error.message);
      }
    };

    fetchData(); // Llama a la función fetchData
  }, []);
  console.log(productos);
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
              src={image}
              alt={producto.nombre ? producto.nombre : ""}
              className="image"
            />
            <div className="info align-items-sm-center d-flex flex-column">
              <h2>{producto.Nombre ? producto.Nombre : ""}</h2>
              <p className="price">${producto ? producto.Precio : ""}</p>
              <p className="price">
                {producto.Descripcion ? producto.Descripcion : ""}
              </p>
              <Btn Texto="Agregar al Carrito" />
            </div>
          </div>
        ))}
      </div>
    );
  }
};

export default Card;
