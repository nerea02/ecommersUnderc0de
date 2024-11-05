import Swal from "sweetalert2";
import { useCountStore } from "../store/ContadorCarrito";

const ModalAgregarCarrito = ({ producto }) => {
  // El producto ya se recibe como prop, no hay necesidad de usar useCountStore aquí
  const { agregarProducto } = useCountStore();

  const abrirModal = () => {
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
        // No se necesita la función agregarProducto aquí, ya que es manejada por el componente Card.jsx
        agregarProducto(producto, cantidad); 
      }
    });
  };

  return (
    <button onClick={abrirModal} className="btn btn-primary">
      Agregar al Carrito
    </button>
  );
};

export default ModalAgregarCarrito;