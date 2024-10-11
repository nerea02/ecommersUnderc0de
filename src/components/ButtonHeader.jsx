import "./ButtonHeader.css";

const ButtonHeader = () => {
  return (
    <header>
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <a className="roboto-medium " href="">
              INICIO
            </a>
          </li>
          <li>
            <a className="roboto-medium " href="./producto">
              PRODUCTO
            </a>
          </li>
          <li>
            <a className="roboto-medium" href="./nuevasTendencias">
              NUEVAS TENDENCIAS
            </a>
          </li>
          <li>
            <a className="roboto-medium" href="./sobreNosotros">
              SOBRE NOSOTROS
            </a>
          </li>
          <li>
            <a className="roboto-medium" href="./contacto">
              CONTACTO
            </a>
          </li>
          <li>
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
