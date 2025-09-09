import React, { useState } from "react";

const BMI = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);

  const calculateBMI = (e) => {
    e.preventDefault();
    if (!weight || !height) return;

    const h = height / 100; // convert cm → m
    const result = weight / (h * h);

    let category = "";
    if (result < 18.5) category = "Underweight";
    else if (result < 24.9) category = "Normal";
    else if (result < 29.9) category = "Overweight";
    else category = "Obese";

    setBmi(`${result.toFixed(2)} (${category})`);
  };

  return (
    <div className="text-center">
      <h2 className="mb-4">BMI Calculator</h2>
      <form onSubmit={calculateBMI} className="mb-3">
        <input
          type="number"
          placeholder="Weight (kg)"
          className="form-control mb-2"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Height (cm)"
          className="form-control mb-2"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          required
        />
        <button className="btn btn-success w-100" type="submit">
          Calculate
        </button>
      </form>
      {bmi && <h4>Your BMI is: {bmi}</h4>}
    </div>
  );
};

export default BMI;
