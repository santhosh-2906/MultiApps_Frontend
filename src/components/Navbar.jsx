import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(() => {
    // Initialize from localStorage
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Listen for changes in localStorage (optional, works across tabs)
  useEffect(() => {
    const handleStorage = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Utility Hub</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/calculator">Calculator</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/bmi">BMI calculator</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/currency">Currency convertor</NavLink>
            </li>

            {/* Private Tools */}
            <li className="nav-item">
              <NavLink className={`nav-link ${!user ? "disabled" : ""}`} to="/todos" title={!user ? "Login required" : ""}>Todos</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={`nav-link ${!user ? "disabled" : ""}`} to="/notes" title={!user ? "Login required" : ""}>Notes</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={`nav-link ${!user ? "disabled" : ""}`} to="/expenses" title={!user ? "Login required" : ""}>Expenses tracker</NavLink>
            </li>

            {/* Auth Buttons */}
            {user ? (
              <li className="nav-item">
                <button className="btn btn-outline-light ms-2" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">Login/Register</NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
