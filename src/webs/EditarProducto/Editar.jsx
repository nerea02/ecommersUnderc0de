import React, { useState } from "react";
import Swal from 'sweetalert2';
import ButtonHeader from "../../components/ButtonHeader.jsx";
import Footer from "../../components/Footer.jsx";
import TopHeader from "../../components/TopHeader.jsx";

const Editar = () => {
  const [product, setProduct] = useState({
    nombre: "",
    descripcion: "",
    color: "",
    categoria: "",
    talle: "",
    cantidad: "",
    precio: "",
    calificacion: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.nombre || !product.descripcion || !product.precio || !product.categoria || !product.color || !product.calificacion) {
      console.error("Error: Todos los campos son obligatorios");
      return;
    }

    product.precio = parseFloat(product.precio);
    product.categoria = parseInt(product.categoria, 10);
    product.color = parseInt(product.color, 10);
    product.talle = product.talle ? parseInt(product.talle, 10) : 4;

    console.log("Producto a enviar: ", product);

    try {
      const response = await fetch("http://localhost:4000/api/AgregarProductoCantidadCalificacion", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (!response.ok) throw new Error("Error en la solicitud");

      const data = await response.json();
      console.log("Producto editado correctamente", data);

      Swal.fire({
        icon: 'success',
        title: 'Producto actualizado correctamente',
        text: 'El producto se ha actualizado con éxito',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        window.location.href = '/abm';
      });
    } catch (error) {
      console.error("Error en la solicitud:", error);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al actualizar el producto. Intenta de nuevo.',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  return (
    <>
      <TopHeader />
      <ButtonHeader />
      
      <div className="container mt-5">
        <h2 className="text-center">Editar Producto</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre del Producto</label>
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
            <label htmlFor="descripcion" className="form-label">Descripción</label>
            <textarea
              className="form-control"
              id="descripcion"
              name="descripcion"
              value={product.descripcion}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="color" className="form-label">Color</label>
            <select
              className="form-control"
              id="color"
              name="color"
              value={product.color}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un color</option>
              <option value="Rojo">Rojo</option>
              <option value="Verde">Verde</option>
              <option value="Azul">Azul</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="categoria" className="form-label">Categoría</label>
            <select
              className="form-control"
              id="categoria"
              name="categoria"
              value={product.categoria}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una categoría</option>
              <option value="Remeras">Remeras</option>
              <option value="Gorras">Gorras</option>
              <option value="Tazas">Tazas</option>
              <option value="Zapatillas">Zapatillas</option>
              <option value="Electronica">Electronica</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="talle" className="form-label">Talle</label>
            <select
              className="form-control"
              id="talle"
              name="talle"
              value={product.talle}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un talle</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="no">No necesita</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="cantidad" className="form-label">Cantidad</label>
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
            <label htmlFor="precio" className="form-label">Precio</label>
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

          <div className="mb-3">
            <label htmlFor="calificacion" className="form-label">Calificación Inicial</label>
            <input
              type="number"
              className="form-control"
              id="calificacion"
              name="calificacion"
              value={product.calificacion}
              onChange={handleChange}
              min="1"
              max="5"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">Actualizar Producto</button>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default Editar;