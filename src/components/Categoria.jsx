import './Categoria.css';
import { useState, useEffect } from "react";

const Categoria = ({ onCategoriaSelect }) => {
  const [categoria, setCategoria] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCategoria, setSelectedCategoria] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/categorias");
        if (!response.ok) {
          throw new Error('Error al obtener las categorías');
        }
        const data = await response.json();
        setCategoria(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const handleCategoriaChange = (e) => {
    const categoriaValue = e.target.value;
    setSelectedCategoria(categoriaValue);
    if (onCategoriaSelect) {
      onCategoriaSelect(categoriaValue);
    }
  };

  return (
    <>
      {error && <div className="alert alert-danger">Error: {error}</div>} 
      {categoria.length > 0 && (
        <select 
          className="form-control" 
          id="categoria" 
          name="categoria" 
          value={selectedCategoria} 
          onChange={handleCategoriaChange} 
          required
        >
          <option value="">Seleccione una categoría</option>
          {categoria.map((cate,i) => (
            <option key={i} value={cate.IdCategoria}>
              {cate.Descripcion}
            </option>
          ))}
        </select>
      )}
      {categoria.length === 0 && !error && <div>Cargando categorías...</div>} 
    </>
  );
};

export default Categoria;
