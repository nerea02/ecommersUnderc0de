import { Link } from "react-router-dom";
import ButtonHeader from "../../components/ButtonHeader.jsx";
import Footer from "../../components/Footer.jsx";
import TopHeader from "../../components/TopHeader.jsx";
import './ABM.css';





const ABM = () => {
  return (
    <div className="h-100 contenedorABM">

      <TopHeader />
      <ButtonHeader  numero="1"/>
      <div className="container d-flex flex-column justify-content-md-center ">
        <div className="row h-50">
          <div className="col-6 mb-4 d-flex ">
          <Link className="btn btn-ABM btn-lg btn-primary d-flex flex-column justify-content-center w-100" to="/agregar">
            <i className="fas fa-plus">
            <br /><br />
              agregar producto
            </i>
             
            </Link>
          </div>
          
          <div className="col-6 mb-4">
          <Link className="btn btn-warning w-100 btn-lg btn-ABM  d-flex flex-column justify-content-center " to="/editar">
              <i className="fas  fa-file-pen">
                <br /><br />
                Editar producto
              </i>
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-6 h-30 mb-4">
            
            <Link className="btn btn-success w-100 btn-lg btn-ABM  d-flex flex-column justify-content-center " to="/listar">
           
              <i className="fas fa-list">
                <br /><br />
                Listar producto
              </i>
          </Link>
            
          </div>
        </div>
      </div>
      <div className="contenedorFooter">

      <Footer />
    
      </div>
    </div>
  );
};

export default ABM;
