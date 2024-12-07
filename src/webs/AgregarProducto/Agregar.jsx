import React, { useState } from "react";
import ButtonHeader from "../../components/ButtonHeader.jsx";
import Footer from "../../components/Footer.jsx";
import TopHeader from "../../components/TopHeader.jsx";
import Colores from "../../components/Colores.jsx";
import Categoria from "../../components/Categoria.jsx";
import Talle from "../../components/Talle.jsx";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';  

const Agregar = () => {
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

 
  const handleTalleSelect = (talle) => {
    setProduct((prev) => ({ ...prev, talle }));
  };

  const handleCategoriaSelect = (categoria) => {
    setProduct((prev) => ({ ...prev, categoria }));
  };

  const handleColorSelect = (color) => {
    setProduct((prev) => ({ ...prev, color }));
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
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
      console.log("Producto agregado correctamente", data);


      Swal.fire({
        icon: 'success',
        title: 'Producto agregado correctamente',
        text: 'El producto se ha agregado con éxito',
        confirmButtonText: 'Aceptar'
      }).then(() => {
       
        window.location.href = '/abm'; 
      });
    } catch (error) {
      console.error("Error en la solicitud:", error);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al agregar el producto. Intenta de nuevo.',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  return (
    <>
      <TopHeader />
      <ButtonHeader />
      <div className="container mt-5">
        <h2 className="text-center">Agregar Producto</h2>
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
            <Colores onColorSelect={handleColorSelect} />
          </div>

          <div className="mb-3">
            <label htmlFor="categoria" className="form-label">Categoría</label>
            <Categoria onCategoriaSelect={handleCategoriaSelect} />
          </div>

          {product.categoria !== "1" && product.categoria && (
            <div className="mb-3">
              <label htmlFor="talle" className="form-label">Talle</label>
              <Talle onTalleSelect={handleTalleSelect} />
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="cantidad" className="form-label">Cantidad</label>
            <input
              type="number"
              className="form-control"
              id="cantidad"
              name="cantidad"
              min="1"
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
              min="1"
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

          <button type="submit" className="btn btn-primary mb-5">Agregar Producto</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Agregar;
