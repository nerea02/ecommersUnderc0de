import { useCountStore } from "../store/ContadorCarrito";

export default function Carrito() {
  const { count } = useCountStore();

  return (
    <li className="d-flex align-items-center">
      <a href="/">
        <img src="../carrito.png" alt="Carrito" />
        <small>{count}</small>
      </a>
    </li>
  );
}
