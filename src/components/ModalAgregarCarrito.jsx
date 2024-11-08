import Swal from "sweetalert2";

const ModalAgregarCarrito = ({ sumar, imagenProducto, nombreProducto }) => {
  const abrirModal = () => {
    const getCantidad = () => {
      return (
        parseInt(document.querySelector('input[type="number"]').value) || 0
      );
    };

    const getTalle = () => {
      const radios = document.querySelectorAll('input[name="talle"]');
      for (const radio of radios) {
        if (radio.checked) {
          return radio.value;
        }
      }
      return null;
    };

    const getColor = () => {
      const radios = document.querySelectorAll('input[name="color"]');
      for (const radio of radios) {
        if (radio.checked) {
          return radio.value;
        }
      }
      return null;
    };

    Swal.fire({
      imageUrl: imagenProducto, 
      imageHeight: 150,
      imageAlt: nombreProducto, 
      title: nombreProducto,
      text: "Características?",
      html: `
        <label for="talleS">Cantidad</label>
        <input
          type="number"
          min="0"
          max="10"
          value="0"
        />
        <br><br>
        <h4>Selecciona un talle:</h4>
        <input type="radio" id="talleS" name="talle" value="S">
        <label for="talleS">Talle S</label><br>

        <input type="radio" id="talleM" name="talle" value="M">
        <label for="talleM">Talle M</label><br>

        <input type="radio" id="talleL" name="talle" value="L">
        <label for="talleL">Talle L</label><br>

        <h4>Selecciona un color:</h4>
        <input type="radio" id="colorRojo" name="color" value="Rojo">
        <label for="colorRojo" style="color: red;">Rojo</label><br>

        <input type="radio" id="colorVerde" name="color" value="Verde">
        <label for="colorVerde" style="color: green;">Verde</label><br>

        <input type="radio" id="colorAzul" name="color" value="Azul">
        <label for="colorAzul" style="color: blue;">Azul</label><br>
      `,
      showDenyButton: true,
      confirmButtonText: "Agregar",
      denyButtonText: `Cancelar`,
      allowOutsideClick: false,
      preConfirm: () => {
        const cantidad = getCantidad();
        const talle = getTalle();
        const color = getColor();

        if (cantidad <= 0) {
          return Swal.showValidationMessage(
            `Por favor, ingrese una cantidad mayor a 0.`
          );
        }
        if (!talle) {
          return Swal.showValidationMessage(`Por favor, seleccione un talle.`);
        }
        if (!color) {
          return Swal.showValidationMessage(`Por favor, seleccione un color.`);
        }
        return { cantidad, talle, color };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { cantidad, talle, color } = result.value;
        sumar(cantidad);
      }
    });
  };

  return (
    <button onClick={abrirModal} className="btn btn-primary">
      Agregar al Carrito
    </button>
  );
};

export default ModalAgregarCarrito;