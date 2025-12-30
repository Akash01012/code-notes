import { useState } from "react";
import api from "../services/api";

export default function NoteForm({ reload }) {
  const [data, setData] = useState({ title: "", content: "", tags: "" });

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/notes", {
      ...data,
      tags: data.tags.split(",").map(t => t.trim())
    });
    setData({ title: "", content: "", tags: "" });
    reload();
  };

  return (
    <form onSubmit={submit} className="glass p-3 mb-4">
      <input
        className="form-control mb-2"
        placeholder="Title"
        value={data.title}
        onChange={e => setData({ ...data, title: e.target.value })}
        required
      />
      <textarea
        className="form-control mb-2"
        placeholder="Write your note..."
        value={data.content}
        onChange={e => setData({ ...data, content: e.target.value })}
        required
      />
      <input
        className="form-control mb-2"
        placeholder="Tags (comma separated)"
        value={data.tags}
        onChange={e => setData({ ...data, tags: e.target.value })}
      />
      <button className="btn btn-dark w-100">Add Note</button>
    </form>
  );
}
