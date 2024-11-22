import Index from "./webs";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./webs/login";
import NewTrends from "./webs/newTrends.jsx";
import AboutUs from "./webs/aboutUs.jsx";
import GaleriaCompra from "./webs/GaleriaCompra.jsx";



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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

