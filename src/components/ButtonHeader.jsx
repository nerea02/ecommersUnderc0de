import "./ButtonHeader.css";
import Carrito from "./Carrito";
import OpcionesHeader from "./OpcionesHeaders";

const ButtonHeader = () => {
  return (
    <header>
      <nav className="navbar">
        <ul className="nav-links ulNav d-flex align-items-center">
          <OpcionesHeader opcione="INICIO" />
          <OpcionesHeader opcione="PRODUCTO" />
          <OpcionesHeader opcione="NUEVAS TENDENCIAS" />
          <OpcionesHeader opcione="SOBRE NOSOTROS" />
          <OpcionesHeader opcione="CONTACTO" />
          <Carrito />
        </ul>
      </nav>
    </header>
  );
};

export default ButtonHeader;
//los "a" debo cambiarlos por linksS
