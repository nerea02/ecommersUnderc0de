import Btn from "./Btn";
import "./card.css";

const Card = ({ image, name, price }) => {
  return (
    <div className="row justify-content-evenly d-flex ">
      <div className="card  col-3 m-2 d-flex  align-items-sm-center ">
        <img src={image} alt={name} className="image" />
        <div className="info align-items-sm-center d-flex flex-column ">
          <h2>{name}</h2>
          <p className="price">${price}</p>
          <Btn Texto="Agregar al Carrito"></Btn>
        </div>
      </div>

      <div className="card col-3 m-2 d-flex  align-items-sm-center ">
        <img src={image} alt={name} className="image" />
        <div className="info align-items-sm-center d-flex flex-column ">
          <h2>{name}</h2>
          <p className="price">${price}</p>
          <Btn Texto="Agregar al Carrito"></Btn>
        </div>
      </div>

      <div className="card col-3 m-2 d-flex  align-items-sm-center ">
        <img src={image} alt={name} className="image" />
        <div className="info align-items-sm-center d-flex flex-column ">
          <h2>{name}</h2>
          <p className="price">${price}</p>
          <Btn Texto="Agregar al Carrito"></Btn>
        </div>
      </div>
    </div>
  );
};

export default Card;
