import { useState, useEffect } from "react";
import './Colores.css';

const Colores = ({ onColorSelect }) => {
  const [colores, setColores] = useState([]); // Nombre en plural para mejor claridad
  const [error, setError] = useState(null);
  const [selectedColor, setSelectedColor] = useState(""); // Estado para el color seleccionado

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/colores");
        if (!response.ok) {
          throw new Error('Error al obtener los colores');
        }
        const data = await response.json();
        setColores(data);
        console.log(data)
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const handleColorChange = (e) => {
    const colorValue = e.target.value;  // colorValue contiene el ID del color
    setSelectedColor(colorValue);  // Establece el ID seleccionado
    if (onColorSelect) {
      onColorSelect(colorValue);  // Llama a la función para pasar el ID al componente padre
    }
  };

  return (
    <>
      {error && <div className="alert alert-danger">Error: {error}</div>} 
      {colores.length > 0 && (
        <select 
          className="form-control" 
          id="color" 
          name="color" 
          value={selectedColor} 
          onChange={handleColorChange} 
          required
        >
          <option value="">Seleccione un color</option>
          {colores.map((color) => (
            <option key={color.IdColor} value={color.IdColor}>
              {color.Color} {/* Mostrar el nombre del color */}
            </option>
          ))}
        </select>
      )}
      {colores.length === 0 && !error && <div>Cargando colores...</div>} 
    </>
  );
};

export default Colores;