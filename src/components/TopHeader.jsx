import "./topHeader.css";

const TopHeader = () => {
  return (
    <header className="top-header">
      <div className="logo">
        <h1>
          underc<span className="highlight">0</span>de
        </h1>
      </div>
      <div className="login-container">
        <button className="login-button">
          <i className="login-text roboto-regular-italic">Iniciar sesión</i>
          <img
            src="../iconsU.png"
            alt="My User"
            className="iconUser"
            width="16"
            height="16"
          />
        </button>
      </div>
    </header>
  );
};

export default TopHeader;
