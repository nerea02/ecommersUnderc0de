import { useState, useEffect } from 'react';
import './Talle.css';

const Talle = ({ onTalleSelect }) => {
  const [tallas, setTalla] = useState([]);
  const [error, setError] = useState(null);
  const [selectedTalle, setSelectedTalle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/talles");
        if (!response.ok) {
          throw new Error('Error al obtener las tallas');
        }
        const data = await response.json();
        setTalla(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const handleTalleChange = (e) => {
    const talleValue = e.target.value;
    setSelectedTalle(talleValue);
    if (onTalleSelect) {
      onTalleSelect(talleValue);
    }
  };

  return (
    <>
      {error && <div className="alert alert-danger">Error: {error}</div>} 
      {tallas.length > 0 && (
        <select 
          className="form-control" 
          id="talle" 
          name="talle" 
          value={selectedTalle} 
          onChange={handleTalleChange} 
          required
        >
          <option value="">Seleccione un talle</option>
          {tallas.map((talla,i) => (
            <option key={i} value={talla.IdTalle}>
              {talla.Talle}
            </option>
          ))}
        </select>
      )}
      {tallas.length === 0 && !error && <div>Cargando tallas...</div>} 
    </>
  );
};

export default Talle;
