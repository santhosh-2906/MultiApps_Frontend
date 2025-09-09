  import React, { useState, useEffect } from "react";

  const API_URL = import.meta.env.VITE_API_URL;

  const Notes = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchNotes = async () => {
      setLoading(true);
      const res = await fetch(`${API_URL}/notes/?user_id=${user.id}`);
      const data = await res.json();
      setNotes(data);
      setLoading(false);
    };

    useEffect(() => {
      if (user) fetchNotes();
    }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!title && !content) return;

      const method = editId ? "PUT" : "POST";
      const url = editId ? `${API_URL}/notes/${editId}` : `${API_URL}/notes/`;

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id, title, content }),
      });

      setTitle("");
      setContent("");
      setEditId(null);
      fetchNotes();
    };

    const handleEdit = (note) => {
      setTitle(note.title);
      setContent(note.content);
      setEditId(note.id);
    };

    const handleDelete = async (id) => {
      await fetch(`${API_URL}/notes/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id }),
      });
      fetchNotes();
    };

    return (
      <div>
        <h2 className="mb-4">My Notes</h2>

        <form className="mb-3" onSubmit={handleSubmit}>
          <div className="d-flex align-items-center mb-2">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button className="btn btn-success" type="submit">
              {editId ? "Update" : "Add"}
            </button>
            {editId && (
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={() => { setEditId(null); setTitle(""); setContent(""); }}
              >
                Cancel
              </button>
            )}
          </div>
          <textarea
            className="form-control"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="3"
            required
          ></textarea>
        </form>

        {loading ? (
          <p>Loading...</p>
        ) : notes.length === 0 ? (
          <p>No notes yet. Add your first note!</p>
        ) : (
          <div className="list-group">
            {notes.map((note) => (
              <div
                key={note.id}
                className="list-group-item d-flex justify-content-between align-items-start flex-column flex-md-row"
              >
                <div>
                  <h5>{note.title}</h5>
                  <p>{note.content}</p>
                </div>
                <div className="mt-2 mt-md-0">
                  <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(note)}>
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(note.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  export default Notes;