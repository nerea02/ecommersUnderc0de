import './ButtonHeader.css';

const ButtonHeader = () => {
    return (
        <header>
            <nav className ="navbar">
                <ul className ="nav-links">
                    <li><a href="">INICIO</a></li>
                    <li><a href="./producto">PRODUCTO</a></li>
                    <li><a href="./nuevasTendencias">NUEVAS TENDENCIAS</a></li>
                    <li><a href="./sobreNosotros">SOBRE NOSOTROS</a></li>
                    <li><a href="./contacto">CONTACTO</a></li>
                </ul>
                <div className ="iconCarrito">
                    <a href="/"><img src="../carrito.png" alt="Carrito" /></a>
                </div>
            </nav>
    </header>
    );
  };

export default ButtonHeader;
//los "a" debo cambiarlos por linksS 