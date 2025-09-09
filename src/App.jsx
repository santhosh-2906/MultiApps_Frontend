import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Todos from "./pages/Todos";
import Notes from "./pages/Notes";
import Expenses from "./pages/Expenses";
import Calculator from "./pages/Calculator";
import BMI from "./pages/BMI";
import Currency from "./pages/Currency";
import Home from "./pages/Home";
const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Public tools */}
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/bmi" element={<BMI />} />
          <Route path="/currency" element={<Currency />} />

          {/* Private tools (no auth check for now) */}
          <Route path="/todos" element={<Todos />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/expenses" element={<Expenses />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
