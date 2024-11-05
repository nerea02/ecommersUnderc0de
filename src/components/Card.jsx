import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useCountStore } from "../store/ContadorCarrito";
import "./card.css";

const Card = ({ image }) => {
  const [productos, setProductos] = useState([]); 
  const [error, setError] = useState(null); 
  const [estadoApi, setEstadoApi] = useState(false); 
  const { agregarProducto } = useCountStore(); 

  useEffect(() => {
    // ... (tu código actual)
  }, []);

  // ... (tu código actual)

  const abrirModalYAgregar = (producto) => {
    // ... (tu lógica actual para obtener la cantidad, talle y color)

    Swal.fire({
      // ... (configuración del SweetAlert)
      // ... (tu lógica actual para obtener la cantidad, talle y color)

      preConfirm: () => {
        const cantidad = getCantidad();
        const talle = getTalle();
        const color = getColor();

        if (cantidad <= 0) {
          return Swal.showValidationMessage(
            `Por favor, ingrese una cantidad mayor a 0.`
          );
        }
        if (!talle) {
          return Swal.showValidationMessage(`Por favor, seleccione un talle.`);
        }
        if (!color) {
          return Swal.showValidationMessage(`Por favor, seleccione un color.`);
        }
        return { cantidad, talle, color };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { cantidad, talle, color } = result.value;
        agregarProducto(producto, cantidad); 
      }
    });
  };

  return (
    <div className="row justify-content-evenly d-flex">
      {productos.map((producto, i) => (
        <div key={i} className="card col-3 m-2 d-flex align-items-sm-center">
          {/* ... (tu código actual) */}

          {/* Llama a la función para abrir el modal y agregar el producto */}
          <button onClick={() => abrirModalYAgregar(producto)} className="btn btn-primary">
            Agregar al Carrito
          </button>

        </div>
      ))}
    </div>
  );
};

export default Card;