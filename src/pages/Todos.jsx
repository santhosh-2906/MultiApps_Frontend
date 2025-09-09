import React, { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const Todos = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/todos/?user_id=${user.id}`);
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task) return;

    if (editId) {
      await fetch(`${API_URL}/todos/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id, task }),
      });
    } else {
      await fetch(`${API_URL}/todos/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id, task }),
      });
    }

    setTask("");
    setEditId(null);
    fetchTodos();
  };

  const handleEdit = (t) => {
    setTask(t.task);
    setEditId(t.id);
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/todos/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.id }),
    });
    fetchTodos();
  };
  
  // This function was missing from your original Todos component.
  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "completed" ? "pending" : "completed";
    await fetch(`${API_URL}/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.id, status: newStatus }),
    });
    fetchTodos();
  };

  return (
    <div>
      <h2 className="mb-4">My Todos</h2>

      <form onSubmit={handleSubmit} className="mb-3">
        <div className="d-flex align-items-center">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Enter task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            {editId ? "Update" : "Add"}
          </button>
          {editId && (
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => { setEditId(null); setTask(""); }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : todos.length === 0 ? (
        <p>No todos yet. Add your first task!</p>
      ) : (
        <ul className="list-group">
          {todos.map((t) => (
            <li
              key={t.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span
                style={{
                  textDecoration: t.status === "completed" ? "line-through" : "none",
                  cursor: "pointer",
                }}
                onClick={() => toggleStatus(t.id, t.status)}
              >
                {t.task}
              </span>
              <div>
                <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(t)}>
                  Edit
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(t.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Todos;