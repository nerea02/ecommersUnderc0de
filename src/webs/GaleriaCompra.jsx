import ButtonHeader from "../components/ButtonHeader.jsx";
import TopHeader from "../components/TopHeader.jsx";
import Footer from "../components/Footer.jsx";
import { useCarritoStore } from "../store/UseStoreCarritoJs.js"; // Importa el store
import { Link } from "react-router-dom";
export default function GaleriaCompra() {
  const carrito = useCarritoStore((state) => state.carrito); // Obtén el carrito
  const cantidadTotal = useCarritoStore((state) => state.cantidadTotal); // Obtén la cantidad total







  
  return (
    <>
      <TopHeader />
      <ButtonHeader />
      <div className="d-flex mt-5 justify-content-center align-items-center ">
      <Link to="/" className="btn btn-primary btn-lg">
        Seguir comprando
      </Link>
    </div>

      {/* Aquí puedes mostrar los productos en el carrito */}
      <div>
        <h3>Productos en el carrito:</h3>
        <ul>
          {carrito.map((item, index) => (
            <li key={index}>
              Producto ID: {item.idProducto} - Color: {item.idColor} - Cantidad: {item.cantidad}
            </li>
          ))}
        </ul>

        <h4>Cantidad total de productos: {cantidadTotal}</h4>
      </div>

      <Footer />
    </>
  );
}