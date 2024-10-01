
import './topHeader.css'; 
const TopHeader = () => {
  return (
    <header className="top-header">
      <div className="logo">
      <h1>underc<span className ="highlight">0</span>de</h1>

      </div>
      <div className="login-container">
        <button className="login-button">
          <i className="user">Iniciar sesión</i> 
        </button>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" className='navbar-icon'>
          <g data-testid="user" style={{ fill: 'rgb(255, 255, 255)' }}>
            <path d="M12 12.414c-3.207 0-5.806-2.779-5.806-6.207S8.793 0 12 0s5.806 2.779 5.806 6.207-2.599 6.207-5.806 6.207Zm0-9.931c-1.924 0-3.484 1.667-3.484 3.724 0 2.057 1.56 3.724 3.484 3.724s3.484-1.667 3.484-3.724c0-2.057-1.56-3.724-3.484-3.724ZM22.839 24c-.638-.009-1.153-.56-1.162-1.241 0-3.228-1.641-5.38-9.677-5.38s-9.677 2.152-9.677 5.38c0 .685-.52 1.241-1.162 1.241C.52 24 0 23.444 0 22.759c0-7.862 8.408-7.862 12-7.862 3.592 0 12 0 12 7.862-.008.681-.523 1.232-1.161 1.241Z" />
          </g>
        </svg>

      </div>
    </header>
  );
};

export default TopHeader;
