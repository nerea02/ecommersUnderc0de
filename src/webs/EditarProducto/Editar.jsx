import React, { useState } from "react";
import ButtonHeader from "../../components/ButtonHeader.jsx";
import Footer from "../../components/Footer.jsx";
import TopHeader from "../../components/TopHeader.jsx";

const Editar = () => {
  // Estado para almacenar los valores de los campos (sin estado)
  const [product, setProduct] = useState({
    nombre: "",
    cantidad: "",
    precio: "",
  });

  // Manejar el cambio de los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para actualizar el producto
    console.log("Producto actualizado:", product);
  };

  return (
    <>
      <TopHeader />
      <ButtonHeader />

      <div className="container mt-5">
        <h2 className="text-center">Editar Producto</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre del Producto
            </label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              name="nombre"
              value={product.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="cantidad" className="form-label">
              Cantidad
            </label>
            <input
              type="number"
              className="form-control"
              id="cantidad"
              name="cantidad"
              value={product.cantidad}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="precio" className="form-label">
              Precio
            </label>
            <input
              type="number"
              className="form-control"
              id="precio"
              name="precio"
              value={product.precio}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Actualizar Producto
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default Editar;

