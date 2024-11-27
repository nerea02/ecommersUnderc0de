import ButtonHeader from "../../components/ButtonHeader.jsx";
import TopHeader from "../../components/TopHeader.jsx";
import Footer from "../../components/Footer.jsx";
import './ABM.css';





const ABM = () => {

    return(<>
    <TopHeader />
    <ButtonHeader />
    <div className="container mt-5">
      <div className="row">
        <div className="col-6 mb-4">
          <button className="btn btn-primary w-100 btn-lg boton-cuadrado">Agregar producto</button>
        </div>
        <div className="col-6 mb-4">
          <button className="btn btn-warning w-100 btn-lg boton-cuadrado">Editar producto</button>
        </div>
      </div>
      <div className="row">
        <div className="col-6 mb-4 ">
          <button className="btn btn-success w-100 btn-lg ">
            <i className="fas fa-list"><br/>Listar producto</i> 
            </button>
        </div>
      </div>
    </div>


    <Footer />
    
    </>)
}
export default ABM;