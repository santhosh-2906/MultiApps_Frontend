import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-page container">
      <h1>Welcome to Utility Hub</h1>
      <p>Your all-in-one productivity dashboard.</p>

      <div className="row justify-content-center">
        {/* Public Tools */}
        <div className="col-md-4 col-sm-6 mb-4">
          <div className="tool-card">
            <h3>Calculator</h3>
            <p>Quick calculations anytime.</p>
            <Link to="/calculator">Go</Link>
          </div>
        </div>

        <div className="col-md-4 col-sm-6 mb-4">
          <div className="tool-card">
            <h3>BMI Calculator</h3>
            <p>Check your health index.</p>
            <Link to="/bmi">Go</Link>
          </div>
        </div>

        <div className="col-md-4 col-sm-6 mb-4">
          <div className="tool-card">
            <h3>Currency Converter</h3>
            <p>Convert currencies instantly.</p>
            <Link to="/currency">Go</Link>
          </div>
        </div>

        {/* Private Tools */}
        <div className="col-md-4 col-sm-6 mb-4">
          <div className="tool-card">
            <h3>Todos</h3>
            <p>Manage your daily tasks.</p>
            <Link to="/todos">Go</Link>
          </div>
        </div>

        <div className="col-md-4 col-sm-6 mb-4">
          <div className="tool-card">
            <h3>Notes</h3>
            <p>Keep your important notes.</p>
            <Link to="/notes">Go</Link>
          </div>
        </div>

        <div className="col-md-4 col-sm-6 mb-4">
          <div className="tool-card">
            <h3>Expenses</h3>
            <p>Track your spending easily.</p>
            <Link to="/expenses">Go</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
