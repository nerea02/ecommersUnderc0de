import Footer from "./components/Footer";
import Index from "./webs";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Index />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
