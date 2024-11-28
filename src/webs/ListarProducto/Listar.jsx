import React from "react";
import ButtonHeader from "../../components/ButtonHeader";
import Footer from "../../components/Footer";
import TopHeader from "../../components/TopHeader";
import "./listar.css";


const Listar = () => {
  return (
    <>
      <TopHeader />
      <ButtonHeader />

      <div className="container mt-5">
        <h2 className="text-center">Lista de Productos</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Talle</th>
              <th>Color</th>
              <th>Imagen</th>
              <th>Calificación</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Producto 1</td>
              <td>Descripción del producto 1</td>
              <td>$100</td>
              <td>M</td>
              <td>Rojo</td>
              <td>
                <img
                  src="https://via.placeholder.com/50"
                  alt="Imagen Producto 1"
                  style={{ width: "50px", height: "50px" }}
                />
              </td>
              <td>4.5</td>
              <td>Activo</td>
              <td>
                <button className="btn btn-success btn-sm me-2 ">
                  <i className="fa-solid fa-check"></i> Activar
                </button>
                <button className="btn btn-danger btn-sm ">
                  <i className="fa-solid fa-trash"></i> Eliminar
                </button>
              </td>
            </tr>
            <tr className="rounded-3">
              <td >2</td>
              <td>Producto 2</td>
              <td>Descripción del producto 2</td>
              <td>$150</td>
              <td>L</td>
              <td>Azul</td>
              <td>
                <img
                  src="https://via.placeholder.com/50"
                  alt="Imagen Producto 2"
                  style={{ width: "50px", height: "50px" }}
                />
              </td>
              <td>4.8</td>
              <td>Activo</td>
              <td>
                <button className="btn btn-success btn-sm me-2">
                  <i className="fa-solid fa-check"></i> Activar
                </button>
                <button className="btn btn-danger btn-sm">
                  <i className="fa-solid fa-trash"></i> Eliminar
                </button>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Producto 3</td>
              <td>Descripción del producto 3</td>
              <td>$120</td>
              <td>S</td>
              <td>Verde</td>
              <td>
                <img
                  src="https://via.placeholder.com/50"
                  alt="Imagen Producto 3"
                  style={{ width: "50px", height: "50px" }}
                />
              </td>
              <td>4.7</td>
              <td>Activo</td>
              <td>
                <button className="btn btn-success btn-sm me-2">
                  <i className="fa-solid fa-check"></i> Activar
                </button>
                <button className="btn btn-danger btn-sm">
                  <i className="fa-solid fa-trash"></i> Eliminar
                </button>
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>Producto 4</td>
              <td>Descripción del producto 4</td>
              <td>$180</td>
              <td>XL</td>
              <td>Amarillo</td>
              <td>
                <img
                  src="https://via.placeholder.com/50"
                  alt="Imagen Producto 4"
                  style={{ width: "50px", height: "50px" }}
                />
              </td>
              <td>5.0</td>
              <td>Activo</td>
              <td>
                <button className="btn btn-success btn-sm me-2">
                  <i className="fa-solid fa-check"></i> Activar
                </button>
                <button className="btn btn-danger btn-sm">
                  <i className="fa-solid fa-trash"></i> Eliminar
                </button>
              </td>
            </tr>
            <tr>
              <td>5</td>
              <td>Producto 5</td>
              <td>Descripción del producto 5</td>
              <td>$200</td>
              <td>M</td>
              <td>Púrpura</td>
              <td>
                <img
                  src="https://via.placeholder.com/50"
                  alt="Imagen Producto 5"
                  style={{ width: "50px", height: "50px" }}
                />
              </td>
              <td>4.9</td>
              <td>Activo</td>
              <td>
                <button className="btn btn-success btn-sm me-2">
                  <i className="fa-solid fa-check"></i> Activar
                </button>
                <button className="btn btn-danger btn-sm">
                  <i className="fa-solid fa-trash"></i> Eliminar
                </button>
              </td>
            </tr>
            <tr>
              <td>6</td>
              <td>Producto 6</td>
              <td>Descripción del producto 6</td>
              <td>$220</td>
              <td>S</td>
              <td>Negro</td>
              <td>
                <img
                  src="https://via.placeholder.com/50"
                  alt="Imagen Producto 6"
                  style={{ width: "50px", height: "50px" }}
                />
              </td>
              <td>4.6</td>
              <td>Activo</td>
              <td>
                <button className="btn btn-success btn-sm me-2">
                  <i className="fa-solid fa-check"></i> Activar
                </button>
                <button className="btn btn-danger btn-sm">
                  <i className="fa-solid fa-trash"></i> Eliminar
                </button>
              </td>
            </tr>
            <tr>
              <td>7</td>
              <td>Producto 7</td>
              <td>Descripción del producto 7</td>
              <td>$250</td>
              <td>L</td>
              <td>Blanco</td>
              <td>
                <img
                  src="https://via.placeholder.com/50"
                  alt="Imagen Producto 7"
                  style={{ width: "50px", height: "50px" }}
                />
              </td>
              <td>4.4</td>
              <td>Activo</td>
              <td>
                <button className="btn btn-success btn-sm me-2">
                  <i className="fa-solid fa-check"></i> Activar
                </button>
                <button className="btn btn-danger btn-sm">
                  <i className="fa-solid fa-trash"></i> Eliminar
                </button>
              </td>
            </tr>
            <tr>
              <td>8</td>
              <td>Producto 8</td>
              <td>Descripción del producto 8</td>
              <td>$300</td>
              <td>XL</td>
              <td>Café</td>
              <td>
                <img
                  src="https://via.placeholder.com/50"
                  alt="Imagen Producto 8"
                  style={{ width: "50px", height: "50px" }}
                />
              </td>
              <td>5.0</td>
              <td>Activo</td>
              <td>
                <button className="btn btn-success btn-sm me-2">
                  <i className="fa-solid fa-check"></i> Activar
                </button>
                <button className="btn btn-danger btn-sm">
                  <i className="fa-solid fa-trash"></i> Eliminar
                </button>
              </td>
            </tr>
            <tr>
              <td>9</td>
              <td>Producto 9</td>
              <td>Descripción del producto 9</td>
              <td>$350</td>
              <td>M</td>
              <td>Gris</td>
              <td>
                <img
                  src="https://via.placeholder.com/50"
                  alt="Imagen Producto 9"
                  style={{ width: "50px", height: "50px" }}
                />
              </td>
              <td>4.3</td>
              <td>Activo</td>
              <td>
                <button className="btn btn-success btn-sm me-2">
                  <i className="fa-solid fa-check"></i> Activar
                </button>
                <button className="btn btn-danger btn-sm">
                  <i className="fa-solid fa-trash"></i> Eliminar
                </button>
              </td>
            </tr>
            <tr>
              <td>10</td>
              <td>Producto 10</td>
              <td>Descripción del producto 10</td>
              <td>$400</td>
              <td>S</td>
              <td>Rosa</td>
              <td>
                <img
                  src="https://via.placeholder.com/50"
                  alt="Imagen Producto 10"
                  style={{ width: "50px", height: "50px" }}
                />
              </td>
              <td>4.7</td>
              <td>Activo</td>
              <td>
                <button className="btn btn-success btn-sm me-2">
                  <i className="fa-solid fa-check"></i> Activar
                </button>
                <button className="btn btn-danger btn-sm">
                  <i className="fa-solid fa-trash"></i> Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Footer />
    </>
  );
};

export default Listar;
