import "./ButtonHeader.css";

const ButtonHeader = () => {
  return (
    <header>
      <nav className="navbar">
        <ul className="nav-links ulNav d-flex align-items-center">
          <li className="d-flex align-items-center">
            <a className="roboto-medium" href="">
              INICIO
            </a>
          </li>
          <li className="d-flex align-items-center">
            <a className="roboto-medium" href="./producto">
              PRODUCTO
            </a>
          </li>
          <li className="d-flex align-items-center">
            <a className="roboto-medium" href="./nuevasTendencias">
              NUEVAS TENDENCIAS
            </a>
          </li>
          <li className="d-flex align-items-center">
            <a className="roboto-medium" href="./sobreNosotros">
              SOBRE NOSOTROS
            </a>
          </li>
          <li className="d-flex align-items-center">
            <a className="roboto-medium" href="./contacto">
              CONTACTO
            </a>
          </li>
          <li className="d-flex align-items-center">
            <a href="/">
              <img src="../carrito.png" alt="Carrito" />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default ButtonHeader;
//los "a" debo cambiarlos por linksS
