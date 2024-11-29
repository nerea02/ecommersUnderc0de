import { useCarritoStore } from "../store/UseStoreCarritoJs.js"; // Asegúrate de importar el estado correcto

export default function Carrito() {
  const carrito = useCarritoStore((state) => state.carrito); // Obtener el carrito desde el estado

  
  const count = carrito.reduce((total, item) => total + item.cantidad, 0);

  return (
    <li className="d-flex align-items-center">
      <a href="/">
        <img src="../carrito.png" alt="Carrito" />
        <small>{count}</small> 
       
      </a>
    </li>
  );
}