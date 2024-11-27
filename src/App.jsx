import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Index from "./webs";
import ABM from "./webs/ABM/ABM.jsx";
import AboutUs from "./webs/aboutUs.jsx";
import Agregar from "./webs/Agregarproducto/agregar.jsx";
import Editar from "./webs/EditarProducto/Editar.jsx";
import GaleriaCompra from "./webs/GaleriaCompra.jsx";
import Listar from "./webs/ListarProducto/Listar.jsx";
import Login from "./webs/login";
import NewTrends from "./webs/newTrends.jsx";




function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Index />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/newTrends" element={<NewTrends />} />
          <Route exact path="/AboutUs" element={<AboutUs />} />
          <Route exact path="/GaleriaCompra" element={<GaleriaCompra />} />
          <Route exact path="/ABM" element={<ABM />} />
          <Route exact path="/Agregar" element={<Agregar/>} />
          <Route exact path="/Editar" element={<Editar/>} />
          <Route exact path="/Listar" element={<Listar/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

