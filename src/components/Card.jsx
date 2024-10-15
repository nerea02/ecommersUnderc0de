import Btn from "./Btn";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import "./card.css";
import ComponenteSkeleton from "./SkeletonCard";
import { useCountStore } from "../store/ContadorCarrito";

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

  //este toma la cantidad de elementos para agregar al carrito
  const cantidad = (event) => {
    const newValue = parseInt(event.target.value, 10);

    if (newValue >= 0 && newValue <= 10) {
      setValor(newValue);
    }
  };
  //fin elementos para agregar al carrito

  //ejeplo de como hacer el evento onclick y pasarle los valores para q sume
  //  onClick={() => sumar(valor)}
  /*  <input
                type="number"
                min={0}
                max={10}
                onChange={cantidad}
                value={valor}
              />*/
  //evento para el modal

  const modalAgregarCarrito = (e) => {
    e.preventDefault();
    Swal.fire({
      imageUrl: "https://placeholder.pics/svg/300x1500",
      imageHeight: 150,
      imageAlt: "A tall image",
      title: "Camisa",
      text: "Caracteristicas?",
      html: `
      <label for="talleS">Caltidad</label>
        <input
          type="number"
          min="0"
          max="10"
          onChange={cantidad}
          value=0
        />
        <br><br>
 <h4>Selecciona un talle:</h4>
<input type="radio" id="talleS" name="talle" value="S">
<label for="talleS">Talle S</label><br>

<input type="radio" id="talleM" name="talle" value="M">
<label for="talleM">Talle M</label><br>

<input type="radio" id="talleL" name="talle" value="L">
<label for="talleL">Talle L</label><br>

<h4>Selecciona un color:</h4>
<input type="radio" id="colorRojo" name="color" value="Rojo">
<label for="colorRojo" style="color: red;">Rojo</label><br>

<input type="radio" id="colorVerde" name="color" value="Verde">
<label for="colorVerde" style="color: green;">Verde</label><br>

<input type="radio" id="colorAzul" name="color" value="Azul">
<label for="colorAzul" style="color: blue;">Azul</label><br>
      `,
      showDenyButton: true,
      confirmButtonText: "Agregar",
      denyButtonText: `Cancelar`,
      allowOutsideClick: false,
    });
  };

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

              <div onClick={modalAgregarCarrito}>
                <Btn Texto="Agregar al Carrito" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
};

export default Card;
