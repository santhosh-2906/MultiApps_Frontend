import React, { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const Expenses = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    setLoading(true);
    const res = await fetch(`${API_URL}/expenses/?user_id=${user.id}`);
    const data = await res.json();
    setExpenses(data);
    setLoading(false);
  };

  useEffect(() => {
    if (user) fetchExpenses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !category) return;

    const payload = { user_id: user.id, amount, category, note };
    const method = editId ? "PUT" : "POST";
    const url = editId ? `${API_URL}/expenses/${editId}` : `${API_URL}/expenses/`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setAmount(""); setCategory(""); setNote(""); setEditId(null);
    fetchExpenses();
  };

  const handleEdit = (exp) => {
    setAmount(exp.amount);
    setCategory(exp.category);
    setNote(exp.note || "");
    setEditId(exp.id);
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/expenses/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.id }),
    });
    fetchExpenses();
  };

  const total = expenses.reduce((sum, e) => sum + parseFloat(e.amount || 0), 0);

  return (
    <div>
      <h2 className="mb-4">My Expenses</h2>

      <form onSubmit={handleSubmit} className="mb-3">
        <div className="d-flex align-items-center mb-2">
          <input
            type="number"
            className="form-control me-2"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <input
            type="text"
            className="form-control me-2"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <button className="btn btn-success ms-2" type="submit">
            {editId ? "Update" : "Add"}
          </button>
          {editId && (
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => { setEditId(null); setAmount(""); setCategory(""); setNote(""); }}
            >
              Cancel
            </button>
          )}
        </div>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Note (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : expenses.length === 0 ? (
        <p>No expenses yet. Add your first one!</p>
      ) : (
        <div className="list-group">
          {expenses.map((exp) => (
            <div key={exp.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                ₹{exp.amount} - <strong>{exp.category}</strong> {exp.note && <small className="text-muted">({exp.note})</small>}
              </div>
              <div>
                <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(exp)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(exp.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-3 alert alert-info">
        <h5>Total Spent: ₹{total}</h5>
      </div>
    </div>
  );
};

export default Expenses;