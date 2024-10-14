import TopHeader from "../components/TopHeader.jsx";
import Footer from "../components/Footer.jsx";

export default function NewTrends() {
    return (
      <>
        <TopHeader />
        <div>
          <section className="d-flex justify-content-top align-items-center text-center flex-column">
            <h1 className="style={{ fontFamily: 'Roboto' }}">Nuevas Tendencias</h1>
            <p className="style={{ fontFamily: 'Roboto' }}">Descubre las últimas novedades en nuestra tienda: productos exclusivos, ofertas y más.</p>
          </section>

          <div id="carousel-container" className="carousel slide carousel-fade d-flex justify-content-center align-items-center" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="../tazaUnder.jpg" className="d-block w-100 h-100" style={{ maxWidth: '300px' }}  alt="Taza Under" />

              </div>
              <div className="carousel-item">
                <img src="../remeraUnder.jpg" className="d-block w-100 h-100" style={{ maxWidth: '300px' }}  alt="Remera Under"  />

              </div>
              <div className="carousel-item">
                <img src="../tazaUnder.jpg" className="d-block w-100 h-100" style={{ maxWidth: '300px' }}  alt="Taza Under" />

              </div>
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>

          <Footer className="position-absoluta" />
        </div>
      </>
    );
}
