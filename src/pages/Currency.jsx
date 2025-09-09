import React, { useState, useEffect } from "react";

const Currency = () => {
  const [rates, setRates] = useState({});
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch rates whenever "from" currency changes
  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://api.frankfurter.app/latest?from=${from}`);
        const data = await res.json();
        const fetchedRates = data?.rates || {};
        setRates({ ...fetchedRates, [from]: 1 }); // include base currency
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch currency rates. Try again later.");
        setLoading(false);
      }
    };

    fetchRates();
  }, [from]);

  const convert = (e) => {
    e.preventDefault();
    if (!rates[from] || !rates[to]) return;
    const value = (amount / rates[from]) * rates[to];
    setResult(value.toFixed(2));
  };

  if (loading) return <p className="text-center">Loading rates...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;

  return (
    <div className="text-center">
      <h2 className="mb-4">Currency Converter</h2>
      <form onSubmit={convert} className="mb-3">
        <input
          type="number"
          value={amount}
          className="form-control mb-2"
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <div className="d-flex mb-2 gap-2">
          <select
            className="form-select"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          >
            {Object.keys(rates).map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select
            className="form-select"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          >
            {Object.keys(rates).map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Convert
        </button>
      </form>
      {result && (
        <h4>
          {amount} {from} = {result} {to}
        </h4>
      )}
    </div>
  );
};

export default Currency;
