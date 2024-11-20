import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Index from "./webs";
import AboutUs from "./webs/aboutUs.jsx";

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
         
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

