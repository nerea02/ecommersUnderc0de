import ButtonHeader from "../../components/ButtonHeader.jsx";
import Footer from "../../components/Footer.jsx";
import TopHeader from "../../components/TopHeader.jsx";
import './ABM.css';





const ABM = () => {
  return (
    <>
      <TopHeader />
      <ButtonHeader />
      <div className="container mt-5">
        <div className="row">
          <div className="col-6 mb-4">
            <button className="btn btn-primary w-100 btn-lg ">
            <i className="fas fa-plus">
            <br />
              agregar producto
            </i>
             
            </button>
          </div>
          
          <div className="col-6 mb-4">
            <button className="btn btn-warning w-100 btn-lg ">
              <i className="fas  fa-file-pen">
                <br />
                Editar producto
              </i>
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-6 mb-4">
            <button className="btn btn-success w-100 btn-lg">
              <i className="fas fa-list">
                <br />
                Listar producto
              </i>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ABM;
