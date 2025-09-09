import React, { useState } from "react";

const Calculator = () => {
  const [expression, setExpression] = useState("");

  const handleClick = (value) => setExpression(expression + value);

  const handleClear = () => setExpression("");

  const handleCalculate = () => {
    try {
      // Unsafe in production, but fine for local tool
      const result = eval(expression);
      setExpression(result.toString());
    } catch {
      alert("Invalid expression");
    }
  };

  const buttons = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "=", "+"
  ];

  return (
    <div className="text-center" style={{ maxWidth: "300px", margin: "0 auto" }}>
      <input type="text" className="form-control mb-3 text-end" value={expression} readOnly />
      <div className="row g-2">
        {buttons.map((btn) => (
          <div className="col-3" key={btn}>
            <button
              className={`btn w-100 ${btn === "=" ? "btn-primary" : "btn-secondary"}`}
              onClick={() => (btn === "=" ? handleCalculate() : handleClick(btn))}
            >
              {btn}
            </button>
          </div>
        ))}
        <div className="col-12">
          <button className="btn btn-danger w-100" onClick={handleClear}>Clear</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
