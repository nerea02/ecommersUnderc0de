import "./hero.css";

const Hero = ({ porcentaje }) => {
  return (
    <div className="hero">
      <div className="sub-hero">
        <div className="text-content">
          <h1>"Exclusivo para miembros PRO"</h1>
          <p>¡{porcentaje}% de descuento en remeras y gorras!</p>
        </div>
        <img
          src="logoUnderc0de.png"
          alt="Logo fundacion underc0de"
          className="logo"
        />
      </div>
    </div>
  );
};

export default Hero;
