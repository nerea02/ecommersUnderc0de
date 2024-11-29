import "./ButtonHeader.css";
import Carrito from "./Carrito";
import OpcionesHeader from "./OpcionesHeaders";

const ButtonHeader = ({ numero }) => {
  return (
    <header>
      <nav className="d-flex justify-content-center navbar">
        <ul className="nav-links ulNav d-flex align-items-center">
          <OpcionesHeader opcione="INICIO" />
          <OpcionesHeader opcione="PRODUCTO" />
          <OpcionesHeader opcione="NUEVAS TENDENCIAS" />
          <OpcionesHeader opcione="SOBRE NOSOTROS" />
          <OpcionesHeader opcione="CONTACTO" />
          
          {/* Mostrar ABM y Carrito solo si numero es igual a 1 */}
          {numero != 1 && (
            <>
              <OpcionesHeader opcione="ABM" />
            </>
          )}
          <Carrito />
        </ul>
      </nav>
    </header>
  );
};

export default ButtonHeader;
//los "a" debo cambiarlos por linksS
