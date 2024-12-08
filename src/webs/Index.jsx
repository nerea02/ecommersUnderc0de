import ButtonHeader from "../components/ButtonHeader.jsx";
import Card from "../components/Card.jsx";
import Chip from "../components/Chip.jsx";
import Footer from "../components/Footer.jsx";
import Hero from "../components/Hero.jsx";
import TopHeader from "../components/TopHeader.jsx";
import "./index.css";

export default function Index() {
  return (
    <>
      <TopHeader />
      <ButtonHeader />

      <div className="d-flex mt-5 justify-content-center align-items-center ">
      
    </div>
      <div className="contenedorIndex">
        <div className=" " style={{ backgroundColor: "#F5F7FA" }}>
          <Hero porcentaje={30} />

          <Chip />
          <div className="pt-5 pb-5">
            <Card image="./remeraUnder.jpg" />
          </div>
          
        </div>
      </div>
      <Footer />
    </>
  );
}
