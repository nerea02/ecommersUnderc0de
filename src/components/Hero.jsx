import "./hero.css";

const Hero = () => {
    return (
        <div className="hero">
            <div>
                <h1>"Exclusivo para miembros PRO"</h1>
                <p>¡20% de descuento en remeras y gorras!</p>
            </div>
            <img src="logoUnderc0de.png" alt="Logo fundacion underc0de" className="logo"/>
        </div>
    );
  };

export default Hero;