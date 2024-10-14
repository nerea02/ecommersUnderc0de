import Index from "./webs";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
