import TopHeader from "../components/TopHeader.jsx";
import ButtonHeader from "../components/ButtonHeader.jsx";
import Footer from "../components/Footer.jsx";
import { Link } from "react-router-dom";

export default function NewTrends() {
  return (
    <>
      <TopHeader />
      <ButtonHeader />
      <div
        className="bg-light"
        style={{
          backgroundColor: "#f7fbff",
          padding: "20px",
          maxWidth: "70%",
          margin: "0 auto",
          borderRadius: "10px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <section className="align-items-center d-flex flex-column justify-content-evenly">
          <h1 className="font-weight-bold" style={{ color: "#0056b3" }}>
            Nuevas Tendencias
          </h1>
          <p className="lead" style={{ fontWeight: "500" }}>
            Descubre las últimas novedades en nuestra tienda: productos
            exclusivos, ofertas y más.
          </p>

          <Link className="btn btn-primary mt-3" to="/">
            Ver Todos los Productos
          </Link>
        </section>

        <div
          className="d-flex justify-content-center align-items-center "
          style={{ height: "80vh" }}
        >
          <div
            id="carouselExampleFade"
            className="carousel slide carousel-fade"
            data-bs-ride="carousel"
            style={{
              width: "400px",
              borderRadius: "20px",
              overflow: "hidden",
              height: "400px",
            }}
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="../tazaUnder.jpg"
                  className="d-block w-100 h-100"
                  style={{ objectFit: "contain", maxHeight: "100%" }}
                  alt="Taza Under"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="../remeraUnder.jpg"
                  className="d-block w-100 h-100"
                  style={{ objectFit: "contain", maxHeight: "100%" }}
                  alt="Remera Under"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="../tazaUnder.jpg"
                  className="d-block w-100 h-100"
                  style={{ objectFit: "contain", maxHeight: "100%" }}
                  alt="Taza Under"
                />
              </div>
            </div>

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
      <Footer className="position-relative" />
    </>
  );
}
